-- =============================================================================
-- TUROTS TAHAP 1-4: SKEMA BENDEL AFILIASI (DREAMSEA, EAP/BL, NT) & SKEMA JUDUL
-- =============================================================================
begin;

-- 1. Kolom tambahan pada turots_bundles untuk metadata asli Dreamsea & EAP/BL (& NT)
alter table public.turots_bundles
  add column if not exists msid text,
  add column if not exists catalog_reference text,
  add column if not exists copying_date_gregorian text,
  add column if not exists begin_year_date text,
  add column if not exists end_year_date text,
  add column if not exists sponsor text,
  add column if not exists pages_text text,
  add column if not exists blank_pages_text text,
  add column if not exists affiliate_items jsonb not null default '[]'::jsonb,
  add column if not exists variant_titles text,
  add column if not exists creation_date text,
  add column if not exists languages text,
  add column if not exists content_type text,
  add column if not exists place_of_origin text,
  add column if not exists originals_information text,
  add column if not exists reference_code text,
  add column if not exists archive_level text,
  add column if not exists extent_text text,
  add column if not exists digitisation_date text,
  add column if not exists project_name text,
  add column if not exists collection_full_name text,
  add column if not exists file_title text,
  add column if not exists citation_text text,
  add column if not exists digitised_by text,
  add column if not exists digitisation_funded_by text,
  add column if not exists attribution_license text;

-- 2. Kolom tambahan pada turots_text_units untuk 55 kolom Judul kurator
alter table public.turots_text_units
  add column if not exists record_no text,
  add column if not exists category_sequence_no integer,
  add column if not exists page_ranges_label text,
  add column if not exists affiliation_title text;

create index if not exists idx_turots_text_units_record_no on public.turots_text_units(record_no);

-- 3. Fungsi pembantu untuk menormalkan kode bendel (mis. DS.001 -> DS 0097 00001)
create or replace function public.resolve_turots_bundle_id(p_code text)
returns uuid
language plpgsql
stable
set search_path = ''
as $$
declare
  v_clean text := btrim(coalesce(p_code, ''));
  v_id uuid;
  v_num integer;
begin
  if v_clean = '' then
    return null;
  end if;
  select b.id into v_id from public.turots_bundles b where lower(b.bundle_code) = lower(v_clean) limit 1;
  if v_id is not null then
    return v_id;
  end if;
  -- DS.001 / DS 1 / DS001 -> DS 0097 00001
  if v_clean ~* '^DS[.\s_-]*0*(\d+)$' then
    v_num := (regexp_match(v_clean, '^DS[.\s_-]*0*(\d+)$', 'i'))[1]::integer;
    select b.id into v_id from public.turots_bundles b
    where b.bundle_code = 'DS 0097 ' || lpad(v_num::text, 5, '0') limit 1;
    if v_id is not null then return v_id; end if;
  end if;
  -- NT.001 / NT_001 -> NT 001
  if v_clean ~* '^NT[.\s_-]*0*(\d+(?:\.\d+)?)$' then
    select b.id into v_id from public.turots_bundles b
    where lower(regexp_replace(b.bundle_code, '[\s._-]+', '', 'g')) = lower(regexp_replace(v_clean, '[\s._-]+', '', 'g'))
    limit 1;
    if v_id is not null then return v_id; end if;
  end if;
  -- EAP1564/2/51 or EAP1564_2_051 -> EAP1564_2_51
  if v_clean ~* '^EAP1564[/._-](\d+)[/._-]0*(\d+)$' then
    select b.id into v_id from public.turots_bundles b
    where b.bundle_code = format('EAP1564_%s_%s',
      (regexp_match(v_clean, '^EAP1564[/._-](\d+)[/._-]0*(\d+)$', 'i'))[1],
      (regexp_match(v_clean, '^EAP1564[/._-](\d+)[/._-]0*(\d+)$', 'i'))[2])
    limit 1;
    if v_id is not null then return v_id; end if;
  end if;
  return null;
end;
$$;

-- 4. Fungsi pembantu untuk mencocokkan label folio (mis. '066v' == '66v') ke page_order
create or replace function public.resolve_turots_folio_page_order(p_bundle_id uuid, p_label text)
returns integer
language sql
stable
set search_path = ''
as $$
  select p.page_order
  from public.turots_pages p
  where p.bundle_id = p_bundle_id
    and (
      lower(regexp_replace(btrim(coalesce(p.folio_label, '')), '^0+(\d+[rv]?)$', '\1', 'i')) =
      lower(regexp_replace(btrim(regexp_replace(coalesce(p_label, ''), '/+$', '')), '^0+(\d+[rv]?)$', '\1', 'i'))
      or (btrim(coalesce(p_label, '')) ~ '^\d+$' and p.page_order = btrim(p_label)::integer)
    )
  order by p.page_order
  limit 1;
$$;

-- 5. Perbarui apply_turots_catalog_import agar mendukung baik rentang nomor urut maupun rentang folio (066v-088r)
create or replace function public.apply_turots_catalog_import(p_operations jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  op jsonb;
  photo jsonb;
  table_name text;
  row_values jsonb;
  collection_values jsonb;
  collection_id uuid;
  v_bundle_id uuid;
  saved_id uuid;
  row_id uuid;
  column_list text;
  key_name text;
  folios jsonb;
  ranges jsonb;
  pair jsonb;
  change_item jsonb;
  before_row jsonb;
  start_order integer;
  end_order integer;
  start_label text;
  end_label text;
  start_match text[];
  completed text[] := array[]::text[];
begin
  if auth.uid() is null or not exists (
    select 1 from public.turots_admins a where a.user_id = (select auth.uid())
  ) then
    raise exception 'Akses hanya untuk admin Turots.' using errcode = '42501';
  end if;
  if jsonb_typeof(p_operations) <> 'array' or jsonb_array_length(p_operations) > 5000 then
    raise exception 'Format impor tidak valid atau terlalu besar.' using errcode = '22023';
  end if;
  if exists (
    select 1 from jsonb_array_elements(p_operations) as items(item)
    where items.item->>'sheet' = 'Bendel' and items.item->>'id' is not null and items.item->>'id' <> ''
      and jsonb_array_length(coalesce(items.item->'photos', '[]'::jsonb)) > 0
  ) then
    raise exception 'Pembaruan daftar foto gunakan proses sinkronisasi foto khusus.' using errcode = '22023';
  end if;

  -- Release mappings for titles that are being remapped in this same atomic import.
  for op in
    select items.item from jsonb_array_elements(p_operations) as items(item)
    where items.item->>'sheet' = 'Judul'
      and nullif(items.item->>'id','') is not null
      and items.item->'folios' is not null
      and items.item->'folios' <> 'null'::jsonb
  loop
    v_bundle_id := public.resolve_turots_bundle_id(op->>'code');
    if v_bundle_id is not null then
      update public.turots_pages p
      set text_unit_id = null
      where p.bundle_id = v_bundle_id and p.text_unit_id = (op->>'id')::uuid;
      update public.turots_pages p
      set text_unit_id = null
      where p.bundle_id = v_bundle_id and p.text_unit_id is not null
        and not exists (
          select 1 from public.turots_text_units u
          where u.id = p.text_unit_id and u.bundle_id = v_bundle_id and u.archived_at is null
        );
    end if;
  end loop;

  for op in select value from jsonb_array_elements(p_operations)
  loop
    if op->>'sheet' = 'Bendel' then
      table_name := 'turots_bundles';
      row_values := coalesce(op->'values', '{}'::jsonb);
      collection_values := op->'collection';
      if collection_values is not null and collection_values <> 'null'::jsonb then
        insert into public.turots_collections (code, name, source_project)
        values (
          upper(regexp_replace(btrim(collection_values->>'project'), '\s+', '-', 'g')) || '-' || upper(regexp_replace(btrim(collection_values->>'name'), '\s+', '-', 'g')),
          btrim(collection_values->>'name'), btrim(collection_values->>'project')
        ) on conflict (code) do nothing;
        select c.id into collection_id from public.turots_collections c
        where lower(regexp_replace(btrim(c.name), '\s+', ' ', 'g')) = lower(regexp_replace(btrim(collection_values->>'name'), '\s+', ' ', 'g'))
          and lower(regexp_replace(btrim(c.source_project), '\s+', ' ', 'g')) = lower(regexp_replace(btrim(collection_values->>'project'), '\s+', ' ', 'g'));
        if collection_id is null then raise exception 'Koleksi tidak dapat diidentifikasi dengan aman.' using errcode = '23505'; end if;
        row_values := row_values || jsonb_build_object('collection_id', collection_id);
      end if;
      if not (row_values ? 'access_level') then
        row_values := row_values || jsonb_build_object('access_level', coalesce((select b.access_level from public.turots_bundles b where b.id = nullif(op->>'id','')::uuid), 'public_preview'));
      end if;
      if op->>'id' is not null and op->>'id' <> '' then
        row_id := (op->>'id')::uuid;
        perform 1 from public.turots_bundles b where b.id = row_id for update;
        row_values := row_values || jsonb_build_object('updated_at', now());
        execute format('select to_jsonb(t) from public.%I t where id = $1 for update', table_name)
          into before_row using row_id;
        if before_row is null then raise exception 'Rekod % tidak lagi tersedia.', row_id using errcode = 'P0002'; end if;
        for change_item in select value from jsonb_array_elements(coalesce(op->'changes', '[]'::jsonb))
        loop
          if change_item->>'field' not in ('koleksi / proyek', 'pemetaan foto', 'foto server')
            and before_row->(change_item->>'field') is distinct from change_item->'before' then
            raise exception 'Data % berubah sejak pratinjau. Buat pratinjau baru.', change_item->>'field' using errcode = '40001';
          end if;
        end loop;
      else
        row_values := row_values || jsonb_build_object('bundle_code', op->>'code', 'publication_status', 'draft');
      end if;
    elsif op->>'sheet' = 'Judul' then
      table_name := 'turots_text_units';
      v_bundle_id := public.resolve_turots_bundle_id(op->>'code');
      if v_bundle_id is null then raise exception 'Bendel % tidak ditemukan.', op->>'code' using errcode = '23503'; end if;
      perform 1 from public.turots_bundles b where b.id = v_bundle_id for update;
      row_values := coalesce(op->'values', '{}'::jsonb);
      if op->>'id' is not null and op->>'id' <> '' then
        row_id := (op->>'id')::uuid;
        perform 1 from public.turots_text_units u where u.id = row_id and u.bundle_id = v_bundle_id for update;
        if not found then raise exception 'Judul % bukan milik bendel %.', row_id, op->>'code' using errcode = '23503'; end if;
        row_values := row_values || jsonb_build_object('updated_at', now());
        execute format('select to_jsonb(t) from public.%I t where id = $1 for update', table_name)
          into before_row using row_id;
        if before_row is null then raise exception 'Rekod % tidak lagi tersedia.', row_id using errcode = 'P0002'; end if;
        for change_item in select value from jsonb_array_elements(coalesce(op->'changes', '[]'::jsonb))
        loop
          if change_item->>'field' <> 'pemetaan foto'
            and before_row->(change_item->>'field') is distinct from change_item->'before' then
            raise exception 'Data % berubah sejak formulir dibuka. Muat ulang data sebelum menyimpan.', change_item->>'field' using errcode = '40001';
          end if;
        end loop;
      else
        perform 1 from public.turots_bundles b where b.id = v_bundle_id for update;
        if not (row_values ? 'sequence_no') then
          row_values := row_values || jsonb_build_object('sequence_no', (select coalesce(max(u.sequence_no), 0) + 1 from public.turots_text_units u where u.bundle_id = v_bundle_id));
        end if;
        if not (row_values ? 'record_no') or nullif(btrim(row_values->>'record_no'), '') is null then
          row_values := row_values || jsonb_build_object('record_no', 'TQ' || lpad(((select count(*) from public.turots_text_units) + 1)::text, 4, '0'));
        end if;
        row_values := row_values || jsonb_build_object('bundle_id', v_bundle_id, 'display_id', op->>'key');
      end if;
    else
      raise exception 'Jenis baris impor tidak dikenal.' using errcode = '22023';
    end if;

    -- Reject unknown fields and fields that would change stable identities.
    for key_name in select jsonb_object_keys(row_values)
    loop
      if key_name in ('id', 'created_at') or (op->>'id' is not null and key_name in ('bundle_code', 'display_id', 'bundle_id')) then
        raise exception 'Impor tidak boleh mengubah identitas rekod (%).', key_name using errcode = '22023';
      end if;
      if not exists (
        select 1 from pg_catalog.pg_attribute a
        where a.attrelid = pg_catalog.to_regclass('public.' || table_name)
          and a.attname = key_name and a.attnum > 0 and not a.attisdropped
      ) then raise exception 'Kolom impor tidak dikenal: %.', key_name using errcode = '22023'; end if;
    end loop;
    select string_agg(format('%I', keys.key_name), ', ' order by keys.key_name) into column_list
      from jsonb_object_keys(row_values) as keys(key_name);
    if op->>'id' is not null and op->>'id' <> '' then
      execute format('update public.%I set (%s) = (select %s from jsonb_populate_record(null::public.%I, $1)) where id = $2 returning id', table_name, column_list, column_list, table_name)
        into saved_id using row_values, row_id;
      if saved_id is null then raise exception 'Rekod % tidak lagi tersedia.', row_id using errcode = 'P0002'; end if;
    else
      execute format('insert into public.%I (%s) select %s from jsonb_populate_record(null::public.%I, $1) returning id', table_name, column_list, column_list, table_name)
        into saved_id using row_values;
    end if;

    if op->>'sheet' = 'Bendel' then
      for photo in select value from jsonb_array_elements(coalesce(op->'photos', '[]'::jsonb))
      loop
        insert into public.turots_pages (bundle_id, canvas_id, page_order, label, folio_label, side, image_url, thumbnail_url, checksum_sha256)
        values (
          saved_id, coalesce(photo->>'canvas_id', photo->>'image_url'), (photo->>'page_order')::integer,
          coalesce(photo->>'label', photo->>'folio_label', photo->>'page_order'),
          coalesce(photo->>'folio_label', photo->>'label', photo->>'page_order'),
          case when coalesce(photo->>'folio_label', '') ~* 'v$' then 'verso' when coalesce(photo->>'folio_label', '') ~* 'r$' then 'recto' else 'unknown' end,
          photo->>'image_url', coalesce(photo->>'thumbnail_url', photo->>'image_url'), photo->>'checksum_sha256'
        );
      end loop;
      if jsonb_array_length(coalesce(op->'photos', '[]'::jsonb)) > 0 then
        update public.turots_bundles b set extent_pages = greatest(coalesce(b.extent_pages, 0),
          (select max(p.page_order) from public.turots_pages p where p.bundle_id = saved_id)), updated_at = now()
        where b.id = saved_id;
      end if;
    else
      folios := op->'folios';
      if folios is not null then
        ranges := folios->'ranges';
        if folios->>'clear' = 'true' then
          update public.turots_pages p set text_unit_id = null where p.bundle_id = v_bundle_id and p.text_unit_id = saved_id;
        elsif jsonb_typeof(ranges) = 'array' then
          if jsonb_array_length(ranges) = 0 then
            update public.turots_pages p set text_unit_id = null where p.bundle_id = v_bundle_id and p.text_unit_id = saved_id;
          end if;
          for pair in select value from jsonb_array_elements(ranges)
          loop
            start_order := (pair->>0)::integer; end_order := (pair->>1)::integer;
            if start_order < 1 or end_order < start_order then raise exception 'Rentang foto tidak valid.' using errcode = '22023'; end if;
            if not exists (select 1 from public.turots_pages p where p.bundle_id = v_bundle_id and p.page_order = start_order)
               or not exists (select 1 from public.turots_pages p where p.bundle_id = v_bundle_id and p.page_order = end_order) then
              raise exception 'Batas rentang foto tidak ditemukan dalam bendel.' using errcode = '22023';
            end if;
            update public.turots_pages p set text_unit_id = saved_id
            where p.bundle_id = v_bundle_id and p.page_order between start_order and end_order;
          end loop;
          update public.turots_pages p set text_unit_id = null
          where p.bundle_id = v_bundle_id and p.text_unit_id = saved_id
            and not exists (select 1 from jsonb_array_elements(ranges) r
              where p.page_order between (r->>0)::integer and (r->>1)::integer);
        else
          start_label := btrim(regexp_replace(coalesce(folios->>'start', ''), '/+$', ''));
          end_label := btrim(regexp_replace(coalesce(folios->>'end', ''), '/+$', ''));
          if start_label ~ '^[0-9]+[rvRV]?\s*-\s*[0-9]+[rvRV]?$' and end_label = '' then
            start_match := regexp_match(start_label, '^\s*([0-9]+[rvRV]?)\s*-\s*([0-9]+[rvRV]?)\s*$', 'i');
            start_label := start_match[1];
            end_label := start_match[2];
          end if;
          start_order := public.resolve_turots_folio_page_order(v_bundle_id, start_label);
          end_order := public.resolve_turots_folio_page_order(v_bundle_id, coalesce(nullif(end_label, ''), start_label));
          if start_order is not null and end_order is not null and end_order >= start_order then
            update public.turots_pages p set text_unit_id = saved_id
            where p.bundle_id = v_bundle_id and p.page_order between start_order and end_order;
            update public.turots_pages p set text_unit_id = null
            where p.bundle_id = v_bundle_id and p.text_unit_id = saved_id
              and p.page_order not between start_order and end_order;
          end if;
        end if;
      end if;
    end if;
    completed := array_append(completed, coalesce(op->>'sheet', '') || ' ' || coalesce(op->>'key', op->>'code', ''));
  end loop;
  return jsonb_build_object('completed', to_jsonb(completed));
end;
$$;

revoke all on function public.apply_turots_catalog_import(jsonb) from public, anon;
grant execute on function public.apply_turots_catalog_import(jsonb) to authenticated;

commit;
notify pgrst, 'reload schema';
