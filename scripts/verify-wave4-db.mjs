import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PGlite } from '@electric-sql/pglite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../../..');

const db = new PGlite();

// Bootstrap roles & auth stub matching Supabase + shared core/evidence/sanad + turots
await db.exec(`
  CREATE ROLE supabase_admin SUPERUSER;
  CREATE ROLE anon;
  CREATE ROLE authenticated;
  CREATE ROLE service_role BYPASSRLS;
  CREATE ROLE nawra_app;
  CREATE ROLE nara_research_reader;

  CREATE SCHEMA auth;
  CREATE TABLE auth.users (id uuid PRIMARY KEY, email text, email_confirmed_at timestamptz);
  CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$
    SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
  $$;
  GRANT USAGE ON SCHEMA auth TO anon, authenticated;
  INSERT INTO auth.users VALUES ('02ab502f-318f-458e-8c05-f80d09f95d6e', 'kurator@qomaruddin.test', now());
  SELECT set_config('request.jwt.claim.sub', '02ab502f-318f-458e-8c05-f80d09f95d6e', false);

  CREATE SCHEMA storage;
  CREATE TABLE storage.buckets (id text PRIMARY KEY, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
  CREATE TABLE storage.objects (id uuid DEFAULT gen_random_uuid(), bucket_id text, name text);
  ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
`);

// 1. Load shared core/evidence/audit (local foundation)
const sharedFoundation = readFileSync(
  path.join(rootDir, 'Local-Qomaruddin/supabase/migrations/20261008000100_shared_core_evidence_audit.sql'),
  'utf8'
).replace('create extension if not exists pgcrypto with schema extensions;', '');
await db.exec(sharedFoundation);
await db.exec(readFileSync(path.join(rootDir, 'Local-Qomaruddin/supabase/migrations/20261008000200_shared_ingest_dedupe.sql'), 'utf8'));
await db.exec(readFileSync(path.join(rootDir, 'Local-Qomaruddin/supabase/migrations/20261008000300_core_person_source_identity.sql'), 'utf8'));

// 2. Load Turots schema & migrations
await db.exec(readFileSync(path.join(__dirname, 'fixtures/turots-historical-schema.sql'), 'utf8'));
await db.exec(`
  CREATE TABLE public.turots_admins (user_id uuid PRIMARY KEY REFERENCES auth.users);
  INSERT INTO public.turots_admins VALUES ('02ab502f-318f-458e-8c05-f80d09f95d6e');
  INSERT INTO public.turots_collections (code, name, source_project) VALUES ('DS-A', 'Ndalem', 'Dreamsea');
  INSERT INTO public.turots_bundles (id, bundle_code, collection_id, publication_status)
  SELECT 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'DS 0097 00001', id, 'published' FROM public.turots_collections WHERE code = 'DS-A';
`);
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
  'supabase/migrations/202611130001_turots_metadata_v2.sql',
  'supabase/migrations/202611140001_turots_site_visitors.sql',
  'supabase/migrations/202611160001_turots_auto_replace_bundle_titles.sql',
]) {
  let sql = readFileSync(path.join(rootDir, 'Apps/Qomaruddin/turots-iiif-concept', file), 'utf8');
  if (file.includes('20261016110000')) {
    sql = sql.replace(/public\.digest\(/g, 'extensions.digest(');
  }
  // Ensure pgcrypto digest stub not needed if not calling view rate limit; add simple sha256 digest shim just in case
  await db.exec(sql);
}

// 3. Load Sanad runtime & publications (to test DB-07 FK ON DELETE RESTRICT and DB-08 sanad indexes)
await db.exec(readFileSync(path.join(rootDir, 'Apps/Qomaruddin/sanad/migrations/001-runtime.sql'), 'utf8'));
await db.exec(readFileSync(path.join(rootDir, 'Apps/Qomaruddin/sanad/migrations/003-publications.sql'), 'utf8'));

// 4. Load Nara feedback table (to test DB-08 nara_public_feedback index)
await db.exec(readFileSync(path.join(rootDir, 'Apps/Qomaruddin/nara/sql/20261101-feedback.sql'), 'utf8'));

// =============================================================================
// TEST DB-04: Regex '\\s+' fix + Arabic IMMUTABLE normalization + alias dedupe
// =============================================================================
// Insert sample person and two aliases that collapse to the same Arabic normalized form
const personId = (
  await db.query(`INSERT INTO core.people (display_name) VALUES ('  الشيخُ   أَحْمَدُ\tالتَّجَانِيُّ  ') RETURNING id`)
).rows[0].id;
await db.query(
  `INSERT INTO core.person_aliases (person_id, name, alias_type) VALUES
   ($1, 'أحمدُ  الشَّيخُ', 'variant'),
   ($1, 'احمد الشيخ', 'variant')`,
  [personId]
);

const db04Sql = readFileSync(
  path.join(rootDir, 'Local-Qomaruddin/supabase/migrations/20261122000100_db04_arabic_normalization_and_regex_fix.sql'),
  'utf8'
);
await db.exec(db04Sql);
await db.exec(db04Sql); // idempotent rerun

const normRow = (await db.query(`SELECT normalized_name FROM core.people WHERE id = $1`, [personId])).rows[0];
assert.equal(normRow.normalized_name, 'الشيخ احمد التجاني');

// Verify harakat, tatweel, Alef/Ya/Ta Marbuta unification, and whitespace collapsing
const arabicCases = (
  await db.query(`
    SELECT
      public.normalize_arabic_text('  أَحْمَـــدُ   إِبْرَاهِيمَ  ') AS a1,
      public.normalize_arabic_text('احمد ابراهيم') AS a2,
      public.normalize_arabic_text('مُوسَىٰ   مَدْرَسَةٌ') AS b1,
      public.normalize_arabic_text('موسي مدرسه') AS b2,
      public.normalize_arabic_text('آلُ   ٱلْقَمَرِ') AS c1,
      public.normalize_arabic_text('ال القمر') AS c2
  `)
).rows[0];
assert.equal(arabicCases.a1, arabicCases.a2);
assert.equal(arabicCases.b1, arabicCases.b2);
assert.equal(arabicCases.c1, arabicCases.c2);

// Duplicate Arabic alias collapsed cleanly and new duplicate must fail unique constraint
assert.equal((await db.query(`SELECT count(*)::int AS c FROM core.person_aliases WHERE person_id = $1`, [personId])).rows[0].c, 1);
await assert.rejects(
  () => db.query(`INSERT INTO core.person_aliases (person_id, name, alias_type) VALUES ($1, 'إحمدـ الشيخ', 'variant')`, [personId]),
  e => e.code === '23505'
);

// Test DB-04 rollback inside TX
const db04Rollback = readFileSync(
  path.join(rootDir, 'Local-Qomaruddin/supabase/rollbacks/20261122000100_rollback_db04.sql'),
  'utf8'
);
await db.exec('BEGIN;' + db04Rollback.replace(/^BEGIN;/im, '').replace(/COMMIT;\s*$/im, '') + 'ROLLBACK;');

// =============================================================================
// TEST SEC-09: Turots site visitor server-side country + rate-limit + cleanup
// =============================================================================
// Seed pre-existing defaced row before SEC-09
await db.exec(`
  INSERT INTO public.turots_site_visitors (visitor_id, country_code, country_name)
  VALUES ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'ID', '<script>DEFACE</script>');
`);

const sec09Sql = readFileSync(
  path.join(rootDir, 'Apps/Qomaruddin/turots-iiif-concept/supabase/migrations/202611220002_turots_sec09_visitor_hardening.sql'),
  'utf8'
);
await db.exec(sec09Sql);
await db.exec(sec09Sql); // idempotent rerun

// Old 3-arg signature must NOT exist
await assert.rejects(
  () => db.query(`SELECT public.record_turots_site_visitor('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'::uuid, 'XX', 'HACKED')`),
  /does not exist/
);

// Defaced historical row must have been cleaned to 'Indonesia'
const cleanedStats = (await db.query(`SELECT public.get_turots_visitor_stats() AS s`)).rows[0].s;
assert.equal(cleanedStats.countries[0].country_name, 'Indonesia');

// Anon call with cf-ipcountry='MY' records Malaysia regardless of client
await db.exec(`BEGIN; SET LOCAL ROLE anon; SELECT set_config('request.headers', '{"cf-ipcountry":"MY","cf-connecting-ip":"198.51.100.10"}', true);`);
await db.query(`SELECT public.record_turots_site_visitor('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'::uuid)`);
await db.exec('COMMIT;');
const vRow = (await db.query(`SELECT country_code, country_name FROM public.turots_site_visitors WHERE visitor_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'`)).rows[0];
assert.equal(vRow.country_code, 'MY');
assert.equal(vRow.country_name, 'Malaysia');

// Rate limit: 30 visits from same IP allowed, 31st is ignored
for (let i = 1; i <= 31; i++) {
  const vid = `cccccccc-cccc-4ccc-8ccc-${String(i).padStart(12, '0')}`;
  await db.exec(`BEGIN; SET LOCAL ROLE anon; SELECT set_config('request.headers', '{"cf-ipcountry":"SG","cf-connecting-ip":"203.0.113.77"}', true);`);
  await db.query(`SELECT public.record_turots_site_visitor($1::uuid)`, [vid]);
  await db.exec('COMMIT;');
}
const sgCount = (await db.query(`SELECT count(*)::int AS c FROM public.turots_site_visitors WHERE country_code = 'SG'`)).rows[0].c;
assert.equal(sgCount, 30);

// Test SEC-09 rollback inside TX
const sec09Rollback = readFileSync(
  path.join(rootDir, 'Apps/Qomaruddin/turots-iiif-concept/supabase/rollbacks/202611220002_rollback_sec09.sql'),
  'utf8'
);
await db.exec('BEGIN;' + sec09Rollback.replace(/^BEGIN;/im, '').replace(/COMMIT;\s*$/im, '') + 'ROLLBACK;');

// =============================================================================
// TEST DB-07: Soft-archive safe against Sanad FK ON DELETE RESTRICT & no regex
// =============================================================================
await db.exec(`
  INSERT INTO public.turots_text_units (id, bundle_id, display_id, sequence_no, title_original, category_primary, slug)
  VALUES ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', '01.A.03.0001', 1, 'Kitab Terikat Sanad', 'Fikih', 'kitab-terikat-sanad');
  INSERT INTO public.turots_pages (bundle_id, text_unit_id, page_order, canvas_id, image_url)
  VALUES ('dddddddd-dddd-4ddd-8ddd-dddddddddddd', 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', 1, 'c1', 'https://example.invalid/1');
  INSERT INTO sanad.catalog (kind, label, turots_unit_id)
  VALUES ('witness', 'Saksi Kitab Terikat Sanad', 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee');
`);

const db07Sql = readFileSync(
  path.join(rootDir, 'Apps/Qomaruddin/turots-iiif-concept/supabase/migrations/202611220003_turots_db07_soft_archive_replace.sql'),
  'utf8'
);
await db.exec(db07Sql);
await db.exec(db07Sql); // idempotent

// 1) Sending key='baru-2' WITHOUT replace_existing: true must NOT delete or archive existing title!
await db.query(`SELECT public.apply_turots_title_metadata_v2($1::jsonb)`, [
  JSON.stringify([
    {
      sheet: 'Judul',
      row: 2,
      code: 'DS 0097 00001',
      key: 'baru-2',
      kind: 'create',
      values: { title_original: 'Judul Tambahan Baru', category_primary: 'Fikih' },
      photos: [],
      folios: null,
    },
  ]),
]);
const afterNoReplace = (
  await db.query(`SELECT archived_at FROM public.turots_text_units WHERE id = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'`)
).rows[0];
assert.equal(afterNoReplace.archived_at, null);

// 2) Sending replace_existing: true MUST soft-archive old titles without triggering FK ON DELETE RESTRICT violation from sanad.catalog!
await db.query(`SELECT public.apply_turots_title_metadata_v2($1::jsonb)`, [
  JSON.stringify([
    {
      sheet: 'Judul',
      row: 2,
      code: 'DS 0097 00001',
      key: 'baru-2',
      kind: 'create',
      replace_existing: true,
      values: { title_original: 'Kitab Pengganti Aman', category_primary: 'Fikih' },
      photos: [],
      folios: { ranges: [[1, 1]] },
    },
  ]),
]);
const oldRowAfterReplace = (
  await db.query(`SELECT archived_at, display_id, slug FROM public.turots_text_units WHERE id = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'`)
).rows[0];
assert.ok(oldRowAfterReplace.archived_at !== null);
assert.equal(oldRowAfterReplace.display_id, 'archived:eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee');
assert.equal(oldRowAfterReplace.slug, null);

// 3) Explicit kind='delete' also soft-archives rather than hard DELETE
const newUnitId = (
  await db.query(`SELECT id FROM public.turots_text_units WHERE title_original = 'Kitab Pengganti Aman'`)
).rows[0].id;
await db.query(`SELECT public.apply_turots_title_metadata_v2($1::jsonb)`, [
  JSON.stringify([{ sheet: 'Judul', row: 1, code: 'DS 0097 00001', key: newUnitId, kind: 'delete', id: newUnitId, photos: [] }]),
]);
const deletedSoft = (await db.query(`SELECT archived_at FROM public.turots_text_units WHERE id = $1`, [newUnitId])).rows[0];
assert.ok(deletedSoft.archived_at !== null);

// Test DB-07 rollback inside TX
const db07Rollback = readFileSync(
  path.join(rootDir, 'Apps/Qomaruddin/turots-iiif-concept/supabase/rollbacks/202611220003_rollback_db07.sql'),
  'utf8'
);
await db.exec('BEGIN;' + db07Rollback.replace(/^BEGIN;/im, '').replace(/COMMIT;\s*$/im, '') + 'ROLLBACK;');

// =============================================================================
// TEST DB-08: Missing FK & rate-limit indexes (idempotent + rollback)
// =============================================================================
const db08Sql = readFileSync(
  path.join(rootDir, 'Local-Qomaruddin/supabase/migrations/20261122000200_db08_missing_fk_and_ratelimit_indexes.sql'),
  'utf8'
);
await db.exec(db08Sql);
await db.exec(db08Sql); // idempotent rerun

const expectedIndexes = [
  ['sanad', 'sanad_events_work_id_idx'],
  ['sanad', 'sanad_events_witness_id_idx'],
  ['sanad', 'sanad_events_organization_id_idx'],
  ['sanad', 'sanad_events_place_id_idx'],
  ['sanad', 'sanad_catalog_core_person_id_idx'],
  ['sanad', 'sanad_catalog_turots_unit_id_idx'],
  ['sanad', 'sanad_publications_published_by_idx'],
  ['sanad', 'sanad_decisions_actor_id_idx'],
  ['public', 'turots_pages_text_unit_id_idx'],
  ['public', 'turots_bundles_collection_id_idx'],
  ['public', 'turots_text_unit_classifications_classification_id_idx'],
  ['public', 'turots_relations_to_text_unit_id_idx'],
  ['core', 'core_people_merged_into_idx'],
  ['core', 'core_person_aliases_source_record_id_idx'],
  ['evidence', 'evidence_claim_sources_source_record_id_idx'],
  ['evidence', 'evidence_claim_sources_excerpt_id_idx'],
  ['evidence', 'evidence_claims_object_person_id_idx'],
  ['evidence', 'evidence_sanad_excerpts_source_record_id_idx'],
  ['evidence', 'evidence_sanad_claims_subject_person_id_idx'],
  ['evidence', 'evidence_sanad_claim_sources_source_record_id_idx'],
  ['evidence', 'evidence_sanad_claim_sources_excerpt_id_idx'],
  ['public', 'nara_public_feedback_target_created_idx'],
];

for (const [sch, idxName] of expectedIndexes) {
  const found = (
    await db.query(`SELECT 1 FROM pg_indexes WHERE schemaname = $1 AND indexname = $2`, [sch, idxName])
  ).rows.length;
  assert.equal(found, 1, `Expected index ${sch}.${idxName} to exist`);
}

const db08Rollback = readFileSync(
  path.join(rootDir, 'Local-Qomaruddin/supabase/rollbacks/20261122000200_rollback_db08.sql'),
  'utf8'
);
await db.exec('BEGIN;' + db08Rollback.replace(/^BEGIN;/im, '').replace(/COMMIT;\s*$/im, '') + 'ROLLBACK;');

console.log('PASS WAVE 4 DB: DB-04 (Arabic IMMUTABLE normalization + regex fix), SEC-09 (visitor server header + rate limit), DB-07 (soft-archive FK safe + explicit replace_existing), and DB-08 (22 FK/rate-limit indexes + rollbacks) verified in PGlite.');
await db.close();
