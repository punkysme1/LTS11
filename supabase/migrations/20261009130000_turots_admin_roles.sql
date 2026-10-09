create table if not exists public.turots_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.turots_admins enable row level security;
revoke all privileges on public.turots_admins from public, anon, authenticated;
grant select on public.turots_admins to authenticated;

drop policy if exists "admins can read admin roster" on public.turots_admins;
create policy "admins can read admin roster" on public.turots_admins
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "admin manage bundles" on public.turots_bundles;
drop policy if exists "admin manage units" on public.turots_text_units;
drop policy if exists "admin manage pages" on public.turots_pages;
drop policy if exists "admin manage collections" on public.turots_collections;
drop policy if exists "admin manage classifications" on public.turots_classifications;
drop policy if exists "admin manage unit classifications" on public.turots_text_unit_classifications;
drop policy if exists "admin manage research" on public.turots_research_items;
drop policy if exists "admin manage relations" on public.turots_relations;
drop policy if exists "admin read audit" on public.turots_audit_log;
drop policy if exists "admin write audit" on public.turots_audit_log;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'turots_bundles', 'turots_text_units', 'turots_pages', 'turots_collections',
    'turots_classifications', 'turots_text_unit_classifications',
    'turots_research_items', 'turots_research_text_units', 'turots_relations',
    'turots_metadata_provenance'
  ] loop
    execute format('revoke insert, update, delete, truncate on public.%I from public, anon', table_name);
    execute format('grant select on public.%I to anon, authenticated', table_name);
    execute format('grant insert, update, delete on public.%I to authenticated', table_name);
    execute format('drop policy if exists %I on public.%I', 'admin manage ' || table_name, table_name);
    execute format('drop policy if exists %I on public.%I', 'admins manage ' || table_name, table_name);
    execute format(
      'create policy %I on public.%I for all to authenticated using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))',
      'admins manage ' || table_name, table_name
    );
  end loop;

  execute 'revoke all privileges on public.turots_audit_log from public, anon, authenticated';
  execute 'grant select, insert on public.turots_audit_log to authenticated';
  execute 'drop policy if exists "admin read audit" on public.turots_audit_log';
  execute 'drop policy if exists "admin write audit" on public.turots_audit_log';
  execute 'drop policy if exists "admins read audit" on public.turots_audit_log';
  execute 'drop policy if exists "admins write audit" on public.turots_audit_log';
  execute 'create policy "admins read audit" on public.turots_audit_log for select to authenticated using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))';
  execute 'create policy "admins write audit" on public.turots_audit_log for insert to authenticated with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))';

  execute 'drop policy if exists "admin manage metadata provenance" on public.turots_metadata_provenance';
  execute 'drop policy if exists "admins manage metadata provenance" on public.turots_metadata_provenance';
end $$;

create policy "admins manage metadata provenance" on public.turots_metadata_provenance
  for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));
