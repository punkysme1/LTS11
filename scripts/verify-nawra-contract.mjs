import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const contract = JSON.parse(readFileSync(resolve(root, 'docs/nawra-contract-v1.json'), 'utf8'));
const edge = readFileSync(resolve(root, '../../../Services/Supabase/turots-local/supabase/functions/nawra-catalog/index.ts'), 'utf8');
const operations = contract.operations || [];
const missing = operations.filter((operation) => !edge.includes(`'${operation}'`));
if (missing.length) throw new Error(`Edge Function belum mengimplementasikan: ${missing.join(', ')}`);
if (!edge.includes('metadata_is_not_content: true')) throw new Error('Envelope Nawra tidak menandai metadata_is_not_content.');
console.log(`Nawra contract OK: ${operations.length} operasi terdeteksi.`);
