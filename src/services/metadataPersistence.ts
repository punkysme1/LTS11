import { supabase } from '../lib/supabase';
import { formatCatalogRpcError, listAdminBundles } from './turotsRepository';
import { catalogSnapshot, type ImportAction, type ImportPlan, type CatalogRow } from './metadataImport';
import { parsePhotoPageRanges } from './pageRanges';

export type ImportResult = { completed: string[]; failed?: string };

export type ImportWriter = {
  list: () => Promise<CatalogRow[]>;
  collection: (name: string, project: string) => Promise<string>;
  write: (table: 'turots_bundles' | 'turots_text_units', values: CatalogRow, id?: string) => Promise<CatalogRow>;
  folios?: (bundleId: string, unitId: string, folios: unknown) => Promise<void>;
};

export class ImportOutcomeUnknownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImportOutcomeUnknownError';
  }
}

export async function applyMetadataImport(plan: ImportPlan, writer?: ImportWriter, progress?: (message: string) => void): Promise<ImportResult> {
  if (plan.errors.length) throw new Error('Perbaiki semua kesalahan Excel sebelum menyimpan.');

  if (writer) {
    const current = await writer.list();
    if (catalogSnapshot(current) !== plan.snapshot) throw new Error('Data server berubah sejak pratinjau. Pilih Excel lagi untuk memeriksa perubahan terbaru.');
    const operations = plan.actions.filter(action => action.kind !== 'skip');
    const completed: string[] = [];
    const bundleIds = new Map<string, string>(current.map(b => [b.bundle_code, b.id]));
    for (const action of operations) {
      try {
        if (action.sheet === 'Bendel') {
          const colId = action.collection ? await writer.collection(action.collection.name, action.collection.project) : undefined;
          const payload = {
            ...action.values,
            ...(colId ? { collection_id: colId } : {}),
            ...(action.id ? {} : { bundle_code: action.code, publication_status: 'draft' }),
          };
          const saved = await writer.write('turots_bundles', payload, action.id);
          bundleIds.set(action.code, saved.id);
        } else {
          const bId = bundleIds.get(action.code);
          const payload = {
            ...action.values,
            ...(action.id ? {} : { bundle_id: bId, display_id: action.key }),
          };
          const saved = await writer.write('turots_text_units', payload, action.id);
          if (action.folios && writer.folios && bId) await writer.folios(bId, saved.id, action.folios);
        }
        completed.push(`${action.sheet} ${action.key}`);
      } catch (err) {
        return { completed, failed: err instanceof Error ? err.message : String(err) };
      }
    }
    return { completed };
  }

  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');

  const current = await listAdminBundles() as CatalogRow[];
  if (catalogSnapshot(current) !== plan.snapshot) throw new Error('Data server berubah sejak pratinjau. Pilih Excel lagi untuk memeriksa perubahan terbaru.');

  const operations = plan.actions.filter(action => action.kind !== 'skip');
  if (!operations.length) return { completed: [] };
  progress?.(`Mengirim ${operations.length} perubahan sebagai satu transaksi…`);

  let response: Awaited<ReturnType<typeof supabase.rpc>>;
  try {
    response = await supabase.rpc('apply_turots_catalog_import', {
      p_operations: operations.map(toOperation),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new ImportOutcomeUnknownError(`Koneksi terputus saat menunggu jawaban server: ${reason}`);
  }
  const { data, error } = response;
  if (error) {
    throw new Error(formatCatalogRpcError(error, 'Impor dibatalkan tanpa menyimpan perubahan'));
  }

  if (!Array.isArray(data?.completed) || data.completed.length !== operations.length) {
    throw new ImportOutcomeUnknownError(`Jawaban server tidak memberikan tanda selesai yang lengkap (${Array.isArray(data?.completed) ? data.completed.length : 0} dari ${operations.length}). Periksa status data sebelum mencoba impor ulang.`);
  }

  return {
    completed: data.completed,
  };
}

function toOperation(action: ImportAction) {
  const folios = normalizePhotoMapping(action.folios as (ImportAction['folios'] & { start?: string; end?: string }) | null | undefined);
  return {
    sheet: action.sheet,
    row: action.row,
    code: action.code,
    key: action.key,
    id: action.id || null,
    values: action.values,
    collection: action.collection || null,
    photos: action.photos || [],
    folios,
    changes: action.changes,
  };
}

function normalizePhotoMapping(value: (ImportAction['folios'] & { start?: string; end?: string }) | null | undefined) {
  if (!value) return null;
  if (value.clear) return { clear: true };
  if (Array.isArray(value.ranges) && value.ranges.length) return { ranges: value.ranges };

  const start = String(value.start || '').trim();
  const end = String(value.end || '').trim();
  if (!start && !end) return null;
  const expression = /^\d+\s*-\s*\d+(?:\s*[;,]\s*\d+(?:\s*-\s*\d+)?)*$/.test(start)
    ? start
    : /^\d+$/.test(start) && /^\d+$/.test(end) ? `${start}-${end}` : '';
  if (expression) {
    const ranges = parsePhotoPageRanges(expression);
    return ranges.length ? { ranges } : null;
  }
  return { start, end };
}
