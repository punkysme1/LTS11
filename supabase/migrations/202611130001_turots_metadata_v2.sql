begin;
set local lock_timeout = '15s';
lock table public.turots_bundles,public.turots_text_units,public.turots_pages in share row exclusive mode;
drop trigger if exists turots_number_after on public.turots_text_units;
drop trigger if exists turots_page_number_after on public.turots_pages;

-- Preserve retired columns and original numbering before changing active metadata.
create table if not exists public.turots_metadata_legacy_snapshot (
  unit_id uuid primary key, captured_at timestamptz not null default now(), original_row jsonb not null
);
insert into public.turots_metadata_legacy_snapshot(unit_id,original_row)
select id,to_jsonb(u) from public.turots_text_units u on conflict do nothing;
alter table public.turots_metadata_legacy_snapshot enable row level security;
revoke all on public.turots_metadata_legacy_snapshot from public,anon,authenticated;
create table if not exists public.turots_number_history (
  id bigint generated always as identity primary key, unit_id uuid not null,
  changed_at timestamptz not null default clock_timestamp(), old_record_no text,
  old_display_id text, new_record_no text, new_display_id text
);
alter table public.turots_number_history enable row level security;
revoke all on public.turots_number_history from public,anon,authenticated;

update public.turots_text_units set
 title_curatorial=coalesce(nullif(title_curatorial,''),nullif(title_from_team,'')),
 paper_type=case when nullif(paper_type_other,'') is null then paper_type
   when nullif(paper_type,'') is null then paper_type_other
   when position(paper_type_other in paper_type)>0 then paper_type
   else paper_type || '; ' || paper_type_other end,
 page_ranges_label=coalesce(nullif(page_ranges_label,''),nullif(folio_separator,''),
   nullif(concat_ws('-',nullif(folio_start,''),nullif(folio_end,'')),''));

create or replace function public.turots_affiliation_code(p_code text) returns text
language sql immutable set search_path='' as $$
 select case when p_code ~* '^DS' then '01' when p_code ~* '^NT' then '02' when p_code ~* '^EAP' then '03' end
$$;
create or replace function public.turots_collection_letter(p_name text) returns text
language sql immutable set search_path='' as $$
 select case lower(btrim(p_name)) when 'ndalem' then 'A' when 'ainun niam' then 'B'
 when 'wasil' then 'C' when 'ahmad wasil' then 'C' when 'zamroni' then 'D' when 'burhan' then 'E' when 'zaim' then 'F' end
$$;
create or replace function public.turots_category_code(p_name text) returns integer
language sql immutable set search_path='' as $$
 select array_position(array['siroh','sejarah','fikih','akidah','quran','hadis','falak','nahwu','shorof','ilmu alat','akhlaq','khutbah','doa','fatwa','surat','primbon','mantiq','maulid','matematika','kover dan fisik'],lower(btrim(p_name)))
$$;
create or replace function public.turots_natural_key(p_value text) returns text
language sql immutable set search_path='' as $$
 select string_agg(case when m[1] ~ '^[0-9]+$' then lpad(m[1],greatest(16,length(m[1])),'0') else lower(m[1]) end,'' order by n)
 from regexp_matches(p_value,'([0-9]+|[^0-9]+)','g') with ordinality as parts(m,n)
$$;

create or replace function public.turots_renumber_titles() returns void
language plpgsql security definer set search_path='' as $$
begin
 perform pg_advisory_xact_lock(13112026,1);
 perform set_config('turots.numbering_active','on',true);
 if exists(select 1 from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id
   join public.turots_collections c on c.id=b.collection_id where u.archived_at is null and
   (public.turots_affiliation_code(b.bundle_code) is null or public.turots_collection_letter(c.name) is null or public.turots_category_code(u.category_primary) is null)) then
   raise exception 'Penomoran dibatalkan: ada afiliasi, koleksi atau kategori judul yang belum dikenali. Periksa preflight; jangan menebak kode.';
 end if;
 insert into public.turots_number_history(unit_id,old_record_no,old_display_id,new_record_no,new_display_id)
 select id,record_no,display_id,record_no,'archived:'||id::text from public.turots_text_units where archived_at is not null and display_id not like 'archived:%';
 update public.turots_text_units set display_id='archived:'||id::text where archived_at is not null and display_id not like 'archived:%';
 create temporary table if not exists turots_number_work(unit_id uuid primary key, rn text, dn text, cn integer) on commit drop;
 truncate pg_temp.turots_number_work;
 insert into pg_temp.turots_number_work
 with base as (
   select u.id,u.sequence_no,u.created_at,b.bundle_code,u.category_primary,
    public.turots_affiliation_code(b.bundle_code) aff,public.turots_collection_letter(c.name) coll,
    public.turots_category_code(u.category_primary) cat,
    (select min(p.page_order) from public.turots_pages p where p.text_unit_id=u.id) first_page
   from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id
   join public.turots_collections c on c.id=b.collection_id where u.archived_at is null
 ), numbered as (
   select *, row_number() over(order by aff,public.turots_natural_key(bundle_code),first_page nulls last,sequence_no,created_at,id) rn,
    row_number() over(partition by aff,cat order by public.turots_natural_key(bundle_code),first_page nulls last,sequence_no,created_at,id) cn
   from base
 ) select id,'TQ'||lpad(rn::text,greatest(4,length(rn::text)),'0'),
   aff||'.'||coll||'.'||lpad(cat::text,2,'0')||'.'||lpad(cn::text,greatest(4,length(cn::text)),'0'),cn::integer from numbered;
 insert into public.turots_number_history(unit_id,old_record_no,old_display_id,new_record_no,new_display_id)
 select u.id,u.record_no,u.display_id,w.rn,w.dn from public.turots_text_units u join pg_temp.turots_number_work w on w.unit_id=u.id
 where (u.record_no,u.display_id) is distinct from (w.rn,w.dn);
 -- Temporary UUID namespace prevents UNIQUE collisions when inserting in the middle.
 update public.turots_text_units u set display_id='pending:'||u.id::text
 from pg_temp.turots_number_work w where w.unit_id=u.id and (u.display_id,u.record_no,u.category_sequence_no) is distinct from (w.dn,w.rn,w.cn);
 update public.turots_text_units u set record_no=w.rn,display_id=w.dn,category_sequence_no=w.cn
 from pg_temp.turots_number_work w where w.unit_id=u.id and (u.display_id,u.record_no,u.category_sequence_no) is distinct from (w.dn,w.rn,w.cn);
 perform set_config('turots.numbering_active','off',true);
end $$;
revoke all on function public.turots_renumber_titles() from public,anon,authenticated;

-- Apply initial numbering before installing recursive statement triggers.
select public.turots_renumber_titles();
create or replace function public.turots_number_lock() returns trigger language plpgsql set search_path='' as $$
begin perform pg_advisory_xact_lock(13112026,1); return null; end $$;
create or replace function public.turots_number_after() returns trigger language plpgsql security definer set search_path='' as $$
begin if pg_trigger_depth()=1 and current_setting('turots.numbering_active',true) is distinct from 'on' and current_setting('turots.defer_numbering',true) is distinct from 'on' then perform public.turots_renumber_titles(); end if; return null; end $$;
drop trigger if exists turots_number_lock on public.turots_text_units;
create trigger turots_number_lock before insert or update or delete on public.turots_text_units for each statement execute function public.turots_number_lock();
drop trigger if exists turots_number_after on public.turots_text_units;
create trigger turots_number_after after insert or update or delete on public.turots_text_units for each statement execute function public.turots_number_after();
drop trigger if exists turots_page_number_lock on public.turots_pages;
create trigger turots_page_number_lock before insert or update or delete on public.turots_pages for each statement execute function public.turots_number_lock();
drop trigger if exists turots_page_number_after on public.turots_pages;
create trigger turots_page_number_after after insert or update of text_unit_id or delete on public.turots_pages for each statement execute function public.turots_number_after();

create or replace function public.turots_detach_pages_before_unit_delete() returns trigger language plpgsql security definer set search_path='' as $$
begin
 update public.turots_pages set text_unit_id = null where text_unit_id = old.id;
 return old;
end $$;
drop trigger if exists turots_detach_pages_before_unit_delete on public.turots_text_units;
create trigger turots_detach_pages_before_unit_delete before delete on public.turots_text_units
for each row execute function public.turots_detach_pages_before_unit_delete();

create or replace function public.turots_sync_bundle_page_access() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if new.access_level is distinct from old.access_level then
   update public.turots_pages set access_level = new.access_level where bundle_id = new.id;
 end if;
 return null;
end $$;
drop trigger if exists turots_sync_bundle_page_access on public.turots_bundles;
create trigger turots_sync_bundle_page_access after update of access_level on public.turots_bundles
for each row execute function public.turots_sync_bundle_page_access();

create or replace function public.turots_protect_bundle_source() returns trigger language plpgsql set search_path='' as $$
begin
 if tg_op<>'UPDATE' then raise exception 'Bendel sumber dikunci; hanya judul dalam bendel yang dapat ditambah atau diubah.'; end if;
 if (to_jsonb(new)-array['updated_at','metadata_status','publication_status','access_level']) is distinct from
    (to_jsonb(old)-array['updated_at','metadata_status','publication_status','access_level']) then
   raise exception 'Metadata sumber bendel bersifat baca saja. Perubahan dibatalkan.';
 end if;
 return new;
end $$;
drop trigger if exists turots_protect_bundle_source on public.turots_bundles;
create trigger turots_protect_bundle_source before insert or update or delete on public.turots_bundles
for each row execute function public.turots_protect_bundle_source();
drop trigger if exists turots_protect_collection_source on public.turots_collections;
create trigger turots_protect_collection_source before insert or update or delete on public.turots_collections
for each row execute function public.turots_protect_bundle_source();
revoke truncate on public.turots_bundles,public.turots_text_units,public.turots_pages,public.turots_collections from public,anon,authenticated;

create or replace function public.turots_stable_title_identity() returns trigger language plpgsql set search_path='' as $$
begin
 if (new.id,new.bundle_id) is distinct from (old.id,old.bundle_id) then raise exception 'UUID dan bendel induk judul adalah identitas tetap.'; end if;
 return new;
end $$;
drop trigger if exists turots_stable_title_identity on public.turots_text_units;
create trigger turots_stable_title_identity before update of id,bundle_id on public.turots_text_units for each row execute function public.turots_stable_title_identity();

-- Photo ingestion must not rewrite source extent_pages. Count actual photos from turots_pages.
do $$ declare f record; body text; begin
 for f in select oid from pg_proc where pronamespace='public'::regnamespace and proname in ('save_turots_bundle_pages','save_turots_bulk_bundle_pages') loop
   body:=pg_get_functiondef(f.oid);
   body:=regexp_replace(body,'update public\.turots_bundles b set[[:space:]]+extent_pages[[:space:]]*=[^;]+;','perform 1;','g');
   body:=replace(body,'access_level = v_access_level,','access_level = p.access_level,');
   execute body;
 end loop;
end $$;

create or replace function public.turots_guard_page_owner() returns trigger language plpgsql set search_path='' as $$
begin
 if new.text_unit_id is not null and not exists(select 1 from public.turots_text_units u where u.id=new.text_unit_id and u.bundle_id=new.bundle_id and u.archived_at is null) then raise exception 'Judul dan halaman harus berada pada bendel yang sama.'; end if;
 if tg_op='UPDATE' and old.text_unit_id is not null and new.text_unit_id is not null and old.text_unit_id<>new.text_unit_id then raise exception 'Lepaskan pemetaan lama secara eksplisit sebelum memindahkan halaman.'; end if;
 return new;
end $$;
drop trigger if exists turots_guard_page_owner on public.turots_pages;
create trigger turots_guard_page_owner before insert or update of text_unit_id,bundle_id on public.turots_pages for each row execute function public.turots_guard_page_owner();

do $$ begin
 if exists(select 1 from pg_roles where rolname='nawra_app') then
  revoke truncate on public.turots_bundles,public.turots_text_units,public.turots_pages,public.turots_collections from nawra_app;
 end if;
end $$;

-- Only this title-only RPC is used by the metadata workbook/editor.
create or replace function public.apply_turots_title_metadata_v2(p_operations jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare op jsonb; vals jsonb; changes jsonb; before_row jsonb; bid uuid; uid uuid; k text; cols text;
 pair jsonb; completed text[]:=array[]::text[]; expected jsonb; actual jsonb; allowed text[];
begin
 if auth.uid() is null or not exists(select 1 from public.turots_admins where user_id=auth.uid()) then
   raise exception 'Akses hanya untuk admin Turots.' using errcode='42501'; end if;
 if jsonb_typeof(p_operations) is distinct from 'array' or jsonb_array_length(p_operations)>5000 then raise exception 'Format operasi tidak valid.'; end if;
 perform pg_advisory_xact_lock(13112026,1);
 allowed:=array['title_original','title_latin','title_curatorial','category_primary','category_secondary','category_tertiary','page_ranges_label','description','author','scribe','year_original','year_masehi','copying_location','manuscript_origin','language','script','cover','cover_size','binding','paper_size','dimensions','watermark','countermark','ink','total_pages','blank_pages','lines_per_page','rubrication','illumination','illustration','marginal_notes','meaning_notes','colophon','marginal_note','physical_condition','readability','completeness','notes','keywords','glossary','references_text','related_manuscripts','related_persons','paper_type','metadata_status'];
 -- Validate everything and optimistic concurrency BEFORE releasing any mapping.
 for op in select value from jsonb_array_elements(p_operations) loop
   if op->>'sheet' is distinct from 'Judul' or jsonb_array_length(coalesce(op->'photos','[]'))>0 then raise exception 'Impor hanya metadata judul, bukan bendel atau foto.'; end if;
   bid:=public.resolve_turots_bundle_id(op->>'code');
   if bid is null then raise exception 'Bendel tidak ditemukan.'; end if;
   perform 1 from public.turots_bundles where id=bid for update;
   perform 1 from public.turots_pages where bundle_id=bid for update;
   vals:=coalesce(op->'values','{}');
   for k in select jsonb_object_keys(vals) loop
     if not k=any(allowed) then raise exception 'Kolom % tidak dapat diubah melalui metadata.',k; end if;
   end loop;
   uid:=nullif(op->>'id','')::uuid;
   if uid is not null then
     select to_jsonb(u) into before_row from public.turots_text_units u where id=uid and bundle_id=bid and archived_at is null for update;
     if before_row is null then raise exception 'UUID judul tidak ditemukan pada bendel ini.'; end if;
     for k in select jsonb_object_keys(vals) loop
       select value into changes from jsonb_array_elements(coalesce(op->'changes','[]')) where value->>'field'=k;
       if changes is null or before_row->k is distinct from changes->'before' then raise exception 'Data % berubah sejak pratinjau. Muat ulang.',k using errcode='40001'; end if;
     end loop;
     if op->'folios' is not null and op->'folios'<>'null'::jsonb then
       expected:=op->'expected_pages';
       select coalesce(jsonb_agg(page_order order by page_order),'[]') into actual from public.turots_pages where text_unit_id=uid and bundle_id=bid;
       if expected is null or expected is distinct from actual then raise exception 'Pemetaan halaman berubah sejak pratinjau. Muat ulang.' using errcode='40001'; end if;
     end if;
   else
     if nullif(btrim(vals->>'title_original'),'') is null or public.turots_category_code(vals->>'category_primary') is null then raise exception 'Judul asli dan kategori wajib diisi.'; end if;
   end if;
 end loop;
 perform set_config('turots.defer_numbering','on',true);
 for op in select value from jsonb_array_elements(p_operations) loop
   if nullif(op->>'id','') is not null and op->'folios' is not null and op->'folios'<>'null'::jsonb then
     update public.turots_pages set text_unit_id=null where text_unit_id=(op->>'id')::uuid;
   end if;
 end loop;
 for op in select value from jsonb_array_elements(p_operations) loop
   bid:=public.resolve_turots_bundle_id(op->>'code'); uid:=nullif(op->>'id','')::uuid; vals:=coalesce(op->'values','{}');
   if uid is null then
     uid:=gen_random_uuid();
     vals:=vals||jsonb_build_object('id',uid,'bundle_id',bid,'display_id','pending:'||uid::text,'sequence_no',(select coalesce(max(sequence_no),0)+1 from public.turots_text_units where bundle_id=bid));
     select string_agg(format('%I',key),',' order by key) into cols from jsonb_object_keys(vals) keys(key);
     execute format('insert into public.turots_text_units(%s) select %s from jsonb_populate_record(null::public.turots_text_units,$1)',cols,cols) using vals;
   elsif vals<>'{}'::jsonb then
     vals:=vals||jsonb_build_object('updated_at',now());
     select string_agg(format('%I',key),',' order by key) into cols from jsonb_object_keys(vals) keys(key);
     execute format('update public.turots_text_units set (%s)=(select %s from jsonb_populate_record(null::public.turots_text_units,$1)) where id=$2',cols,cols) using vals,uid;
   end if;
   if op->'folios' is not null and op->'folios'<>'null'::jsonb then
     if not coalesce((op->'folios'->>'clear')::boolean,false) then
       if jsonb_typeof(op->'folios'->'ranges') is distinct from 'array' then raise exception 'Rentang halaman harus berupa daftar.'; end if;
       for pair in select value from jsonb_array_elements(op->'folios'->'ranges') loop
         if jsonb_array_length(pair)<>2 or (pair->>0)::integer<1 or (pair->>1)::integer<(pair->>0)::integer then raise exception 'Rentang halaman tidak valid.'; end if;
         if not exists(select 1 from public.turots_pages where bundle_id=bid and page_order=(pair->>0)::integer) or not exists(select 1 from public.turots_pages where bundle_id=bid and page_order=(pair->>1)::integer) then raise exception 'Batas rentang halaman tidak ditemukan.'; end if;
         if exists(select 1 from public.turots_pages where bundle_id=bid and page_order between (pair->>0)::integer and (pair->>1)::integer and text_unit_id is not null) then raise exception 'Halaman telah dipakai judul lain atau rentang saling bertumpang tindih.'; end if;
         update public.turots_pages set text_unit_id=uid where bundle_id=bid and page_order between (pair->>0)::integer and (pair->>1)::integer;
       end loop;
     end if;
   end if;
   completed:=array_append(completed,'Judul '||coalesce(op->>'key',uid::text));
 end loop;
 perform set_config('turots.defer_numbering','off',true);
 perform public.turots_renumber_titles();
 return jsonb_build_object('completed',to_jsonb(completed));
end $$;
revoke all on function public.apply_turots_title_metadata_v2(jsonb) from public,anon;
grant execute on function public.apply_turots_title_metadata_v2(jsonb) to authenticated;
-- Old broad RPC must not bypass metadata-only validation from a cached frontend.
revoke execute on function public.apply_turots_catalog_import(jsonb) from public,anon,authenticated;

-- RLS must expose the same three states as the search functions.
alter table public.turots_text_units enable row level security;
drop policy if exists "public read published units" on public.turots_text_units;
create policy "public read published units" on public.turots_text_units for select to anon,authenticated
using (archived_at is null and metadata_status in ('imported','curated','verified') and exists(
 select 1 from public.turots_bundles b where b.id=turots_text_units.bundle_id and b.publication_status='published' and b.access_level in ('public_preview','public_full')));

-- Public search: all three curation states and consistent bundle/title filters.
-- Separate bundle/title filtering, add affiliation filtering, and normalize common language/script aliases.
drop function if exists public.search_turots_catalog(text,text,text,text,text,text,text,text,text,integer,integer);
create or replace function public.search_turots_catalog(
  p_query text default '', p_category text default '', p_collection text default '', p_affiliation text default '',
  p_language text default '', p_script text default '', p_completeness text default '',
  p_person text default '', p_status text default '', p_kind text default '', p_sort text default 'newest',
  p_offset integer default 0, p_limit integer default 12
)
returns table(entry jsonb, total_count bigint)
language sql stable set search_path = '' as $$
  with public_bundles as (
    select b.*, c.name as collection_name, c.source_project,
      coalesce((select string_agg(u.title_original, ' ') from public.turots_text_units u where u.bundle_id = b.id and u.archived_at is null and u.metadata_status in ('imported','curated','verified')), '') as unit_search,
      coalesce((select string_agg(u.title_label, ', ') from (select coalesce(nullif(u.title_latin,''), u.title_original) as title_label from public.turots_text_units u where u.bundle_id = b.id and u.archived_at is null and u.metadata_status in ('imported','curated','verified') order by u.record_no, u.title_original limit 4) u), '') as unit_titles,
      coalesce((select count(*) from public.turots_text_units u where u.bundle_id = b.id and u.archived_at is null and u.metadata_status in ('imported','curated','verified')), 0)::integer as unit_count,
      (select coalesce(nullif(p.thumbnail_url,''), nullif(p.image_url,'')) from public.turots_pages p where p.bundle_id = b.id and p.source_missing_at is null and p.access_level in ('public_preview','public_full') order by p.page_order limit 1) as cover_thumbnail
    from public.turots_bundles b
    left join public.turots_collections c on c.id = b.collection_id
    where b.publication_status = 'published' and b.access_level in ('public_preview','public_full')
  ), entries as (
    select 'bundle'::text as kind, b.updated_at, b.bundle_code,
      coalesce(nullif(b.display_title,''),b.bundle_code) as sort_label,
      jsonb_build_object(
        'kind','bundle','id','bundle-'||b.id::text,
        'b',jsonb_build_object('id',b.id,'bundle_code',b.bundle_code,'display_title',b.display_title,
          'bundle_description',b.bundle_description,'subject_matter',b.subject_matter,'languages',b.languages,
          'extent_pages',b.extent_pages,'copying_date_gregorian',b.copying_date_gregorian,'updated_at',b.updated_at,
          'title_count',b.unit_count,'unit_titles',b.unit_titles,
          'turots_collections',jsonb_build_object('name',b.collection_name,'source_project',b.source_project),
           'turots_pages',case when b.cover_thumbnail is null then '[]'::jsonb else jsonb_build_array(jsonb_build_object('thumbnail_url',b.cover_thumbnail,'image_url',b.cover_thumbnail)) end),
        'u','{}'::jsonb
      ) as entry
    from public_bundles b
    where (coalesce(p_category,'') = '' or p_category = 'Bendel')
      and (coalesce(p_kind,'') = '' or p_kind = 'bundle')
      and (coalesce(p_collection,'') = '' or b.collection_name = p_collection)
      and (coalesce(p_affiliation,'') = '' or coalesce(b.affiliation,b.source_project) = p_affiliation)
      and (coalesce(p_query,'') = '' or position(lower(p_query) in lower(concat_ws(' ',b.display_title,b.bundle_code,b.source_identifier,b.collection_name,b.unit_search))) > 0)
      and ((coalesce(p_language,'')='' and coalesce(p_script,'')='' and coalesce(p_completeness,'')='' and coalesce(p_person,'')='' and coalesce(p_status,'')='') or exists(
        select 1 from public.turots_text_units u where u.bundle_id=b.id and u.archived_at is null and u.metadata_status in ('imported','curated','verified')
      and (coalesce(p_language,'') = '' or (case lower(btrim(p_language)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(p_language)) end) = any(array(select case lower(btrim(value)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(value)) end from unnest(regexp_split_to_array(lower(coalesce(u.language,'')), '\s*[,;|]\s*')) as terms(value))))
      and (coalesce(p_script,'') = '' or (case lower(btrim(p_script)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(p_script)) end) = any(array(select case lower(btrim(value)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(value)) end from unnest(regexp_split_to_array(lower(coalesce(u.script,'')), '\s*[,;|]\s*')) as terms(value))))
      and (coalesce(p_completeness,'') = '' or lower(coalesce(u.completeness,'')) = lower(p_completeness))
      and (coalesce(p_person,'') = '' or concat_ws(' ',u.author,u.scribe,u.related_persons) ilike '%'||p_person||'%')
      and (coalesce(p_status,'') = '' or u.metadata_status = p_status)
      ))
    union all
    select 'title'::text as kind, b.updated_at, b.bundle_code,
      coalesce(nullif(u.title_latin,''),nullif(u.title_original,''),u.display_id) as sort_label,
      jsonb_build_object(
        'kind','title','id',u.id,
        'b',jsonb_build_object('id',b.id,'bundle_code',b.bundle_code,'display_title',b.display_title,'bundle_description',b.bundle_description,'updated_at',b.updated_at,
          'turots_collections',jsonb_build_object('name',c.name,'source_project',c.source_project),
          'turots_pages',case when coalesce(nullif(p.thumbnail_url,''), nullif(p.image_url,'')) is null then '[]'::jsonb else jsonb_build_array(jsonb_build_object('text_unit_id',u.id,'page_order',p.page_order,'thumbnail_url',coalesce(nullif(p.thumbnail_url,''), nullif(p.image_url,'')),'image_url',p.image_url)) end),
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
    where u.archived_at is null and u.metadata_status in ('imported','curated','verified')
      and b.publication_status = 'published' and b.access_level in ('public_preview','public_full')
      and (coalesce(p_category,'') = '' or lower(btrim(p_category)) = lower(btrim(u.category_primary)))
      and (coalesce(p_kind,'') = '' or p_kind = 'title')
      and (coalesce(p_collection,'') = '' or c.name = p_collection)
      and (coalesce(p_affiliation,'') = '' or coalesce(b.affiliation,c.source_project) = p_affiliation)
      and (coalesce(p_language,'') = '' or (case lower(btrim(p_language)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(p_language)) end) = any(array(select case lower(btrim(value)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(value)) end from unnest(regexp_split_to_array(lower(coalesce(u.language,'')), '\s*[,;|]\s*')) as terms(value))))
      and (coalesce(p_script,'') = '' or (case lower(btrim(p_script)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(p_script)) end) = any(array(select case lower(btrim(value)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(value)) end from unnest(regexp_split_to_array(lower(coalesce(u.script,'')), '\s*[,;|]\s*')) as terms(value))))
      and (coalesce(p_completeness,'') = '' or lower(coalesce(u.completeness,'')) = lower(p_completeness))
      and (coalesce(p_person,'') = '' or concat_ws(' ',u.author,u.scribe,u.related_persons) ilike '%'||p_person||'%')
      and (coalesce(p_status,'') = '' or u.metadata_status = p_status)
      and (coalesce(p_query,'') = '' or position(lower(p_query) in lower(concat_ws(' ',u.title_original,u.title_latin,u.title_curatorial,u.category_secondary,u.category_tertiary,u.keywords,u.description,u.author,u.scribe,u.related_persons,u.display_id,u.record_no,b.bundle_code))) > 0)
  ), counted as (
    select entries.*, count(*) over() as total_count from entries
  )
  select counted.entry, counted.total_count from counted
  order by case when p_sort = 'judul' then counted.sort_label end asc,
           case when p_sort <> 'judul' then counted.updated_at end desc,
           counted.bundle_code asc, counted.kind asc
  limit greatest(1, least(coalesce(p_limit,12),48)) offset greatest(0,coalesce(p_offset,0));
$$;
revoke all on function public.search_turots_catalog(text,text,text,text,text,text,text,text,text,text,text,integer,integer) from public;
grant execute on function public.search_turots_catalog(text,text,text,text,text,text,text,text,text,text,text,integer,integer) to anon, authenticated;

create or replace function public.get_turots_catalog_filter_options()
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'collections', coalesce((select jsonb_agg(name order by name) from (select distinct c.name from public.turots_bundles b join public.turots_collections c on c.id=b.collection_id where b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb),
    'affiliations', coalesce((select jsonb_agg(value order by value) from (select distinct coalesce(nullif(b.affiliation,''),c.source_project) as value from public.turots_bundles b left join public.turots_collections c on c.id=b.collection_id where b.publication_status='published' and b.access_level in ('public_preview','public_full') and coalesce(nullif(b.affiliation,''),c.source_project) is not null) x), '[]'::jsonb),
    'languages', coalesce((select jsonb_agg(value order by value) from (select distinct btrim(value) value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral regexp_split_to_table(coalesce(u.language,''), '\s*[,;|]\s*') value where u.archived_at is null and u.metadata_status in ('imported','curated','verified') and b.publication_status='published' and b.access_level in ('public_preview','public_full') and btrim(value) <> '') x), '[]'::jsonb),
    'scripts', coalesce((select jsonb_agg(value order by value) from (select distinct btrim(value) value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral regexp_split_to_table(coalesce(u.script,''), '\s*[,;|]\s*') value where u.archived_at is null and u.metadata_status in ('imported','curated','verified') and b.publication_status='published' and b.access_level in ('public_preview','public_full') and btrim(value) <> '') x), '[]'::jsonb),
    'completeness', coalesce((select jsonb_agg(value order by value) from (select distinct u.completeness as value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id where u.archived_at is null and u.metadata_status in ('imported','curated','verified') and u.completeness is not null and b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb),
    'persons', coalesce((select jsonb_agg(value order by value) from (select distinct value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral unnest(array[u.author,u.scribe]) value where u.archived_at is null and u.metadata_status in ('imported','curated','verified') and value is not null and b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb)
  );
$$;
revoke all on function public.get_turots_catalog_filter_options() from public;
grant execute on function public.get_turots_catalog_filter_options() to anon, authenticated;

notify pgrst,'reload schema';
commit;

