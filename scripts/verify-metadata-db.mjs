import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';

// Isolated PostgreSQL engine: never opens the configured Supabase endpoint.
const db = new PGlite();
const migration = readFileSync('supabase/migrations/202611130001_turots_metadata_v2.sql','utf8');
await db.exec(`create role anon; create role authenticated; create schema auth;
 create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql as $$ select nullif(current_setting('test.uid',true),'')::uuid $$;
 grant usage on schema auth to anon,authenticated;
 insert into auth.users values('00000000-0000-0000-0000-000000000001');
 select set_config('test.uid','00000000-0000-0000-0000-000000000001',false);
`);
await db.exec(readFileSync('scripts/fixtures/turots-historical-schema.sql','utf8'));
await db.exec(`create table public.turots_admins(user_id uuid primary key references auth.users);
 insert into turots_admins values('00000000-0000-0000-0000-000000000001');`);
for (const file of [
 'supabase/20261004120000_turots_metadata_provenance.sql',
 'supabase/migrations/20261009130000_turots_admin_roles.sql',
 'supabase/migrations/20261010120000_turots_bundle_title_metadata.sql',
 'supabase/migrations/20261011100000_turots_editorial_and_guestbook.sql',
 'supabase/migrations/20261011130000_turots_monthly_manuscript_views.sql',
 'supabase/migrations/20261011150000_turots_bundle_catalog_metadata.sql',
 'supabase/migrations/20261016110000_turots_integrity_hardening.sql',
 'supabase/migrations/20261017100000_turots_bulk_photo_upload.sql',
 'supabase/migrations/20261031193000_turots_affiliate_bundles_and_title_schema.sql',
]) await db.exec(readFileSync(file,'utf8'));
await db.exec(`
 insert into turots_collections(code,name,source_project) values('DS-A','Ndalem','Dreamsea'),('DS-B','Ainun Niam','Dreamsea'),('NT-A','Ndalem','NT'),('EAP-A','Ndalem','EAP');
 insert into turots_bundles(bundle_code,collection_id) select 'DS 0097 00002',id from turots_collections where name='Ndalem' and source_project='Dreamsea';
 insert into turots_bundles(bundle_code,collection_id) select 'DS 0097 00003',id from turots_collections where name='Ainun Niam';
 insert into turots_bundles(bundle_code,collection_id) select 'NT 010',id from turots_collections where source_project='NT';
 insert into turots_bundles(bundle_code,collection_id) select 'NT 002',id from turots_collections where source_project='NT';
 insert into turots_bundles(bundle_code,collection_id) select 'EAP1564_1_1',id from turots_collections where source_project='EAP';
 insert into turots_text_units(bundle_id,display_id,sequence_no,title_original,category_primary,metadata_status) select id,bundle_code,1,'Kitab','Fikih',case when bundle_code like 'NT%' then 'curated' when bundle_code like 'EAP%' then 'verified' else 'imported' end from turots_bundles;
 insert into turots_pages(bundle_id,page_order,canvas_id,image_url) select b.id,n,b.id::text||'/'||n,'https://example.invalid/'||n from turots_bundles b cross join generate_series(1,5) n;
 update turots_pages p set text_unit_id=u.id from turots_text_units u where u.bundle_id=p.bundle_id and p.page_order<=2;
 update turots_bundles set publication_status='published';
`);
await db.exec(readFileSync('deploy/metadata-v2/preflight.sql','utf8').split('\n').filter(line=>!line.startsWith('\\')).join('\n'));
await db.exec(migration);
// Re-running the deployment must be safe.
await db.exec(migration);
const homeSummaryMigration = readFileSync('supabase/migrations/202611220001_turots_home_summary_rpc.sql','utf8');
await db.exec(homeSummaryMigration);
await db.exec(homeSummaryMigration);
const homeSummary = (await db.query('select public.get_turots_home_summary() as summary')).rows[0]?.summary;
assert.equal(homeSummary.stats.bundles, 5);
assert.equal(homeSummary.stats.titles, 5);
assert.equal(homeSummary.stats.pages, 25);
assert.equal(homeSummary.stats.categories, 1);
assert.ok(Array.isArray(homeSummary.affiliations) && homeSummary.affiliations.length === 3);
assert.ok(Array.isArray(homeSummary.categories) && homeSummary.categories[0].name === 'Fikih');
assert.ok(Array.isArray(homeSummary.popular) && homeSummary.popular.length === 5 && homeSummary.popular[0].cover_url);
let units=(await db.query('select u.*,b.bundle_code from turots_text_units u join turots_bundles b on b.id=u.bundle_id order by record_no')).rows;
assert.deepEqual(units.map(u=>u.bundle_code),['DS 0097 00002','DS 0097 00003','NT 002','NT 010','EAP1564_1_1']);
assert.deepEqual(units.slice(0,2).map(u=>u.display_id),['01.A.03.0001','01.B.03.0002']);
const first=units[0], downstream=units[1];
const rpc=ops=>db.query('select apply_turots_title_metadata_v2($1::jsonb) result',[JSON.stringify(ops)]);
const fresh={sheet:'Judul',code:first.bundle_code,key:'baru',values:{title_original:'Kitab kedua',category_primary:'Fikih',language:'Arab; Jawa'},folios:{ranges:[[3,5]]}};
await rpc([fresh]);
units=(await db.query('select * from turots_text_units order by record_no')).rows;
assert.equal(units.find(u=>u.id===downstream.id).record_no,'TQ0003');
assert.equal(units.find(u=>u.id===downstream.id).display_id,'01.B.03.0003');
assert.equal(units.find(u=>u.title_original==='Kitab kedua').record_no,'TQ0002');
assert((await db.query('select count(*)::int n from turots_number_history where unit_id=$1',[downstream.id])).rows[0].n>=2);
await assert.rejects(()=>db.exec("update turots_bundles set display_title='Tidak boleh'"),/baca saja/);
await assert.rejects(()=>db.exec("delete from turots_bundles"),/dikunci/);
await assert.rejects(()=>rpc([{...fresh,sheet:'Bendel'}]),/hanya metadata/);
await assert.rejects(()=>rpc([{...fresh,photos:[{image_url:'evil'}]}]),/hanya metadata/);
await assert.rejects(()=>rpc([{...fresh,values:{...fresh.values,record_no:'TQ9999'}}]),/tidak dapat diubah/);
const before=JSON.stringify((await db.query('select id,text_unit_id from turots_pages order by id')).rows);
await assert.rejects(()=>rpc([{...fresh,folios:{ranges:[[1,3]]}}]),/telah dipakai/);
assert.equal(JSON.stringify((await db.query('select id,text_unit_id from turots_pages order by id')).rows),before);
await assert.rejects(()=>rpc([{...fresh,id:first.id,values:{author:'X'},changes:[{field:'author',before:'stale'}],expected_pages:[1,2]}]),/berubah/);
await assert.rejects(()=>rpc([{...fresh,id:first.id,values:{},expected_pages:[1]}]),/berubah/);
await rpc([{sheet:'Judul',code:first.bundle_code,id:first.id,key:first.display_id,values:{author:'Penulis'},changes:[{field:'author',before:null,after:'Penulis'}]}]);
// Metadata status is independent of publication and page access.
for(const status of ['imported','curated','verified']) {
 const rows=(await db.query('select * from search_turots_catalog(p_status=>$1)',[status])).rows;
 assert(rows.some(row=>row.entry.kind==='title'),status+' must be searchable');
}
assert.equal((await db.query("select * from search_turots_catalog(p_language=>'Belanda')")).rows.length,0);
// Deletion and category edits must renumber without changing stable UUIDs.
const second=units.find(u=>u.title_original==='Kitab kedua');
await db.exec('begin');
await db.query('delete from turots_text_units where id=$1',[second.id]);
assert.equal((await db.query('select record_no from turots_text_units where id=$1',[downstream.id])).rows[0].record_no,'TQ0002');
assert.equal((await db.query('select count(*)::int n from turots_pages where text_unit_id=$1',[second.id])).rows[0].n,0);
await db.exec('rollback');
await db.exec('begin');
await rpc([{sheet:'Judul',code:first.bundle_code,id:first.id,key:first.display_id,values:{category_primary:'Nahwu'},changes:[{field:'category_primary',before:'Fikih'}]}]);
assert.equal((await db.query('select display_id from turots_text_units where id=$1',[first.id])).rows[0].display_id,'01.A.08.0001');
await db.exec('rollback');
// Dedicated upload routines still work, preserve source extent and private access.
await db.query("update turots_pages set access_level='private' where bundle_id=$1 and page_order=1",[first.bundle_id]);
const photo=(await db.query('select * from turots_pages where bundle_id=$1 and page_order=1',[first.bundle_id])).rows[0];
await db.query('select save_turots_bulk_bundle_pages($1,$2::jsonb,false,null)',[first.bundle_id,JSON.stringify([{canvas_id:photo.canvas_id,page_order:1,image_url:photo.image_url,label:'1',folio_label:'1'}])]);
assert.equal((await db.query('select access_level from turots_pages where id=$1',[photo.id])).rows[0].access_level,'private');
await db.query('select save_turots_bundle_pages($1,$2::jsonb,false)',[first.bundle_id,JSON.stringify([{canvas_id:'extra-photo',image_url:'https://example.invalid/extra',label:'6',folio_label:'6'}])]);
assert.equal((await db.query('select extent_pages from turots_bundles where id=$1',[first.bundle_id])).rows[0].extent_pages,null);
await assert.rejects(()=>db.exec("update turots_collections set name='Changed'"),/baca saja/);
await db.exec('set role authenticated');
await assert.rejects(()=>db.exec("update turots_bundles set display_title='Not allowed'"),/baca saja/);
await rpc([{sheet:'Judul',code:first.bundle_code,id:first.id,key:first.display_id,values:{author:'Admin update'},changes:[{field:'author',before:'Penulis'}]}]);
await db.exec("select set_config('test.uid','00000000-0000-0000-0000-000000000099',false)");
await assert.rejects(()=>rpc([fresh]),/hanya untuk admin/);
await db.exec("reset role; select set_config('test.uid','',false); set role anon");
for (const status of ['imported','curated','verified']) {
 assert((await db.query('select * from search_turots_catalog(p_status=>$1)',[status])).rows.some(r=>r.entry.kind==='title'),'anon RLS '+status);
}
assert.equal((await db.query('select id from turots_pages where id=$1',[photo.id])).rows.length,0,'private photo must remain hidden');
await assert.rejects(()=>rpc([fresh]),/permission denied/);
await db.exec('reset role');
await db.exec("select set_config('test.uid','',false)");
await assert.rejects(()=>rpc([fresh]),/hanya untuk admin/);
console.log('PASS PostgreSQL: rerun migration, natural DS/NT/EAP order, cross-collection category numbering, insertion shifts stable UUIDs, history, immutable bundles, title-only import, conflict rollback, stale metadata/pages, three searchable statuses with anonymous RLS, bundle filters, authenticated admin/nonadmin, photo routines preserve access/extent.');
await db.close();

