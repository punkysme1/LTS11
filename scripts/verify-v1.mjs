import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const supabaseRoot = resolve(root, '../../../Services/Supabase/turots-local/supabase');
const requiredFiles = [
  'src/AppV1.tsx', 'src/services/turotsRepository.ts', 'src/services/nawraAdapter.ts',
  'docs/nawra-contract-v1.json', 'docs/metadata-mapping-v1.md',
  'scripts/setup-turots-local.ps1', 'scripts/verify-nawra-contract.mjs',
];
const missingFiles = requiredFiles.filter((file) => !existsSync(resolve(root, file)));
if (missingFiles.length) throw new Error(`Ontbrekende bestanden: ${missingFiles.join(', ')}`);

const migrations = readFileSync(resolve(supabaseRoot, 'migrations/20261003090000_turots_v1_catalog.sql'), 'utf8');
const requiredTables = ['turots_collections', 'turots_bundles', 'turots_text_units', 'turots_pages', 'turots_relations', 'turots_research_items', 'turots_audit_log'];
const missingTables = requiredTables.filter((table) => !migrations.includes(`create table if not exists public.${table}`));
if (missingTables.length) throw new Error(`Ontbrekende tabellen in migration: ${missingTables.join(', ')}`);

const app = readFileSync(resolve(root, 'src/AppV1.tsx'), 'utf8');
for (const route of ['/katalog', '/admin']) if (!app.includes(route)) throw new Error(`Route ontbreekt: ${route}`);
console.log(`Turots v1 static audit OK: ${requiredFiles.length} files, ${requiredTables.length} core tables, routes /katalog and /admin.`);
