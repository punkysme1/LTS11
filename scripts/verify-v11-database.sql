begin;
alter table public.turots_text_units validate constraint turots_category_primary_fk;
do $$
begin
 if (select count(*) from public.turots_catalog_categories where active) <> 19 then raise exception 'Expected 19 active categories'; end if;
 begin
  update public.turots_text_units set category_primary='INVALID_CATEGORY_TEST' where id=(select id from public.turots_text_units limit 1);
  raise exception 'Invalid category accepted';
 exception when foreign_key_violation then
  raise notice 'PASS: invalid category rejected';
 end;
end $$;
insert into supabase_migrations.schema_migrations(version,name,statements)
 values ('20261003170000','turots_v11_categories',array['-- Applied from 20261003170000_turots_v11_categories.sql and verified locally'])
 on conflict(version) do nothing;
commit;
select count(*) as active_category_count from public.turots_catalog_categories where active;
select convalidated from pg_constraint where conname='turots_category_primary_fk';
