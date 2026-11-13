import { formatPhotoPageRanges, resolvePhotoPageRanges } from './pageRanges';
import { CATALOG_CATEGORIES } from '../catalogTaxonomy';
import { normalizeMultipleTerms, retiredTitleHeaders, bundleFields, titleFields, retiredBundleHeaders } from './metadataFields';
import { normalizeBundleCodeInput } from '../metadataModel';

export type CatalogRow = Record<string, any>;
export type ExcelRow = Record<string, string>;
export type ImportAction = {
  sheet: 'Bendel' | 'Judul'; row: number; code: string; key: string;
  kind: 'create' | 'update' | 'skip'; id?: string; expectedPages?: number[]; values: CatalogRow;
  changes: Array<{ field: string; before: unknown; after: unknown }>;
  collection?: { name: string; project: string }; folios?: { ranges?: Array<[number, number]>; clear?: boolean; start?: string; end?: string }; photos?: CatalogRow[];
};
export type ImportPlan = { actions: ImportAction[]; errors: string[]; warnings: string[]; snapshot: string };
const numeric = new Set(['extent_pages', 'blank_pages']);
const protectedFields = new Set(['bundle_code', 'display_id', 'record_no', 'category_sequence_no']);
const requiredFields = new Set(['sequence_no', 'metadata_status', 'access_level', 'title_original', 'category_primary']);
const statuses = ['imported', 'curated', 'verified', 'provisional', 'conflicting', 'unknown'];
function stableValue(value: any): any {
  if (Array.isArray(value)) return [...value].sort((a, b) => String(a?.id || '').localeCompare(String(b?.id || ''))).map(stableValue);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
  return value;
}
export const catalogSnapshot = (bundles: CatalogRow[]) => JSON.stringify(stableValue(bundles));

function parseValues(row: ExcelRow, sheet: 'Bendel' | 'Judul', existing?: CatalogRow) {
  const prefix = sheet === 'Bendel' ? 'bundle' : 'title';
  const fields = sheet === 'Bendel' ? bundleFields : titleFields;
  const values: CatalogRow = {};
  for (const field of fields) {
    if (protectedFields.has(field)) continue;
    const raw = row[`${prefix}_${field}`]?.trim();
    if (!raw || (existing && raw === String(existing[field] ?? '').trim())) continue;
    if (raw === '#HAPUS') {
      if (requiredFields.has(field)) throw new Error(`${field} tidak boleh dihapus melalui Excel.`);
      values[field] = null;
    } else if (sheet === 'Bendel' && numeric.has(field)) {
      if (!/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw)) || Number(raw) > 2147483647) throw new Error(`${field} harus bilangan bulat nol atau positif.`);
      values[field] = Number(raw);
    } else if (sheet === 'Judul' && field === 'lines_per_page') {
      if (!/^\d+$/.test(raw)) throw new Error('lines_per_page harus bilangan bulat nol atau positif.');
      values[field] = raw;
    } else if (field === 'right_to_left') {
      if (!['true', 'false', 'yes', 'no', 'ya', 'tidak', '1', '0'].includes(raw.toLowerCase())) throw new Error('right_to_left harus Ya/Tidak atau true/false.');
      values[field] = ['true', 'yes', 'ya', '1'].includes(raw.toLowerCase());
    } else values[field] = ['language','script'].includes(field) ? normalizeMultipleTerms(raw) : raw;
  }
  if (values.metadata_status && !statuses.includes(values.metadata_status)) throw new Error('metadata_status tidak dikenal.');
  if (values.access_level && !['public_preview', 'public_full', 'researcher', 'private'].includes(values.access_level)) throw new Error('access_level tidak dikenal.');
  if (values.category_primary && !CATALOG_CATEGORIES.includes(values.category_primary)) throw new Error('category_primary harus dipilih dari lembar Referensi.');
  return values;
}

function actionFor(sheet: ImportAction['sheet'], row: ExcelRow, index: number, existing: CatalogRow | undefined, resolvedCode?: string): ImportAction {
  const values = parseValues(row, sheet, existing);
  const changes = Object.entries(values).filter(([field, value]) => (['language','script'].includes(field) && typeof existing?.[field] === 'string' ? normalizeMultipleTerms(existing[field]) : existing?.[field] ?? null) !== value).map(([field, after]) => ({ field, before: existing?.[field] ?? null, after }));
  const code = resolvedCode || row.bundle_bundle_code?.trim() || '';
  return { sheet, row: index + 2, code, key: sheet === 'Bendel' ? code : row.title_display_id?.trim(), kind: existing ? (changes.length ? 'update' : 'skip') : 'create', id: existing?.id, values: Object.fromEntries(changes.map(change => [change.field, change.after])), changes };
}

export function planMetadataImport(bundleRows: ExcelRow[], titleRows: ExcelRow[], bundles: CatalogRow[], photoRows: ExcelRow[] = []): ImportPlan {
  titleRows = titleRows.map(row => ({...row, ...(row.title_page_ranges_label?.trim() ? {} : row.title_page_ranges?.trim() ? {title_page_ranges_label: row.title_page_ranges} : {})}));
  const plan: ImportPlan = { actions: [], errors: [], warnings: [], snapshot: catalogSnapshot(bundles) };
  if (bundleRows.some(row => retiredBundleHeaders.some(header => header in row))) plan.warnings.push('Kolom lama sumber/Archive, nomor DREAMSEA, writing_support, dan institution diabaikan. Gunakan ekspor terbaru untuk format yang lebih ringkas.');
  if (titleRows.some(row => retiredTitleHeaders.some(key => key in row))) plan.warnings.push('Kolom judul lama diabaikan. Gunakan ekspor terbaru dengan satu kolom rentang halaman.');
  const projected = new Map(bundles.map(bundle => [bundle.bundle_code, { ...bundle }]));
  const units = bundles.flatMap(bundle => (bundle.turots_text_units || []).map((unit: CatalogRow) => ({ ...unit, bundle_code: bundle.bundle_code })));
  const seenBundles = new Set<string>(); const seenTitles = new Set<string>();
  const claimedPages = new Map<string, string>();
  const titleRowsById = new Map(titleRows.map(row=>[row.title_id?.trim(),row]));
  const pageWillBeReleased = (page: CatalogRow, code: string) => {
    const owner=units.find(unit=>unit.id===page.text_unit_id&&unit.bundle_code===code);
    const ownerRow=owner?titleRowsById.get(owner.id):undefined;
    if(!ownerRow||!Object.hasOwn(ownerRow,'title_page_ranges_label'))return false;
    const requested=ownerRow.title_page_ranges_label?.trim();
    if(!requested)return false;
    if(requested==='#HAPUS')return true;
    if(requested===(owner.page_ranges_label || '').trim())return false;
    const ownerBundle=projected.get(code);
    return !resolvePhotoPageRanges(requested, ownerBundle?.turots_pages||[]).some(([first,last])=>Number(page.page_order)>=first&&Number(page.page_order)<=last);
  };
  bundleRows.forEach((row, index) => {
    if (!Object.values(row).some(value => value.trim())) return;
    try {
      const code = normalizeBundleCodeInput(row.bundle_bundle_code?.trim() || '', [...projected.values()]);
      if (!code) throw new Error('bundle_bundle_code wajib diisi.');
      if (seenBundles.has(code)) throw new Error(`kode ${code} berulang dalam Excel.`);
      seenBundles.add(code);
      const existing = projected.get(code);
      if (row.bundle_id?.trim() && row.bundle_id.trim() !== existing?.id) throw new Error('ID bendel tidak cocok; kode bendel tidak boleh diganti.');
      if (!existing) throw new Error('Bendel baru tidak boleh dibuat melalui impor metadata.');
      // Reference sheet only: never parse source metadata as writable title input.
      const reference = { ...Object.fromEntries(bundleFields.map(field => [`bundle_${field}`, existing[field]])), bundle_collection_name: existing.turots_collections?.name, bundle_source_project: existing.turots_collections?.source_project };
      const different = Object.entries(reference).filter(([key, value]) => {
        const raw = row[key]?.trim();
        if (!raw || raw === String(value ?? '').trim()) return false;
        if (['bundle_extent_pages','bundle_blank_pages'].includes(key) && value != null && /^[0-9]+(?:\.0+)?$/.test(raw) && Number(raw) === Number(value)) return false;
        return true;
      }).map(([key]) => key);
      if (different.length) plan.warnings.push(`Bendel baris ${index + 2} (${code}): nilai referensi berbeda pada ${different.join(', ')}; diabaikan karena metadata bendel hanya-baca. Data server tidak diubah.`);
      plan.actions.push({ sheet: 'Bendel', row: index + 2, code, key: code, kind: 'skip', id: existing.id, values: {}, changes: [] });
    } catch (error) { plan.errors.push(`Bendel baris ${index + 2}: ${(error as Error).message}`); }
  });
  if (photoRows.length) plan.warnings.push('Lembar Foto diabaikan: impor hanya metadata judul.');
  titleRows.forEach((row, index) => {
    if (!Object.values(row).some(value => value.trim())) return;
    try {
      const code = normalizeBundleCodeInput(row.bundle_bundle_code?.trim() || '', [...projected.values()]); const key = row.title_id?.trim() || `baru-${index + 2}`;
      if (!code) throw new Error('bundle_bundle_code wajib diisi.');
      if (seenTitles.has(key)) throw new Error(`ID judul ${key} berulang dalam Excel.`);
      seenTitles.add(key);
      const bundle = projected.get(code);
      if (!bundle) throw new Error(`bendel ${code} belum terdaftar. Pilih bendel sumber yang sudah ada.`);
      const existing = row.title_id?.trim() ? units.find(unit => unit.id === row.title_id.trim()) : undefined;
      if (row.title_id?.trim() && !existing) throw new Error('UUID judul tidak ditemukan; ekspor ulang.');
      if (!row.title_id?.trim() && row.title_display_id?.trim()) throw new Error('Judul lama wajib memakai title_id dari ekspor terbaru; untuk judul baru kosongkan ID inventaris.');
      if (existing?.archived_at) throw new Error('Judul sudah diarsipkan. Ekspor ulang metadata aktif.');
      if (existing && existing.bundle_code !== code) throw new Error(`ID ${key} sudah digunakan pada bendel ${existing.bundle_code}.`);
      if (row.title_id?.trim() && row.title_id.trim() !== existing?.id) throw new Error('ID judul tidak cocok; ID inventaris tidak boleh diganti.');
      for (const field of ['display_id','record_no','category_sequence_no']) {
        const raw = row[`title_${field}`]?.trim();
        const before = existing?.[field];
        if (!raw || raw === String(before ?? '').trim()) continue;
        if (field === 'category_sequence_no' && before != null && /^[0-9]+(?:\.0+)?$/.test(raw) && Number(raw) === Number(before)) continue;
        plan.warnings.push(`Judul baris ${index + 2}: title_${field} diisi “${raw}”${existing ? ` (nilai server: “${before ?? ''}”)` : ''}. Nilai ini diabaikan karena nomor dihitung otomatis oleh server; bukan metadata yang dapat diubah melalui Excel.`);
      }
      const action = actionFor('Judul', row, index, existing, code);
      action.key = existing?.display_id || key;
      if (!existing) {
        if (!action.values.title_original || !action.values.category_primary) throw new Error('judul asli dan kategori wajib untuk judul baru.');
        action.values = { metadata_status: 'imported', ...action.values };
      }
      const pages: CatalogRow[] = bundle.turots_pages || [];
      const hasPageRangeColumn = Object.hasOwn(row, 'title_page_ranges_label');
      const explicitPageRanges = (!existing || row.title_page_ranges_label?.trim() !== (existing.page_ranges_label || '').trim()) && hasPageRangeColumn && Boolean(row.title_page_ranges_label?.trim()) && row.title_page_ranges_label?.trim() !== '#HAPUS';
      const clearPageRanges = hasPageRangeColumn && row.title_page_ranges_label?.trim() === '#HAPUS';

      const currentPageOrders = pages.filter(page=>existing && page.text_unit_id===existing.id).map(page=>Number(page.page_order));
      action.expectedPages = currentPageOrders.sort((a,b)=>a-b);
      if (clearPageRanges) {
        if (currentPageOrders.length) {
          action.folios = { clear: true };
          action.changes.push({ field: 'pemetaan foto', before: formatPhotoPageRanges(currentPageOrders), after: 'kosong' });
          action.kind = existing ? 'update' : action.kind;
        }
      } else if (explicitPageRanges) {
        const numericRanges = resolvePhotoPageRanges(row.title_page_ranges_label, pages);
        if (!numericRanges.length) throw new Error('Isi rentang halaman foto, misalnya 1-100;101-174 atau 066v-088r.');
        if (!pages.length) throw new Error('Rentang halaman foto belum bisa dipetakan karena bendel belum memiliki foto tersimpan. Simpan foto dahulu atau kosongkan kolom rentang.');
        for (let rangeIndex = 0; rangeIndex < numericRanges.length; rangeIndex += 1) {
          const [first, last] = numericRanges[rangeIndex];
          if (numericRanges.slice(0, rangeIndex).some(([priorFirst, priorLast]) => first <= priorLast && last >= priorFirst)) throw new Error('Rentang foto saling bertumpang tindih.');
          if (!pages.some(p => Number(p.page_order) === first) || !pages.some(p => Number(p.page_order) === last)) throw new Error('Rentang foto melebihi daftar foto bendel atau batas awal/akhirnya tidak ditemukan.');
          const selected = pages.filter(page => Number(page.page_order) >= first && Number(page.page_order) <= last);
          for (const page of selected) {
            const pageKey = page.id || `${code}:${page.page_order}`;
            const pageOwner=units.find(unit=>unit.id===page.text_unit_id)?.display_id;
            if ((page.text_unit_id && page.text_unit_id !== existing?.id && !pageWillBeReleased(page,code)) || (claimedPages.has(pageKey) && claimedPages.get(pageKey) !== key)) throw new Error(`Foto urutan ${page.page_order} sudah dipakai judul ${pageOwner||'lain'} atau bertabrakan dalam Excel.`);
            claimedPages.set(pageKey, key);
          }
        }
        const selectedOrders=pages.filter(page=>numericRanges.some(([first,last])=>Number(page.page_order)>=first&&Number(page.page_order)<=last)).map(page=>Number(page.page_order));
        if (formatPhotoPageRanges(selectedOrders)!==formatPhotoPageRanges(currentPageOrders)) {
          action.folios = { ranges: numericRanges };
          action.changes.push({ field: 'pemetaan foto', before: formatPhotoPageRanges(currentPageOrders) || (existing ? 'kosong' : null), after: formatPhotoPageRanges(selectedOrders) });
          if (existing) action.kind = 'update';
        }
      } else if (!existing) plan.warnings.push(`Judul baris ${index + 2}: belum dipetakan ke foto; isi title_page_ranges_label setelah foto terdaftar.`);
      plan.actions.push(action);
    } catch (error) { plan.errors.push(`Judul baris ${index + 2}: ${(error as Error).message}`); }
  });
  if (!plan.actions.length && !plan.errors.length) plan.warnings.push('Tidak ada baris metadata.');
  return plan;
}
