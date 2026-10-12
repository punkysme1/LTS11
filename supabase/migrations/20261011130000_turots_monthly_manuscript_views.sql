create table if not exists public.turots_monthly_manuscript_views (
  text_unit_id uuid not null references public.turots_text_units(id) on delete cascade,
  view_month date not null,
  visitor_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (text_unit_id, view_month, visitor_id),
  constraint turots_monthly_views_first_day check (extract(day from view_month) = 1)
);

create index if not exists turots_monthly_manuscript_views_rank_idx
  on public.turots_monthly_manuscript_views (view_month, text_unit_id);

alter table public.turots_monthly_manuscript_views enable row level security;
revoke all on public.turots_monthly_manuscript_views from public, anon, authenticated;

create or replace function public.record_turots_manuscript_view(p_text_unit_id uuid, p_visitor_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_visitor_id is null then return; end if;
  insert into public.turots_monthly_manuscript_views(text_unit_id, view_month, visitor_id)
  select u.id, date_trunc('month', now() at time zone 'Asia/Bangkok')::date, p_visitor_id
  from public.turots_text_units u
  join public.turots_bundles b on b.id = u.bundle_id
  where u.id = p_text_unit_id
    and u.metadata_status = 'imported'
    and b.publication_status = 'published'
  on conflict do nothing;
end;
$$;

revoke all on function public.record_turots_manuscript_view(uuid, uuid) from public;
grant execute on function public.record_turots_manuscript_view(uuid, uuid) to anon, authenticated;

create or replace function public.get_turots_monthly_popular()
returns table (
  text_unit_id uuid,
  bundle_id uuid,
  bundle_code text,
  display_id text,
  title_original text,
  display_title text,
  category_primary text,
  collection_name text,
  views bigint
)
language sql
stable
security definer
set search_path = ''
as $$
  select u.id, b.id, b.bundle_code, u.display_id, u.title_original,
         b.display_title, u.category_primary, c.name, count(v.visitor_id)::bigint
  from public.turots_text_units u
  join public.turots_bundles b on b.id = u.bundle_id
  left join public.turots_collections c on c.id = b.collection_id
  left join public.turots_monthly_manuscript_views v
    on v.text_unit_id = u.id
   and v.view_month = date_trunc('month', now() at time zone 'Asia/Bangkok')::date
  where u.metadata_status = 'imported'
    and b.publication_status = 'published'
  group by u.id, b.id, b.bundle_code, u.display_id, u.title_original,
           b.display_title, u.category_primary, c.name
  order by count(v.visitor_id) desc, u.title_original asc
  limit 10;
$$;

revoke all on function public.get_turots_monthly_popular() from public;
grant execute on function public.get_turots_monthly_popular() to anon, authenticated;

notify pgrst, 'reload schema';
