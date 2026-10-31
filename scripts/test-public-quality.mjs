import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '../../sanad/node_modules/@electric-sql/pglite/dist/index.js';
const db=new PGlite();
try {
 await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated;
 CREATE TABLE public.turots_bundles(id int PRIMARY KEY,publication_status text,access_level text,metadata_status text);
 CREATE TABLE public.turots_text_units(id int PRIMARY KEY,bundle_id int,metadata_status text,archived_at timestamptz);
 ALTER TABLE public.turots_text_units ENABLE ROW LEVEL SECURITY;
 GRANT SELECT ON public.turots_bundles,public.turots_text_units TO anon;
 CREATE POLICY "public read published units" ON public.turots_text_units FOR SELECT TO anon,authenticated
 USING(metadata_status='imported' AND EXISTS(SELECT 1 FROM public.turots_bundles b WHERE b.id=bundle_id AND b.publication_status='published' AND b.access_level='public_full'));
 CREATE FUNCTION public.search_turots_catalog() RETURNS bigint LANGUAGE sql STABLE AS $$ SELECT count(*) FROM public.turots_text_units u WHERE u.metadata_status='imported' $$;
 CREATE FUNCTION public.get_turots_catalog_filter_options() RETURNS bigint LANGUAGE sql STABLE AS $$ SELECT count(*) FROM public.turots_text_units u WHERE u.metadata_status = 'imported' $$;
 INSERT INTO public.turots_bundles VALUES(1,'published','public_full','imported'),(2,'published','private','verified'),(3,'draft','public_full','verified');
 INSERT INTO public.turots_text_units VALUES(1,1,'imported',null),(2,1,'curated',null),(3,1,'verified',null),(4,2,'verified',null),(5,3,'verified',null),(6,1,'verified',now());`);
 const before=await db.query('SELECT * FROM public.turots_text_units ORDER BY id');
 await db.exec('BEGIN;'+await readFile(new URL('../supabase/deploy/202610270001_public_metadata_quality.sql',import.meta.url),'utf8')+'COMMIT;');
 assert.deepEqual((await db.query('SELECT * FROM public.turots_text_units ORDER BY id')).rows,before.rows);
 await db.exec('SET ROLE anon;');
 assert.deepEqual((await db.query('SELECT id FROM public.turots_text_units ORDER BY id')).rows.map(r=>r.id),[1,2,3]);
 assert.equal(Number((await db.query('SELECT public.search_turots_catalog() AS n')).rows[0].n),3);
 await assert.rejects(()=>db.exec("UPDATE public.turots_text_units SET metadata_status='verified'"));
 console.log('PASS: public imported/curated/verified visible; private/draft/archived excluded; anonymous write denied; rows unchanged. Synthetic PostgreSQL only.');
} finally {await db.close();}
