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
      and (coalesce(p_kind,'') = '' or p_kind = 'bundle')
      and (coalesce(p_collection,'') = '' or b.collection_name = p_collection)
      and (coalesce(p_affiliation,'') = '' or coalesce(b.affiliation,b.source_project) = p_affiliation)
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
      and (coalesce(p_kind,'') = '' or p_kind = 'title')
      and (coalesce(p_collection,'') = '' or c.name = p_collection)
      and (coalesce(p_affiliation,'') = '' or coalesce(b.affiliation,c.source_project) = p_affiliation)
      and (coalesce(p_language,'') = '' or (case lower(btrim(p_language)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(p_language)) end) = any(array(select case lower(btrim(value)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(value)) end from unnest(regexp_split_to_array(lower(coalesce(u.language,'')), '\s*[,;|]\s*')) as terms(value))))
      and (coalesce(p_script,'') = '' or (case lower(btrim(p_script)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(p_script)) end) = any(array(select case lower(btrim(value)) when 'arabic' then 'arab' when 'javanese' then 'jawa' when 'pego' then 'pegon' else lower(btrim(value)) end from unnest(regexp_split_to_array(lower(coalesce(u.script,'')), '\s*[,;|]\s*')) as terms(value))))
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
revoke all on function public.search_turots_catalog(text,text,text,text,text,text,text,text,text,text,text,integer,integer) from public;
grant execute on function public.search_turots_catalog(text,text,text,text,text,text,text,text,text,text,text,integer,integer) to anon, authenticated;

create or replace function public.get_turots_catalog_filter_options()
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'collections', coalesce((select jsonb_agg(name order by name) from (select distinct c.name from public.turots_bundles b join public.turots_collections c on c.id=b.collection_id where b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb),
    'affiliations', coalesce((select jsonb_agg(value order by value) from (select distinct coalesce(nullif(b.affiliation,''),c.source_project) as value from public.turots_bundles b left join public.turots_collections c on c.id=b.collection_id where b.publication_status='published' and b.access_level in ('public_preview','public_full') and coalesce(nullif(b.affiliation,''),c.source_project) is not null) x), '[]'::jsonb),
    'languages', coalesce((select jsonb_agg(value order by value) from (select distinct btrim(value) value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral regexp_split_to_table(coalesce(u.language,''), '\s*[,;|]\s*') value where u.archived_at is null and u.metadata_status='imported' and b.publication_status='published' and b.access_level in ('public_preview','public_full') and btrim(value) <> '') x), '[]'::jsonb),
    'scripts', coalesce((select jsonb_agg(value order by value) from (select distinct btrim(value) value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral regexp_split_to_table(coalesce(u.script,''), '\s*[,;|]\s*') value where u.archived_at is null and u.metadata_status='imported' and b.publication_status='published' and b.access_level in ('public_preview','public_full') and btrim(value) <> '') x), '[]'::jsonb),
    'completeness', coalesce((select jsonb_agg(value order by value) from (select distinct u.completeness as value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id where u.archived_at is null and u.metadata_status='imported' and u.completeness is not null and b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb),
    'persons', coalesce((select jsonb_agg(value order by value) from (select distinct value from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id cross join lateral unnest(array[u.author,u.scribe]) value where u.archived_at is null and u.metadata_status='imported' and value is not null and b.publication_status='published' and b.access_level in ('public_preview','public_full')) x), '[]'::jsonb)
  );
$$;
revoke all on function public.get_turots_catalog_filter_options() from public;
grant execute on function public.get_turots_catalog_filter_options() to anon, authenticated;
