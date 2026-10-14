import assert from 'node:assert/strict';
import { planMetadataImport, type CatalogRow } from '../src/services/metadataImport';
import { applyMetadataImport, type ImportWriter } from '../src/services/metadataPersistence';
import { catalogLinks } from '../src/services/metadataXlsx';

const bundles: CatalogRow[] = [{ id: 'b1', bundle_code: 'DS 001', display_title: 'Lama', publication_status: 'published', turots_collections: { name: 'Ndalem', source_project: 'Dreamsea' }, turots_text_units: [{ id: 'u1', display_id: 'J001', sequence_no: 1, title_original: 'قديم', author: 'Penulis lama', category_primary: 'Fikih', folio_start: '1r', folio_end: '1v' }], turots_pages: [{ id: 'p1', folio_label: '1r', text_unit_id: 'u1' }, { id: 'p2', folio_label: '1v', text_unit_id: 'u1' }, { id: 'p3', folio_label: '2r', text_unit_id: null }, { id: 'p4', folio_label: '2v', text_unit_id: null }] }];
const title = { bundle_bundle_code: 'DS 001', title_display_id: 'J001' };
let plan = planMetadataImport([], [{ ...title, title_author: '', title_title_original: 'جديد' }], bundles);
assert.deepEqual(plan.actions[0].values, { title_original: 'جديد' });
assert.equal(plan.errors.length, 0);
assert.deepEqual(planMetadataImport([], [{ ...title, title_author: '#HAPUS' }], bundles).actions[0].values, { author: null });
assert.match(planMetadataImport([], [{ ...title, title_category_primary: '#HAPUS' }], bundles).errors[0], /tidak boleh/);
assert.equal(planMetadataImport([{}], [title], bundles).actions[0].row, 2);
assert.match(planMetadataImport([], [title, title], bundles).errors[0], /berulang/);
assert.match(planMetadataImport([], [{ ...title, title_id: 'wrong' }], bundles).errors[0], /tidak cocok/);
assert.match(planMetadataImport([], [{ ...title, title_lines_per_page: '-1' }], bundles).errors[0], /bilangan bulat/);
assert.match(planMetadataImport([], [{ ...title, title_category_primary: 'Bukan kategori' }], bundles).errors[0], /Referensi/);
assert.match(planMetadataImport([{ bundle_bundle_code: 'DS 001', bundle_right_to_left: 'maybe' }], [], bundles).errors[0], /Ya\/Tidak/);
assert.match(planMetadataImport([], [{ ...title, title_folio_start: '99r', title_folio_end: '99v' }], bundles).errors[0], /tidak ditemukan/);
const freshTitle = { bundle_bundle_code: 'DS 001', title_display_id: 'J002', title_title_original: 'Baru', title_category_primary: 'Fikih', title_folio_start: '2r', title_folio_end: '2v' };
plan = planMetadataImport([], [freshTitle], bundles);
assert.equal(plan.errors.length, 0); assert.equal(plan.actions[0].values.sequence_no, 2); assert.ok(plan.actions[0].folios);
assert.match(planMetadataImport([], [freshTitle, { ...freshTitle, title_display_id: 'J003' }], bundles).errors[0], /bertabrakan/);
assert.match(planMetadataImport([], [{ ...freshTitle, title_folio_start: '1r' }], bundles).errors[0], /judul lain/);
assert.match(planMetadataImport([], [{ ...freshTitle, title_sequence_no: '1' }], bundles).errors[0], /urutan/);
assert.equal(planMetadataImport([], [{ ...title, title_folio_start: '1r', title_folio_end: '1v' }], bundles).actions[0].kind, 'skip');
const unmapped = structuredClone(bundles); unmapped[0].turots_pages[0].text_unit_id = null;
assert.equal(planMetadataImport([], [{ ...title, title_folio_start: '1r', title_folio_end: '1v' }], unmapped).actions[0].kind, 'update');
const newBundle = { bundle_bundle_code: 'DS 002', bundle_collection_name: 'Ndalem', bundle_source_project: 'Dreamsea' };
const newUnit = { bundle_bundle_code: 'DS 002', title_display_id: 'J003', title_title_original: 'كتاب', title_category_primary: 'Fikih' };
plan = planMetadataImport([newBundle], [newUnit], bundles);
assert.equal(plan.errors.length, 0); assert.equal(plan.warnings.length, 1);
const calls: any[] = [];
const writer: ImportWriter = {
  list: async () => bundles,
  collection: async () => 'c1',
  write: async (table, values, id) => { calls.push({ table, values, id }); return { ...values, id: id || (table === 'turots_bundles' ? 'b2' : 'u2') }; },
  folios: async (...args) => { calls.push({ folios: args }); },
};
const result = await applyMetadataImport(plan, writer);
assert.equal(result.completed.length, 2); assert.equal(calls[0].values.publication_status, 'draft'); assert.equal(calls[1].values.bundle_id, 'b2');
await assert.rejects(() => applyMetadataImport(plan, { ...writer, list: async () => [] }), /berubah/);
await assert.rejects(() => applyMetadataImport({ ...plan, errors: ['invalid'] }, writer), /Perbaiki/);
const partial = await applyMetadataImport(plan, { ...writer, write: async (table, values) => { if (table === 'turots_text_units') throw new Error('network failed'); return { ...values, id: 'b2' }; } });
assert.equal(partial.completed.length, 1); assert.match(partial.failed!, /network failed/);
const links = catalogLinks(bundles[0], bundles[0].turots_text_units[0], 'http://localhost:3005');
assert.match(links.title_url!, /unit=u1&bundle=b1/); assert.match(links.title_admin_url!, /\/admin\/manuskrip\/u1\/edit$/);
console.log('PASS: metadata validation, blank/delete semantics, IDs, folio conflicts, retry mapping, create/update, stale preview, partial failure, URLs. No server writes.');
import { resolveCatalogCollection } from '../src/services/collectionResolver';
let collectionRows: any[] = [{ id: 'c1', code: 'DREAMSEA-NDALEM', name: 'Ndalem', source_project: 'Dreamsea' }];
let inserts = 0;
let race = false;
const collectionClient = { from: () => ({
  select: async () => ({ data: collectionRows, error: null }),
  insert: (values: any) => { inserts++; return { select: () => ({ single: async () => {
    if (race) { collectionRows.push({ id: 'race', ...values }); return { error: { code: '23505' } }; }
    return { data: { id: 'new', ...values }, error: null };
  } }) }; },
}) };
assert.equal(await resolveCatalogCollection(collectionClient, '  NDalem  ', 'dreamsea'), 'c1');
assert.equal(inserts, 0);
assert.equal(await resolveCatalogCollection(collectionClient, 'Baru', 'Dreamsea'), 'new');
collectionRows = [{ id: 'c2', code: 'DREAMSEA-A-B', name: 'A-B', source_project: 'Dreamsea' }];
await assert.rejects(() => resolveCatalogCollection(collectionClient, 'A B', 'Dreamsea'), /sudah dipakai/);
collectionRows = []; race = true;
assert.equal(await resolveCatalogCollection(collectionClient, 'Ndalem', 'Dreamsea'), 'race');
console.log('PASS: collection case/space normalization, new collection, semantic collision, concurrent insert recovery.');
