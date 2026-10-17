-- Harden public access, catalog writes, statistics, and audit history.
begin;

alter table public.turots_text_units
  add column if not exists paper_type_other text,
  add column if not exists paper_length_cm numeric,
  add column if not exists paper_width_cm numeric,
  add column if not exists slug text;
create unique index if not exists turots_unit_slug_unique on public.turots_text_units(slug) where slug is not null;
alter table public.turots_text_units add column if not exists archived_at timestamptz;
alter table public.turots_bundles
  add column if not exists affiliation_url text,
  add column if not exists surrogate_format text,
  add column if not exists country text,
  add column if not exists city_province text,
  add column if not exists right_to_left boolean,
  add column if not exists subject_matter text,
  add column if not exists copyist text,
  add column if not exists copying_date_native text,
  add column if not exists copying_place text,
  add column if not exists bundle_script text,
  add column if not exists current_status text,
  add column if not exists rubrication text,
  add column if not exists bundle_description text,
  add column if not exists colophon text,
  add column if not exists cover text,
  add column if not exists cover_size text,
  add column if not exists binding text,
  add column if not exists paper_size text,
  add column if not exists dimensions text,
  add column if not exists paper_type text,
  add column if not exists paper_type_other text,
  add column if not exists watermark text,
  add column if not exists countermark text,
  add column if not exists ink text,
  add column if not exists blank_pages integer,
  add column if not exists physical_condition text,
  add column if not exists completeness text,
  add column if not exists illumination text,
  add column if not exists illustration text,
  add column if not exists bundle_notes text;
alter table public.turots_bundles add column if not exists source_identifier text;
alter table public.turots_bundles add column if not exists archive_identifier text;
alter table public.turots_bundles add column if not exists item_url text;
alter table public.turots_bundles add column if not exists iiif_manifest_url text;
alter table public.turots_bundles add column if not exists affiliation text;
alter table public.turots_bundles add column if not exists metadata_status text not null default 'imported';
alter table public.turots_bundles add column if not exists extent_pages integer;
alter table public.turots_bundles add column if not exists source_missing_at timestamptz;
alter table public.turots_bundles add column if not exists updated_at timestamptz not null default now();
alter table public.turots_text_units add column if not exists year_normalized_start integer;
alter table public.turots_text_units add column if not exists year_normalized_end integer;
alter table public.turots_text_units add column if not exists description text;
alter table public.turots_text_units add column if not exists keywords text;
alter table public.turots_text_units add column if not exists references_text text;
alter table public.turots_text_units add column if not exists notes text;
alter table public.turots_text_units add column if not exists metadata_status text not null default 'imported';
alter table public.turots_text_units add column if not exists sequence_no integer not null default 1;
alter table public.turots_text_units add column if not exists updated_at timestamptz not null default now();
alter table public.turots_text_units add column if not exists display_id text;
alter table public.turots_text_units add column if not exists title_original text;
alter table public.turots_text_units add column if not exists title_latin text;
alter table public.turots_text_units add column if not exists folio_start text;
alter table public.turots_text_units add column if not exists folio_end text;
alter table public.turots_text_units add column if not exists author text;
alter table public.turots_text_units add column if not exists scribe text;
alter table public.turots_text_units add column if not exists language text;
alter table public.turots_text_units add column if not exists script text;
alter table public.turots_text_units add column if not exists year_original text;
alter table public.turots_text_units add column if not exists category_primary text;
alter table public.turots_text_units add column if not exists category_secondary text;
alter table public.turots_text_units add column if not exists category_tertiary text;
alter table public.turots_text_units add column if not exists title_curatorial text;
alter table public.turots_text_units add column if not exists title_from_team text;
alter table public.turots_pages add column if not exists side text;
alter table public.turots_pages add column if not exists checksum_sha256 text;
alter table public.turots_pages add column if not exists text_unit_id uuid references public.turots_text_units(id) on delete set null;
alter table public.turots_pages add column if not exists canvas_id text;
alter table public.turots_pages add column if not exists page_order integer;
alter table public.turots_pages add column if not exists label text;
alter table public.turots_pages add column if not exists folio_label text;
alter table public.turots_pages add column if not exists image_url text;
alter table public.turots_pages add column if not exists thumbnail_url text;
alter table public.turots_pages add column if not exists access_level text not null default 'public_preview';
alter table public.turots_pages add column if not exists source_missing_at timestamptz;
alter table public.turots_text_units add column if not exists archived_at timestamptz;
alter table public.turots_bundles alter column access_level set default 'public_preview';
alter table public.turots_bundles drop constraint if exists turots_bundles_access_level_check;
alter table public.turots_bundles add constraint turots_bundles_access_level_check check (access_level in ('public_preview','public_full','researcher','private'));
alter table public.turots_pages drop constraint if exists turots_pages_access_level_check;
alter table public.turots_pages add constraint turots_pages_access_level_check check (access_level in ('public_preview','public_full','researcher','private'));
update public.turots_pages p set access_level = b.access_level from public.turots_bundles b where b.id=p.bundle_id and p.access_level<>b.access_level;
drop policy if exists "public read published bundles" on public.turots_bundles;
create policy "public read published bundles" on public.turots_bundles for select to anon, authenticated
  using (publication_status = 'published' and access_level in ('public_preview','public_full'));
drop policy if exists "public read published pages" on public.turots_pages;
create policy "public read published pages" on public.turots_pages for select to anon, authenticated
  using (access_level in ('public_preview','public_full') and source_missing_at is null and exists (select 1 from public.turots_bundles b where b.id=bundle_id and b.publication_status='published' and b.access_level in ('public_preview','public_full')));
alter table public.turots_pages drop constraint if exists turots_pages_access_level_check;
alter table public.turots_pages add constraint turots_pages_access_level_check check (access_level in ('public_preview','public_full','researcher','private'));
alter table public.turots_text_units
  add column if not exists title_curatorial text,
  add column if not exists title_from_team text,
  add column if not exists scholarly_classification_1 text,
  add column if not exists scholarly_classification_2 text,
  add column if not exists scholarly_classification_3 text,
  add column if not exists category_secondary text,
  add column if not exists category_tertiary text,
  add column if not exists folio_separator text,
  add column if not exists year_masehi text,
  add column if not exists copying_location text,
  add column if not exists manuscript_origin text,
  add column if not exists lines_per_page text,
  add column if not exists marginal_notes text,
  add column if not exists meaning_notes text,
  add column if not exists colophon text,
  add column if not exists marginal_note text,
  add column if not exists physical_condition text,
  add column if not exists readability text,
  add column if not exists completeness text,
  add column if not exists related_manuscripts text,
  add column if not exists related_persons text,
  add column if not exists glossary text;
alter table public.turots_bundles alter column access_level set default 'public_preview';
alter table public.turots_bundles drop constraint if exists turots_bundles_access_level_check;
alter table public.turots_bundles add constraint turots_bundles_access_level_check check (access_level in ('public_preview','public_full','researcher','private'));
update public.turots_pages p set access_level = b.access_level
from public.turots_bundles b where b.id = p.bundle_id and p.access_level <> b.access_level;
create table if not exists public.turots_monthly_manuscript_views (
  text_unit_id uuid not null references public.turots_text_units(id) on delete cascade,
  view_month date not null,
  visitor_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (text_unit_id, view_month, visitor_id),
  constraint turots_monthly_views_first_day check (extract(day from view_month) = 1)
);
alter table public.turots_monthly_manuscript_views enable row level security;
revoke all on public.turots_monthly_manuscript_views from public, anon, authenticated;
create index if not exists turots_monthly_manuscript_views_rank_idx on public.turots_monthly_manuscript_views(view_month, text_unit_id);

-- The earlier migration used open authenticated write policies. Replace them
-- with explicit membership checks so a normal signed-in account is read-only.
drop policy if exists "admin manage bundles" on public.turots_bundles;
drop policy if exists "admin manage units" on public.turots_text_units;
drop policy if exists "admin manage pages" on public.turots_pages;
drop policy if exists "admin manage collections" on public.turots_collections;
drop policy if exists "admin manage classifications" on public.turots_classifications;
drop policy if exists "admin manage unit classifications" on public.turots_text_unit_classifications;
create policy "admin manage bundles" on public.turots_bundles for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));
create policy "admin manage units" on public.turots_text_units for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));
create policy "admin manage pages" on public.turots_pages for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));
create policy "admin manage collections" on public.turots_collections for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));
drop policy if exists "public read collections" on public.turots_collections;
create policy "public read collections" on public.turots_collections for select to anon, authenticated
  using (exists (
    select 1 from public.turots_bundles b
    where b.collection_id = turots_collections.id and b.publication_status = 'published'
      and b.access_level in ('public_preview', 'public_full')
  ));
create policy "admin manage classifications" on public.turots_classifications for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));
create policy "admin manage unit classifications" on public.turots_text_unit_classifications for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));
drop policy if exists "admin write audit" on public.turots_audit_log;
drop policy if exists "admin read audit" on public.turots_audit_log;
create policy "admin read audit" on public.turots_audit_log for select to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));

create index if not exists turots_units_status_bundle_idx
  on public.turots_text_units (metadata_status, bundle_id, sequence_no);
create index if not exists turots_pages_bundle_unit_order_idx
  on public.turots_pages (bundle_id, text_unit_id, page_order);
create index if not exists turots_bundles_public_access_idx
  on public.turots_bundles (updated_at desc, bundle_code)
  where publication_status = 'published' and access_level in ('public_preview', 'public_full');
create index if not exists turots_units_public_status_idx
  on public.turots_text_units (bundle_id, sequence_no) where archived_at is null;

drop policy if exists "public read published units" on public.turots_text_units;
create policy "public read published units" on public.turots_text_units
  for select to anon, authenticated
  using (archived_at is null and exists (
    select 1 from public.turots_bundles b
    where b.id = bundle_id and metadata_status = 'imported' and b.publication_status = 'published'
      and b.access_level in ('public_preview', 'public_full')
  ));

create or replace function public.search_turots_catalog(
  p_query text default '', p_category text default '', p_collection text default '',
  p_language text default '', p_script text default '', p_completeness text default '',
  p_person text default '', p_status text default '', p_sort text default 'newest',
  p_offset integer default 0, p_limit integer default 12
)
returns table(entry jsonb, total_count bigint)
language sql stable set search_path = '' as $$
  with public_bundles as (
    select b.*, c.name as collection_name, c.source_project,
      coalesce((select string_agg(u.title_original, ' ') from public.turots_text_units u where u.bundle_id = b.id and u.archived_at is null and u.metadata_status='imported'), '') as unit_search,
      coalesce((select count(*) from public.turots_text_units u where u.bundle_id = b.id and u.archived_at is null and u.metadata_status='imported'), 0)::integer as unit_count,
      (select p.thumbnail_url from public.turots_pages p where p.bundle_id = b.id and p.source_missing_at is null and p.access_level in ('public_preview','public_full') order by p.page_order limit 1) as cover_thumbnail
    from public.turots_bundles b
    left join public.turots_collections c on c.id = b.collection_id
    where b.publication_status = 'published' and b.access_level in ('public_preview','public_full')
  ), entries as (
    select 'bundle'::text as kind, b.updated_at, b.bundle_code,
      coalesce(nullif(b.display_title,''),b.bundle_code) as sort_label,
      jsonb_build_object(
        'kind','bundle','id','bundle-'||b.id::text,
        'b',jsonb_build_object('id',b.id,'bundle_code',b.bundle_code,'display_title',b.display_title,'updated_at',b.updated_at,
          'title_count',b.unit_count,'turots_collections',jsonb_build_object('name',b.collection_name,'source_project',b.source_project),
           'turots_pages',case when b.cover_thumbnail is null then '[]'::jsonb else jsonb_build_array(jsonb_build_object('thumbnail_url',b.cover_thumbnail,'image_url',b.cover_thumbnail)) end),
        'u','{}'::jsonb
      ) as entry
    from public_bundles b
    where (coalesce(p_category,'') = '' or p_category = 'Bendel')
      and (coalesce(p_collection,'') = '' or b.collection_name = p_collection)
      and (coalesce(p_query,'') = '' or position(lower(p_query) in lower(concat_ws(' ',b.display_title,b.bundle_code,b.source_identifier,b.collection_name,b.unit_search))) > 0)
    union all
    select 'title'::text as kind, b.updated_at, b.bundle_code,
      coalesce(nullif(u.title_latin,''),nullif(u.title_original,''),u.display_id) as sort_label,
      jsonb_build_object(
        'kind','title','id',u.id,
        'b',jsonb_build_object('id',b.id,'bundle_code',b.bundle_code,'display_title',b.display_title,'updated_at',b.updated_at,
          'turots_collections',jsonb_build_object('name',c.name,'source_project',c.source_project),
          'turots_pages',case when p.thumbnail_url is null then '[]'::jsonb else jsonb_build_array(jsonb_build_object('text_unit_id',u.id,'page_order',p.page_order,'thumbnail_url',p.thumbnail_url,'image_url',p.image_url)) end),
        'u',to_jsonb(u)
      ) as entry
    from public.turots_text_units u
    join public.turots_bundles b on b.id = u.bundle_id
    left join public.turots_collections c on c.id = b.collection_id
    left join lateral (
      select pg.page_order, pg.thumbnail_url, pg.image_url from public.turots_pages pg
      where pg.bundle_id = b.id and pg.text_unit_id = u.id and pg.source_missing_at is null and pg.access_level in ('public_preview','public_full')
      order by pg.page_order limit 1
    ) p on true
    where u.archived_at is null and u.metadata_status = 'imported'
      and b.publication_status = 'published' and b.access_level in ('public_preview','public_full')
      and (coalesce(p_category,'') = '' or p_category = u.category_primary)
      and (coalesce(p_collection,'') = '' or c.name = p_collection)
      and (coalesce(p_language,'') = '' or lower(p_language) = any(regexp_split_to_array(lower(coalesce(u.language,'')), '\s*[,;|]\s*')))
      and (coalesce(p_script,'') = '' or lower(p_script) = any(regexp_split_to_array(lower(coalesce(u.script,'')), '\s*[,;|]\s*')))
      and (coalesce(p_completeness,'') = '' or lower(coalesce(u.completeness,'')) = lower(p_completeness))
      and (coalesce(p_person,'') = '' or concat_ws(' ',u.author,u.scribe,u.related_persons) ilike '%'||p_person||'%')
      and (coalesce(p_status,'') = '' or u.metadata_status = p_status)
      and (coalesce(p_query,'') = '' or position(lower(p_query) in lower(concat_ws(' ',u.title_original,u.title_latin,u.title_curatorial,u.description,u.author,u.scribe,u.related_persons,u.display_id,b.bundle_code))) > 0)
  ), counted as (
    select entries.*, count(*) over() as total_count from entries
  )
  select counted.entry, counted.total_count from counted
  order by case when p_sort = 'judul' then counted.sort_label end asc,
           case when p_sort <> 'judul' then counted.updated_at end desc,
           counted.bundle_code asc, counted.kind asc
  limit greatest(1, least(coalesce(p_limit,12),48)) offset greatest(0,coalesce(p_offset,0));
$$;
revoke all on function public.search_turots_catalog(text,text,text,text,text,text,text,text,text,integer,integer) from public;
grant execute on function public.search_turots_catalog(text,text,text,text,text,text,text,text,text,integer,integer) to anon, authenticated;

create or replace function public.get_turots_catalog_filter_options()
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'collections', coalesce((select jsonb_agg(name order by name) from (select distinct c.name from public.turots_bundles b join public.turots_collections c on c.id=b.collection_id where b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb),
    'languages', coalesce((select jsonb_agg(value order by value) from (select distinct btrim(value) value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral regexp_split_to_table(coalesce(u.language,''), '\s*[,;|]\s*') value where u.archived_at is null and u.metadata_status='imported' and b.publication_status='published' and b.access_level in ('public_preview','public_full') and btrim(value) <> '') x), '[]'::jsonb),
    'scripts', coalesce((select jsonb_agg(value order by value) from (select distinct btrim(value) value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral regexp_split_to_table(coalesce(u.script,''), '\s*[,;|]\s*') value where u.archived_at is null and u.metadata_status='imported' and b.publication_status='published' and b.access_level in ('public_preview','public_full') and btrim(value) <> '') x), '[]'::jsonb),
    'completeness', coalesce((select jsonb_agg(value order by value) from (select distinct u.completeness as value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id where u.archived_at is null and u.metadata_status='imported' and u.completeness is not null and b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb),
    'persons', coalesce((select jsonb_agg(value order by value) from (select distinct value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral unnest(array[u.author,u.scribe]) value where u.archived_at is null and u.metadata_status='imported' and value is not null and b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb)
  );
$$;
revoke all on function public.get_turots_catalog_filter_options() from public;
grant execute on function public.get_turots_catalog_filter_options() to anon, authenticated;

-- A single RPC makes a workbook import all-or-nothing. Every dynamic identifier
-- is checked against the fixed target table's actual columns before execution.
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
  bundle_id uuid;
  saved_id uuid;
  row_id uuid;
  column_list text;
  key_name text;
  unit_code text;
  unit_key text;
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
  end_match text[];
  start_ordinal integer;
  end_ordinal integer;
  selected_count integer;
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
    select 1 from jsonb_array_elements(p_operations) items(op)
    where op->>'sheet' = 'Bendel' and op->>'id' is not null and op->>'id' <> ''
      and jsonb_array_length(coalesce(op->'photos', '[]'::jsonb)) > 0
  ) then
    raise exception 'Pembaruan daftar foto gunakan proses sinkronisasi foto khusus.' using errcode = '22023';
  end if;

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
      select b.id into bundle_id from public.turots_bundles b where b.bundle_code = op->>'code';
      if bundle_id is null then raise exception 'Bendel % tidak ditemukan.', op->>'code' using errcode = '23503'; end if;
      perform 1 from public.turots_bundles b where b.id = bundle_id for update;
      row_values := coalesce(op->'values', '{}'::jsonb);
      if op->>'id' is not null and op->>'id' <> '' then
        row_id := (op->>'id')::uuid;
        row_values := row_values || jsonb_build_object('updated_at', now());
      else
        perform 1 from public.turots_bundles b where b.id = bundle_id for update;
        if not (row_values ? 'sequence_no') then
          row_values := row_values || jsonb_build_object('sequence_no', (select coalesce(max(u.sequence_no), 0) + 1 from public.turots_text_units u where u.bundle_id = bundle_id));
        end if;
        row_values := row_values || jsonb_build_object('bundle_id', bundle_id, 'display_id', op->>'key');
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
    select string_agg(format('%I', key_name), ', ' order by key_name) into column_list
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
          update public.turots_pages p set text_unit_id = null where p.bundle_id = bundle_id and p.text_unit_id = saved_id;
        elsif jsonb_typeof(ranges) = 'array' then
          for pair in select value from jsonb_array_elements(ranges)
          loop
            start_order := (pair->>0)::integer; end_order := (pair->>1)::integer;
            if start_order < 1 or end_order < start_order then raise exception 'Rentang foto tidak valid.' using errcode = '22023'; end if;
            if not exists (select 1 from public.turots_pages p where p.bundle_id = bundle_id and p.page_order = start_order)
               or not exists (select 1 from public.turots_pages p where p.bundle_id = bundle_id and p.page_order = end_order) then
              raise exception 'Batas rentang foto tidak ditemukan dalam bendel.' using errcode = '22023';
            end if;
            if exists (select 1 from public.turots_pages p where p.bundle_id = bundle_id and p.page_order between start_order and end_order and p.text_unit_id is not null and p.text_unit_id <> saved_id) then
              raise exception 'Rentang foto bertabrakan dengan judul lain.' using errcode = '23505';
            end if;
            update public.turots_pages p set text_unit_id = saved_id
            where p.bundle_id = bundle_id and p.page_order between start_order and end_order;
          end loop;
          update public.turots_pages p set text_unit_id = null
          where p.bundle_id = bundle_id and p.text_unit_id = saved_id
            and not exists (select 1 from jsonb_array_elements(ranges) r
              where p.page_order between (r->>0)::integer and (r->>1)::integer);
        else
          start_label := btrim(folios->>'start'); end_label := btrim(folios->>'end');
          start_match := regexp_match(start_label, '^(\d+)\s*([rv])$', 'i');
          end_match := regexp_match(end_label, '^(\d+)\s*([rv])$', 'i');
          if start_match is null or end_match is null then raise exception 'Rentang folio harus memakai format seperti 1r sampai 10v.' using errcode = '22023'; end if;
          start_ordinal := start_match[1]::integer * 2 + case lower(start_match[2]) when 'v' then 1 else 0 end;
          end_ordinal := end_match[1]::integer * 2 + case lower(end_match[2]) when 'v' then 1 else 0 end;
          if end_ordinal < start_ordinal then raise exception 'Urutan folio akhir mendahului folio awal.' using errcode = '22023'; end if;
          if not exists (select 1 from public.turots_pages p where p.bundle_id = bundle_id and lower(regexp_replace(p.folio_label, '\s+', '', 'g')) = lower(regexp_replace(start_label, '\s+', '', 'g')))
             or not exists (select 1 from public.turots_pages p where p.bundle_id = bundle_id and lower(regexp_replace(p.folio_label, '\s+', '', 'g')) = lower(regexp_replace(end_label, '\s+', '', 'g'))) then
            raise exception 'Folio batas tidak ditemukan dalam bendel.' using errcode = '22023';
          end if;
          if exists (select 1 from public.turots_pages p
            where p.bundle_id = bundle_id and p.folio_label ~* '^\s*\d+\s*[rv]\s*$'
              and (regexp_match(p.folio_label, '^\s*(\d+)\s*([rv])\s*$', 'i')) is not null
              and ((regexp_match(p.folio_label, '^\s*(\d+)\s*([rv])\s*$', 'i'))[1])::integer * 2 + case lower((regexp_match(p.folio_label, '^\s*(\d+)\s*([rv])\s*$', 'i'))[2]) when 'v' then 1 else 0 end between start_ordinal and end_ordinal
              and p.text_unit_id is not null and p.text_unit_id <> saved_id) then
            raise exception 'Rentang folio bertabrakan dengan judul lain.' using errcode = '23505';
          end if;
          update public.turots_pages p set text_unit_id = saved_id
          where p.bundle_id = bundle_id and p.folio_label ~* '^\s*\d+\s*[rv]\s*$'
            and ((regexp_match(p.folio_label, '^\s*(\d+)\s*([rv])\s*$', 'i'))[1])::integer * 2 + case lower((regexp_match(p.folio_label, '^\s*(\d+)\s*([rv])\s*$', 'i'))[2]) when 'v' then 1 else 0 end between start_ordinal and end_ordinal;
          update public.turots_pages p set text_unit_id = null
          where p.bundle_id = bundle_id and p.text_unit_id = saved_id
            and (p.folio_label !~* '^\s*\d+\s*[rv]\s*$'
              or ((regexp_match(p.folio_label, '^\s*(\d+)\s*([rv])\s*$', 'i'))[1])::integer * 2 + case lower((regexp_match(p.folio_label, '^\s*(\d+)\s*([rv])\s*$', 'i'))[2]) when 'v' then 1 else 0 end not between start_ordinal and end_ordinal);
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

create or replace function public.save_turots_bundle_pages(p_bundle_id uuid, p_pages jsonb, p_source_list_complete boolean default false)
returns jsonb language plpgsql set search_path = '' as $$
declare page jsonb; existing_id uuid; next_order integer; added_count integer := 0; updated_count integer := 0; missing_count integer := 0;
begin
  if auth.uid() is null or not exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())) then
    raise exception 'Akses hanya untuk admin Turots.' using errcode = '42501';
  end if;
  if jsonb_typeof(p_pages) <> 'array' or jsonb_array_length(p_pages) = 0 or jsonb_array_length(p_pages) > 10000 then
    raise exception 'Daftar foto kosong atau terlalu besar.' using errcode = '22023';
  end if;
  if not exists (select 1 from public.turots_bundles b where b.id = p_bundle_id) then
    raise exception 'Bendel tidak ditemukan.' using errcode = 'P0002';
  end if;
  perform 1 from public.turots_bundles b where b.id = p_bundle_id for update;
  if exists (select 1 from jsonb_array_elements(p_pages) as items(item) where coalesce(item->>'canvas_id', '') = '')
     or (select count(*) from jsonb_array_elements(p_pages)) <> (select count(distinct item->>'canvas_id') from jsonb_array_elements(p_pages) as items(item)) then
    raise exception 'Identitas foto kosong atau berulang.' using errcode = '22023';
  end if;
  select coalesce(max(p.page_order), 0) into next_order from public.turots_pages p where p.bundle_id = p_bundle_id;
  for page in select item from jsonb_array_elements(p_pages) as items(item)
  loop
    select p.id into existing_id from public.turots_pages p where p.bundle_id = p_bundle_id and p.canvas_id = page->>'canvas_id' for update;
    if existing_id is not null then
      update public.turots_pages p set label = page->>'label', folio_label = page->>'folio_label',
        page_order = coalesce((page->>'page_order')::integer, p.page_order), image_url = page->>'image_url', thumbnail_url = coalesce(page->>'thumbnail_url', page->>'image_url'),
        checksum_sha256 = coalesce(page->>'checksum_sha256', p.checksum_sha256), source_missing_at = null
      where p.id = existing_id;
      updated_count := updated_count + 1;
    else
      next_order := next_order + 1;
      insert into public.turots_pages(bundle_id, canvas_id, page_order, label, folio_label, side, image_url, thumbnail_url, checksum_sha256)
      values (p_bundle_id, page->>'canvas_id', next_order, page->>'label', page->>'folio_label',
        case when page->>'folio_label' ~* 'v$' then 'verso' when page->>'folio_label' ~* 'r$' then 'recto' else 'unknown' end,
        page->>'image_url', coalesce(page->>'thumbnail_url', page->>'image_url'), page->>'checksum_sha256');
      added_count := added_count + 1;
    end if;
  end loop;
  if p_source_list_complete then
    update public.turots_pages p set source_missing_at = coalesce(source_missing_at, now())
    where p.bundle_id = p_bundle_id and not exists (
      select 1 from jsonb_array_elements(p_pages) as items(item) where item->>'canvas_id' = p.canvas_id
    );
    get diagnostics missing_count = row_count;
  end if;
  update public.turots_bundles b set extent_pages = greatest(coalesce(b.extent_pages, 0), next_order), updated_at = now() where b.id = p_bundle_id;
  return jsonb_build_object('added', added_count, 'updated', updated_count, 'total', next_order, 'missing', missing_count);
end;
$$;
revoke all on function public.save_turots_bundle_pages(uuid, jsonb, boolean) from public, anon;
grant execute on function public.save_turots_bundle_pages(uuid, jsonb, boolean) to authenticated;

create or replace function public.save_turots_title_folio_range(
  p_bundle_id uuid, p_text_unit_id uuid, p_folios jsonb
)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  first_order integer;
  last_order integer;
  start_label text;
  end_label text;
  start_match text[];
  end_match text[];
  selected_count integer;
begin
  if auth.uid() is null or not exists (
    select 1 from public.turots_admins a where a.user_id = (select auth.uid())
  ) then raise exception 'Akses hanya untuk admin Turots.' using errcode = '42501'; end if;
  perform 1 from public.turots_bundles b where b.id = p_bundle_id for update;
  if not found or not exists (
    select 1 from public.turots_text_units u where u.id = p_text_unit_id and u.bundle_id = p_bundle_id
  ) then raise exception 'Bendel atau judul tidak ditemukan.' using errcode = 'P0002'; end if;

  if jsonb_typeof(p_folios->'ranges') = 'array' then
    if exists (
      select 1 from jsonb_array_elements(p_folios->'ranges') r
      where (r->>0)::integer < 1 or (r->>1)::integer < (r->>0)::integer
    ) then raise exception 'Rentang foto tidak valid.' using errcode = '22023'; end if;
    if exists (
      select 1 from jsonb_array_elements(p_folios->'ranges') r
      where not exists (select 1 from public.turots_pages p where p.bundle_id=p_bundle_id and p.page_order=(r->>0)::integer)
         or not exists (select 1 from public.turots_pages p where p.bundle_id=p_bundle_id and p.page_order=(r->>1)::integer)
    ) then raise exception 'Batas rentang foto tidak ditemukan dalam bendel.' using errcode = '22023'; end if;
    if exists (
      select 1 from public.turots_pages p
      where p.bundle_id=p_bundle_id and p.text_unit_id is not null and p.text_unit_id<>p_text_unit_id
        and exists (select 1 from jsonb_array_elements(p_folios->'ranges') r where p.page_order between (r->>0)::integer and (r->>1)::integer)
    ) then raise exception 'Rentang foto bertabrakan dengan judul lain.' using errcode = '23505'; end if;
    update public.turots_pages p set text_unit_id=p_text_unit_id
    where p.bundle_id=p_bundle_id and exists (select 1 from jsonb_array_elements(p_folios->'ranges') r where p.page_order between (r->>0)::integer and (r->>1)::integer);
    get diagnostics selected_count = row_count;
    update public.turots_pages p set text_unit_id=null
    where p.bundle_id=p_bundle_id and p.text_unit_id=p_text_unit_id
      and not exists (select 1 from jsonb_array_elements(p_folios->'ranges') r where p.page_order between (r->>0)::integer and (r->>1)::integer);
  else
    start_label := btrim(p_folios->>'start'); end_label := btrim(p_folios->>'end');
    start_match := regexp_match(start_label, '^(\d+)\s*([rv])$', 'i');
    end_match := regexp_match(end_label, '^(\d+)\s*([rv])$', 'i');
    if start_match is null or end_match is null then raise exception 'Folio harus seperti 1r sampai 10v.' using errcode = '22023'; end if;
    first_order := start_match[1]::integer * 2 + case lower(start_match[2]) when 'v' then 1 else 0 end;
    last_order := end_match[1]::integer * 2 + case lower(end_match[2]) when 'v' then 1 else 0 end;
    if last_order < first_order then raise exception 'Urutan folio akhir mendahului folio awal.' using errcode = '22023'; end if;
    if not exists (select 1 from public.turots_pages p where p.bundle_id=p_bundle_id and lower(regexp_replace(p.folio_label,'\s+','','g'))=lower(regexp_replace(start_label,'\s+','','g')))
       or not exists (select 1 from public.turots_pages p where p.bundle_id=p_bundle_id and lower(regexp_replace(p.folio_label,'\s+','','g'))=lower(regexp_replace(end_label,'\s+','','g'))) then
      raise exception 'Folio batas tidak ditemukan dalam bendel.' using errcode = '22023';
    end if;
    if exists (
      select 1 from public.turots_pages p
      where p.bundle_id=p_bundle_id and p.text_unit_id is not null and p.text_unit_id<>p_text_unit_id
        and p.folio_label ~* '^\s*\d+\s*[rv]\s*$'
        and ((regexp_match(p.folio_label,'^\s*(\d+)\s*([rv])\s*$','i'))[1])::integer * 2
          + case lower((regexp_match(p.folio_label,'^\s*(\d+)\s*([rv])\s*$','i'))[2]) when 'v' then 1 else 0 end between first_order and last_order
    ) then raise exception 'Rentang folio bertabrakan dengan judul lain.' using errcode = '23505'; end if;
    update public.turots_pages p set text_unit_id=p_text_unit_id
    where p.bundle_id=p_bundle_id and p.folio_label ~* '^\s*\d+\s*[rv]\s*$'
      and ((regexp_match(p.folio_label,'^\s*(\d+)\s*([rv])\s*$','i'))[1])::integer * 2
        + case lower((regexp_match(p.folio_label,'^\s*(\d+)\s*([rv])\s*$','i'))[2]) when 'v' then 1 else 0 end between first_order and last_order;
    get diagnostics selected_count = row_count;
    update public.turots_pages p set text_unit_id=null
    where p.bundle_id=p_bundle_id and p.text_unit_id=p_text_unit_id and (
      p.folio_label !~* '^\s*\d+\s*[rv]\s*$'
      or ((regexp_match(p.folio_label,'^\s*(\d+)\s*([rv])\s*$','i'))[1])::integer * 2
        + case lower((regexp_match(p.folio_label,'^\s*(\d+)\s*([rv])\s*$','i'))[2]) when 'v' then 1 else 0 end not between first_order and last_order
    );
  end if;
  if selected_count = 0 then raise exception 'Tidak ada halaman pada rentang yang dipilih.' using errcode = '22023'; end if;
  return selected_count;
end;
$$;
revoke all on function public.save_turots_title_folio_range(uuid, uuid, jsonb) from public, anon;
grant execute on function public.save_turots_title_folio_range(uuid, uuid, jsonb) to authenticated;

create table if not exists public.turots_public_rate_events (
  ip_hash text not null,
  event_type text not null check (event_type in ('guestbook', 'view')),
  created_at timestamptz not null default now()
);
alter table public.turots_public_rate_events enable row level security;
revoke all on public.turots_public_rate_events from public, anon, authenticated;
create index if not exists turots_public_rate_events_lookup_idx on public.turots_public_rate_events(ip_hash, event_type, created_at desc);

-- Per-page views are throttled to one insert per visitor and title per month by
-- the primary key; reject malformed ids before they can be used as an abuse vector.
create or replace function public.record_turots_manuscript_view(p_text_unit_id uuid, p_visitor_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare request_headers jsonb; client_ip text; client_hash text; event_count integer;
begin
  request_headers := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  client_ip := coalesce(request_headers->>'cf-connecting-ip', split_part(request_headers->>'x-forwarded-for', ',', 1));
  if client_ip is not null and btrim(client_ip) <> '' then
    client_hash := encode(public.digest(client_ip, 'sha256'), 'hex');
    perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext('view:' || client_hash));
    delete from public.turots_public_rate_events where created_at < now() - interval '24 hours';
    select count(*) into event_count from public.turots_public_rate_events e
      where e.ip_hash = client_hash and e.event_type = 'view' and e.created_at > now() - interval '1 hour';
    if event_count >= 120 then return; end if;
    insert into public.turots_public_rate_events(ip_hash, event_type) values (client_hash, 'view');
  end if;
  if p_visitor_id is null or p_text_unit_id is null then return; end if;
  insert into public.turots_monthly_manuscript_views(text_unit_id, view_month, visitor_id)
  select u.id, date_trunc('month', now() at time zone 'Asia/Bangkok')::date, p_visitor_id
  from public.turots_text_units u join public.turots_bundles b on b.id = u.bundle_id
  where u.id = p_text_unit_id and u.metadata_status = 'imported' and u.archived_at is null
    and b.publication_status = 'published' and b.access_level in ('public_preview', 'public_full')
  on conflict do nothing;
end;
$$;

create or replace function public.get_turots_monthly_popular()
returns table (
  text_unit_id uuid, bundle_id uuid, bundle_code text, display_id text,
  title_original text, display_title text, category_primary text,
  collection_name text, views bigint
)
language sql stable security definer set search_path = '' as $$
  select u.id, b.id, b.bundle_code, u.display_id, u.title_original,
         b.display_title, u.category_primary, c.name, count(v.visitor_id)::bigint
  from public.turots_text_units u
  join public.turots_bundles b on b.id = u.bundle_id
  left join public.turots_collections c on c.id = b.collection_id
  left join public.turots_monthly_manuscript_views v
    on v.text_unit_id = u.id
   and v.view_month = date_trunc('month', now() at time zone 'Asia/Bangkok')::date
  where u.metadata_status = 'imported' and u.archived_at is null
    and b.publication_status = 'published' and b.access_level in ('public_preview','public_full')
  group by u.id, b.id, b.bundle_code, u.display_id, u.title_original,
           b.display_title, u.category_primary, c.name
  order by count(v.visitor_id) desc, u.title_original asc
  limit 10;
$$;
revoke all on function public.record_turots_manuscript_view(uuid, uuid) from public;
grant execute on function public.record_turots_manuscript_view(uuid, uuid) to anon, authenticated;
revoke all on function public.get_turots_monthly_popular() from public;
grant execute on function public.get_turots_monthly_popular() to anon, authenticated;

create or replace function public.archive_turots_catalog_record(p_kind text, p_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare archived_count integer;
begin
  if auth.uid() is null or not exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())) then
    raise exception 'Akses hanya untuk admin Turots.' using errcode = '42501';
  end if;
  if p_kind = 'bundle' then
    update public.turots_bundles set publication_status = 'archived', updated_at = now() where id = p_id;
    get diagnostics archived_count = row_count;
  elsif p_kind = 'title' then
    update public.turots_text_units set archived_at = now(), updated_at = now() where id = p_id and archived_at is null;
    get diagnostics archived_count = row_count;
    update public.turots_pages set text_unit_id = null where text_unit_id = p_id;
  else
    raise exception 'Jenis rekod arsip tidak dikenal.' using errcode = '22023';
  end if;
  if archived_count = 0 then raise exception 'Rekod tidak ditemukan atau sudah diarsipkan.' using errcode = 'P0002'; end if;
  return jsonb_build_object('kind', p_kind, 'id', p_id, 'archived', true);
end;
$$;
revoke all on function public.archive_turots_catalog_record(text, uuid) from public, anon;
grant execute on function public.archive_turots_catalog_record(text, uuid) to authenticated;

-- Record catalog/content mutations automatically so browser write paths cannot
-- silently bypass history. The trigger function is intentionally not executable
-- by API roles directly.
create or replace function public.turots_write_audit_log()
returns trigger language plpgsql security definer set search_path = '' as $$
declare old_row jsonb; new_row jsonb; row_id uuid;
begin
  if TG_OP <> 'INSERT' then old_row := to_jsonb(old); end if;
  if TG_OP <> 'DELETE' then new_row := to_jsonb(new); end if;
  row_id := coalesce((new_row->>'id')::uuid, (old_row->>'id')::uuid);
  insert into public.turots_audit_log(actor_id, entity_type, entity_id, action, before_data, after_data)
  values (auth.uid(), TG_TABLE_NAME, row_id, lower(TG_OP), old_row, new_row);
  if TG_OP = 'DELETE' then return old; end if;
  return new;
end;
$$;
revoke all on function public.turots_write_audit_log() from public, anon, authenticated;
do $$
declare table_name text;
begin
  foreach table_name in array array['turots_bundles','turots_text_units','turots_pages','turots_collections'] loop
    if pg_catalog.to_regclass('public.' || table_name) is not null then
      execute format('drop trigger if exists turots_audit_%I on public.%I', table_name, table_name);
      execute format('create trigger turots_audit_%I after insert or update or delete on public.%I for each row execute function public.turots_write_audit_log()', table_name, table_name);
    end if;
  end loop;
end $$;

-- Add editorial audit when that optional table has been installed.
do $$ begin
  if pg_catalog.to_regclass('public.turots_content') is not null then
    execute 'drop trigger if exists turots_audit_turots_content on public.turots_content';
    execute 'create trigger turots_audit_turots_content after insert or update or delete on public.turots_content for each row execute function public.turots_write_audit_log()';
  end if;
end $$;

-- Do not allow unauthenticated writes to flood the guestbook.
do $$ begin
  if pg_catalog.to_regclass('public.turots_guestbook') is not null then
    execute 'create index if not exists turots_guestbook_created_idx on public.turots_guestbook(created_at desc)';
  end if;
end $$;

create or replace function public.turots_enforce_public_rate_limit()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  p_event_type text := TG_ARGV[0];
  request_headers jsonb;
  client_ip text;
  client_hash text;
  event_limit integer;
  event_window interval;
  event_count integer;
begin
  request_headers := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  client_ip := coalesce(request_headers->>'cf-connecting-ip', split_part(request_headers->>'x-forwarded-for', ',', 1));
  if client_ip is null or btrim(client_ip) = '' then return new; end if;
  client_hash := encode(public.digest(client_ip, 'sha256'), 'hex');
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(p_event_type || ':' || client_hash));
  if p_event_type = 'guestbook' then event_limit := 5; event_window := interval '24 hours';
  else event_limit := 120; event_window := interval '1 hour'; end if;
  delete from public.turots_public_rate_events where created_at < now() - interval '24 hours';
  select count(*) into event_count from public.turots_public_rate_events e
    where e.ip_hash = client_hash and e.event_type = p_event_type and e.created_at > now() - event_window;
  if event_count >= event_limit then
    raise exception 'Batas kiriman sementara tercapai. Silakan coba kembali nanti.' using errcode = 'P0001';
  end if;
  insert into public.turots_public_rate_events(ip_hash, event_type) values (client_hash, p_event_type);
  return new;
end;
$$;
revoke all on function public.turots_enforce_public_rate_limit() from public, anon, authenticated;
do $$ begin
  if pg_catalog.to_regclass('public.turots_guestbook') is not null then
    execute 'drop trigger if exists turots_guestbook_rate_limit on public.turots_guestbook';
    execute 'create trigger turots_guestbook_rate_limit before insert on public.turots_guestbook for each row execute function public.turots_enforce_public_rate_limit(''guestbook'')';
  end if;
end $$;

commit;
