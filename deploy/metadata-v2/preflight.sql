\set ON_ERROR_STOP on
\pset pager off
begin read only;
select current_database() database, current_user db_role, version();
select 'bendel' jenis,count(*) jumlah from public.turots_bundles
union all select 'judul',count(*) from public.turots_text_units
union all select 'foto',count(*) from public.turots_pages;

-- Unknown codes stop deployment rather than inventing collection/category assignments.
select u.id,u.display_id,b.bundle_code,c.name koleksi,u.category_primary kategori
from public.turots_text_units u
join public.turots_bundles b on b.id=u.bundle_id
join public.turots_collections c on c.id=b.collection_id
where u.archived_at is null and (
 b.bundle_code !~* '^(DS|NT|EAP)' or
 lower(btrim(c.name)) not in ('ndalem','ainun niam','wasil','ahmad wasil','zamroni','burhan','zaim') or
 u.category_primary is null or u.category_primary not in ('Siroh','Sejarah','Fikih','Akidah','Quran','Hadis','Falak','Nahwu','Shorof','Ilmu alat','Akhlaq','Khutbah','Doa','Fatwa','Surat','Primbon','Mantiq','Maulid','Matematika')
);
do $$ begin
 if exists(select 1 from public.turots_text_units u join public.turots_bundles b on b.id=u.bundle_id join public.turots_collections c on c.id=b.collection_id where u.archived_at is null and (
 b.bundle_code !~* '^(DS|NT|EAP)' or lower(btrim(c.name)) not in ('ndalem','ainun niam','wasil','ahmad wasil','zamroni','burhan','zaim') or u.category_primary is null or u.category_primary not in ('Siroh','Sejarah','Fikih','Akidah','Quran','Hadis','Falak','Nahwu','Shorof','Ilmu alat','Akhlaq','Khutbah','Doa','Fatwa','Surat','Primbon','Mantiq','Maulid','Matematika'))) then
 raise exception 'STOP: kode/koleksi/kategori di atas perlu dicocokkan. Tidak ada perubahan database. Kirim hasil check untuk ditinjau.'; end if;
 if exists(select 1 from public.turots_pages p join public.turots_text_units u on u.id=p.text_unit_id where p.bundle_id<>u.bundle_id) then
 raise exception 'STOP: ada halaman terhubung ke judul di bendel berbeda. Perlu rekonsiliasi sebelum migrasi.'; end if;
 if to_regprocedure('public.resolve_turots_bundle_id(text)') is null then
 raise exception 'STOP: migration skema judul 20261031193000 belum tersedia.'; end if;
end $$;
select metadata_status,count(*) from public.turots_text_units group by metadata_status order by metadata_status;
select 'CHECK OK: hanya baca; belum ada perubahan database.' status;
commit;
