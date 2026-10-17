import { supabase } from '../lib/supabase';
import { formatCatalogRpcError, listAdminBundles } from './turotsRepository';
import { catalogSnapshot, type ImportAction, type ImportPlan, type CatalogRow } from './metadataImport';
import { parsePhotoPageRanges } from './pageRanges';

export type ImportResult = { completed: string[]; failed?: string };

export class ImportOutcomeUnknownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImportOutcomeUnknownError';
  }
}

export async function applyMetadataImport(plan: ImportPlan, _unused?: unknown, progress?: (message: string) => void): Promise<ImportResult> {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  if (plan.errors.length) throw new Error('Perbaiki semua kesalahan Excel sebelum menyimpan.');

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
  if (Array.isArray(value.ranges)) return value.ranges.length ? { ranges: value.ranges } : null;

  const start = String(value.start || '').trim();
  const end = String(value.end || '').trim();
  if (!start && !end) return null;
  const expression = /^\d+\s*-\s*\d+(?:\s*[;,]\s*\d+(?:\s*-\s*\d+)?)*$/.test(start)
    ? start
    : /^\d+$/.test(start) && /^\d+$/.test(end) ? `${start}-${end}` : '';
  if (!expression) return null;
  const ranges = parsePhotoPageRanges(expression);
  return ranges.length ? { ranges } : null;
}
