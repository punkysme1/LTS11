-- Track unique site visitors by country for Home & Profil statistics.
create table if not exists public.turots_site_visitors (
  visitor_id uuid primary key,
  country_code text not null default 'ID',
  country_name text not null default 'Indonesia',
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  visit_count integer not null default 1
);

create index if not exists turots_site_visitors_country_idx
  on public.turots_site_visitors (country_code, country_name);

alter table public.turots_site_visitors enable row level security;

create or replace function public.record_turots_site_visitor(
  p_visitor_id uuid,
  p_country_code text default null,
  p_country_name text default null
) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_headers jsonb;
  v_header_code text;
  v_code text;
  v_name text;
begin
  if p_visitor_id is null then
    return;
  end if;

  begin
    v_headers := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  exception when others then
    v_headers := '{}'::jsonb;
  end;

  v_header_code := upper(trim(coalesce(
    v_headers->>'cf-ipcountry',
    v_headers->>'x-vercel-ip-country',
    v_headers->>'x-country-code',
    ''
  )));

  if v_header_code ~ '^[A-Z]{2}$' and v_header_code not in ('XX', 'T1') then
    v_code := v_header_code;
  elsif upper(trim(coalesce(p_country_code, ''))) ~ '^[A-Z]{2}$' then
    v_code := upper(trim(p_country_code));
  else
    v_code := 'ID';
  end if;

  v_name := nullif(trim(coalesce(p_country_name, '')), '');
  if v_name is null or (v_header_code ~ '^[A-Z]{2}$' and v_header_code not in ('XX', 'T1') and v_code <> upper(trim(coalesce(p_country_code, '')))) then
    v_name := case v_code
      when 'ID' then 'Indonesia'
      when 'MY' then 'Malaysia'
      when 'SG' then 'Singapura'
      when 'SA' then 'Arab Saudi'
      when 'EG' then 'Mesir'
      when 'GB' then 'Inggris Raya'
      when 'US' then 'Amerika Serikat'
      when 'NL' then 'Belanda'
      when 'DE' then 'Jerman'
      when 'JP' then 'Jepang'
      when 'AU' then 'Australia'
      else v_code
    end;
  end if;

  insert into public.turots_site_visitors (visitor_id, country_code, country_name, first_seen_at, last_seen_at, visit_count)
  values (p_visitor_id, v_code, v_name, now(), now(), 1)
  on conflict (visitor_id) do update set
    country_code = excluded.country_code,
    country_name = excluded.country_name,
    last_seen_at = now(),
    visit_count = public.turots_site_visitors.visit_count + 1;
end;
$$;

create or replace function public.get_turots_visitor_stats()
returns jsonb
language sql
security definer
set search_path = ''
as $$
  with totals as (
    select count(*)::bigint as total_visitors
    from public.turots_site_visitors
  ),
  top_countries as (
    select
      country_code,
      max(country_name) as country_name,
      count(*)::bigint as visitors
    from public.turots_site_visitors
    group by country_code
    order by count(*) desc, max(country_name) asc
    limit 4
  )
  select jsonb_build_object(
    'total_visitors', coalesce((select total_visitors from totals), 0),
    'countries', coalesce(
      (select jsonb_agg(jsonb_build_object(
        'country_code', country_code,
        'country_name', country_name,
        'visitors', visitors
      ) order by visitors desc, country_name asc) from top_countries),
      '[]'::jsonb
    )
  );
$$;

grant execute on function public.record_turots_site_visitor(uuid, text, text) to anon, authenticated;
grant execute on function public.get_turots_visitor_stats() to anon, authenticated;
