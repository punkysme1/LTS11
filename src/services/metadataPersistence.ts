import { supabase } from '../lib/supabase';
import { listAdminBundles, resolveCollection, updateTextUnitFolioRange } from './turotsRepository';
import { catalogSnapshot, type ImportAction, type ImportPlan, type CatalogRow } from './metadataImport';

export type ImportResult = { completed: string[]; failed?: string };
export interface ImportWriter {
  list(): Promise<CatalogRow[]>;
  collection(name: string, project: string): Promise<string>;
  write(table: string, values: CatalogRow, id?: string): Promise<CatalogRow>;
  folios(bundle: string, unit: string, start: string, end: string): Promise<void>;
}
const serverWriter: ImportWriter = {
  list: listAdminBundles,
  collection: resolveCollection,
  async write(table, values, id) {
    if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
    const request = id ? supabase.from(table).update({ ...values, updated_at: new Date().toISOString() }).eq('id', id) : supabase.from(table).insert(values);
    const { data, error } = await request.select().single();
    if (error) throw error;
    return data;
  },
  folios: updateTextUnitFolioRange,
};

async function saveAction(action: ImportAction, bundleIds: Map<string, string>, writer: ImportWriter) {
  if (action.sheet === 'Bendel') {
    const values = { ...action.values };
    if (action.collection) values.collection_id = await writer.collection(action.collection.name, action.collection.project);
    if (!action.id) Object.assign(values, { bundle_code: action.code, publication_status: 'draft' });
    const saved = await writer.write('turots_bundles', values, action.id);
    bundleIds.set(action.code, saved.id);
    for(const photo of action.photos||[]) await writer.write('turots_pages',{
      bundle_id: saved.id,
      canvas_id: photo.canvas_id || photo.image_url,
      page_order: photo.page_order,
      label: photo.label || photo.folio_label || String(photo.page_order),
      folio_label: photo.folio_label || photo.label || String(photo.page_order),
      side: 'unknown',
      image_url: photo.image_url,
      thumbnail_url: photo.thumbnail_url || photo.image_url,
    });
    return;
  }
  const bundleId = bundleIds.get(action.code);
  if (!bundleId) throw new Error(`Bendel ${action.code} tidak ditemukan.`);
  const values = action.id ? action.values : { ...action.values, bundle_id: bundleId, display_id: action.key };
  const saved = await writer.write('turots_text_units', values, action.id);
  if (action.folios) {
    try { await writer.folios(bundleId, saved.id, action.folios.start, action.folios.end); }
    catch (error) { throw new Error(`Metadata judul tersimpan, tetapi pemetaan foto gagal: ${(error as Error).message}. Periksa rentang folio di editor judul.`); }
  }
}

export async function applyMetadataImport(plan: ImportPlan, writer: ImportWriter = serverWriter, progress?: (message: string) => void): Promise<ImportResult> {
  if (plan.errors.length) throw new Error('Perbaiki semua kesalahan Excel sebelum menyimpan.');
  const current = await writer.list();
  if (catalogSnapshot(current) !== plan.snapshot) throw new Error('Data server berubah sejak pratinjau. Pilih Excel lagi untuk memeriksa perubahan terbaru.');
  const ids = new Map(current.map(bundle => [bundle.bundle_code, bundle.id]));
  const result: ImportResult = { completed: [] };
  for (const action of plan.actions.filter(action => action.kind !== 'skip')) {
    const label = `${action.sheet} baris ${action.row} (${action.key})`;
    progress?.(`Menyimpan ${label}…`);
    try { await saveAction(action, ids, writer); result.completed.push(label); }
    catch (error) { result.failed = `${label}: ${(error as Error).message || String(error)}`; break; }
  }
  return result;
}
