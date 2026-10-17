create or replace function public.save_turots_bulk_bundle_pages(
  p_bundle_id uuid,
  p_pages jsonb,
  p_allow_reassignment boolean default false,
  p_bundle_extent_pages integer default null
)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_page jsonb;
  v_canvas_id text;
  v_page_order integer;
  v_existing_id uuid;
  v_existing_bundle_id uuid;
  v_access_level text;
  v_existing_count integer;
  v_deleted integer;
  v_added integer := 0;
  v_updated integer := 0;
  v_moved integer := 0;
  v_deduplicated integer := 0;
  v_affected_bundles uuid[] := array[]::uuid[];
  v_source_bundle_id uuid;
  v_target_project text;
begin
  if auth.uid() is null or not exists (
    select 1 from public.turots_admins a where a.user_id = (select auth.uid())
  ) then
    raise exception 'Akses hanya untuk admin Turots.' using errcode = '42501';
  end if;

  if jsonb_typeof(p_pages) <> 'array' or jsonb_array_length(p_pages) = 0 or jsonb_array_length(p_pages) > 10000 then
    raise exception 'Daftar halaman kosong atau lebih dari 10.000.' using errcode = '22023';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_pages) as items(item)
    where coalesce(item->>'canvas_id', '') = ''
      or coalesce(item->>'image_url', '') = ''
      or coalesce(item->>'page_order', '') !~ '^\d+$'
      or (item->>'page_order')::integer < 1
  ) then
    raise exception 'Identitas, URL, atau urutan halaman tidak valid.' using errcode = '22023';
  end if;
  if (select count(*) from jsonb_array_elements(p_pages)) <>
     (select count(distinct item->>'canvas_id') from jsonb_array_elements(p_pages) as items(item)) then
    raise exception 'Daftar memuat sumber foto berulang.' using errcode = '22023';
  end if;
  if (select count(*) from jsonb_array_elements(p_pages)) <>
     (select count(distinct (item->>'page_order')::integer) from jsonb_array_elements(p_pages) as items(item)) then
    raise exception 'Urutan halaman berulang.' using errcode = '22023';
  end if;

  select b.access_level, c.source_project into v_access_level, v_target_project
  from public.turots_bundles b
  join public.turots_collections c on c.id = b.collection_id
  where b.id = p_bundle_id
  for update of b;
  if not found then raise exception 'Bendel tidak ditemukan.' using errcode = 'P0002'; end if;

  if p_bundle_extent_pages is not null then
    if p_bundle_extent_pages < 1 or p_bundle_extent_pages > 10000
       or p_bundle_extent_pages <> jsonb_array_length(p_pages)
       or upper(coalesce(v_target_project, '')) <> 'EAP' then
      raise exception 'Jumlah halaman PDF harus sama dengan halaman yang disimpan dan hanya boleh memperbarui bendel EAP.' using errcode = '22023';
    end if;
  end if;

  -- Serialize concurrent edits to the same source, even when it is currently attached to another bundle.
  for v_canvas_id in
    select distinct item->>'canvas_id'
    from jsonb_array_elements(p_pages) as items(item)
    order by item->>'canvas_id'
  loop
    perform pg_advisory_xact_lock(hashtextextended(v_canvas_id, 0));
  end loop;

  for v_page in
    select item from jsonb_array_elements(p_pages) as items(item)
    order by (item->>'page_order')::integer
  loop
    v_canvas_id := v_page->>'canvas_id';
    v_page_order := (v_page->>'page_order')::integer;
    select count(*) into v_existing_count
    from public.turots_pages p where p.canvas_id = v_canvas_id;

    if v_existing_count > 1 and not coalesce(p_allow_reassignment, false) then
      raise exception 'Sumber % tercatat lebih dari sekali. Setujui perbaikan tautan silang pada pratinjau terlebih dahulu.', v_canvas_id using errcode = '23505';
    end if;
    select p.id, p.bundle_id into v_existing_id, v_existing_bundle_id
    from public.turots_pages p
    where p.canvas_id = v_canvas_id
    order by (p.bundle_id = p_bundle_id) desc, p.page_order, p.id
    limit 1
    for update;

    if v_existing_id is not null and v_existing_bundle_id <> p_bundle_id and not coalesce(p_allow_reassignment, false) then
      raise exception 'Sumber % masih tertaut pada bendel lain. Setujui pemindahan tautan pada pratinjau terlebih dahulu.', v_canvas_id using errcode = '23505';
    end if;

    if v_existing_id is null then
      insert into public.turots_pages (
        bundle_id, canvas_id, page_order, label, folio_label, side,
        image_url, thumbnail_url, checksum_sha256, access_level
      ) values (
        p_bundle_id, v_canvas_id, v_page_order,
        coalesce(v_page->>'label', v_page->>'folio_label', v_canvas_id),
        coalesce(v_page->>'folio_label', v_page->>'label', v_canvas_id),
        case when v_page->>'folio_label' ~* 'v$' then 'verso' when v_page->>'folio_label' ~* 'r$' then 'recto' else 'unknown' end,
        v_page->>'image_url', coalesce(v_page->>'thumbnail_url', v_page->>'image_url'),
        v_page->>'checksum_sha256', v_access_level
      );
      v_added := v_added + 1;
    else
      if v_existing_count > 1 then
        delete from public.turots_pages p where p.canvas_id = v_canvas_id and p.id <> v_existing_id;
        get diagnostics v_deleted = row_count;
        v_deduplicated := v_deduplicated + v_deleted;
      end if;
      if v_existing_bundle_id <> p_bundle_id then
        v_affected_bundles := array_append(v_affected_bundles, v_existing_bundle_id);
        v_moved := v_moved + 1;
      else
        v_updated := v_updated + 1;
      end if;
      update public.turots_pages p set
        bundle_id = p_bundle_id,
        text_unit_id = case when v_existing_bundle_id <> p_bundle_id then null else p.text_unit_id end,
        page_order = v_page_order,
        label = coalesce(v_page->>'label', v_page->>'folio_label', v_canvas_id),
        folio_label = coalesce(v_page->>'folio_label', v_page->>'label', v_canvas_id),
        side = case when v_page->>'folio_label' ~* 'v$' then 'verso' when v_page->>'folio_label' ~* 'r$' then 'recto' else 'unknown' end,
        image_url = v_page->>'image_url',
        thumbnail_url = coalesce(v_page->>'thumbnail_url', v_page->>'image_url'),
        checksum_sha256 = coalesce(v_page->>'checksum_sha256', p.checksum_sha256),
        access_level = v_access_level,
        source_missing_at = null
      where p.id = v_existing_id;
    end if;
  end loop;

  for v_source_bundle_id in
    select distinct affected.source_id from unnest(v_affected_bundles) as affected(source_id) order by affected.source_id
  loop
    with ordered_pages as (
      select p.id, row_number() over (order by p.page_order, p.id)::integer as new_order
      from public.turots_pages p where p.bundle_id = v_source_bundle_id
    )
    update public.turots_pages p set page_order = ordered_pages.new_order
    from ordered_pages where p.id = ordered_pages.id;
  end loop;

  if p_bundle_extent_pages is not null then
    update public.turots_bundles b set extent_pages = p_bundle_extent_pages, updated_at = now()
    where b.id = p_bundle_id;
  else
    update public.turots_bundles b set
      extent_pages = greatest(coalesce(b.extent_pages, 0), (select coalesce(max(p.page_order), 0) from public.turots_pages p where p.bundle_id = p_bundle_id)),
      updated_at = now()
    where b.id = p_bundle_id;
  end if;

  return jsonb_build_object(
    'added', v_added,
    'updated', v_updated,
    'moved', v_moved,
    'deduplicated', v_deduplicated,
    'total', (select count(*) from public.turots_pages p where p.bundle_id = p_bundle_id),
    'extent_pages', (select b.extent_pages from public.turots_bundles b where b.id = p_bundle_id)
  );
end;
$$;

revoke all on function public.save_turots_bulk_bundle_pages(uuid, jsonb, boolean, integer) from public, anon;
grant execute on function public.save_turots_bulk_bundle_pages(uuid, jsonb, boolean, integer) to authenticated;

notify pgrst, 'reload schema';
