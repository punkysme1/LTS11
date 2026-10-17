import { imageRanges } from './imageRanges';
import { formatPhotoPageRanges, parsePhotoPageRanges } from './pageRanges';
import { CATALOG_CATEGORIES } from '../catalogTaxonomy';
import { bundleFields, titleFields, retiredBundleHeaders } from './metadataFields';

export type CatalogRow = Record<string, any>;
export type ExcelRow = Record<string, string>;
export type ImportAction = {
  sheet: 'Bendel' | 'Judul'; row: number; code: string; key: string;
  kind: 'create' | 'update' | 'skip'; id?: string; values: CatalogRow;
  changes: Array<{ field: string; before: unknown; after: unknown }>;
  collection?: { name: string; project: string }; folios?: { ranges?: Array<[number, number]>; clear?: boolean }; photos?: CatalogRow[];
};
export type ImportPlan = { actions: ImportAction[]; errors: string[]; warnings: string[]; snapshot: string };
const numeric = new Set(['extent_pages', 'blank_pages', 'sequence_no', 'lines_per_page']);
const protectedFields = new Set(['bundle_code', 'display_id']);
const requiredFields = new Set(['sequence_no', 'metadata_status', 'access_level', 'title_original', 'category_primary']);
const statuses = ['imported', 'curated', 'verified', 'provisional', 'conflicting', 'unknown'];
function stableValue(value: any): any {
  if (Array.isArray(value)) return [...value].sort((a, b) => String(a?.id || '').localeCompare(String(b?.id || ''))).map(stableValue);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
  return value;
}
export const catalogSnapshot = (bundles: CatalogRow[]) => JSON.stringify(stableValue(bundles));

function parseValues(row: ExcelRow, sheet: 'Bendel' | 'Judul') {
  const prefix = sheet === 'Bendel' ? 'bundle' : 'title';
  const fields = sheet === 'Bendel' ? bundleFields : titleFields;
  const values: CatalogRow = {};
  for (const field of fields) {
    if (protectedFields.has(field)) continue;
    const raw = row[`${prefix}_${field}`]?.trim();
    if (!raw) continue;
    if (raw === '#HAPUS') {
      if (requiredFields.has(field) || field === 'folio_start' || field === 'folio_end') throw new Error(`${field} tidak boleh dihapus melalui Excel.`);
      values[field] = null;
    } else if (numeric.has(field)) {
      if (!/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw)) || Number(raw) > 2147483647 || (field === 'sequence_no' && Number(raw) < 1)) throw new Error(`${field} harus bilangan bulat ${field === 'sequence_no' ? 'positif' : 'nol atau positif'}.`);
      values[field] = Number(raw);
    } else if (field === 'right_to_left') {
      if (!['true', 'false', 'yes', 'no', 'ya', 'tidak', '1', '0'].includes(raw.toLowerCase())) throw new Error('right_to_left harus Ya/Tidak atau true/false.');
      values[field] = ['true', 'yes', 'ya', '1'].includes(raw.toLowerCase());
    } else values[field] = raw;
  }
  if (values.metadata_status && !statuses.includes(values.metadata_status)) throw new Error('metadata_status tidak dikenal.');
  if (values.access_level && !['public_preview', 'public_full', 'researcher', 'private'].includes(values.access_level)) throw new Error('access_level tidak dikenal.');
  if (values.category_primary && !CATALOG_CATEGORIES.includes(values.category_primary)) throw new Error('category_primary harus dipilih dari lembar Referensi.');
  return values;
}

function actionFor(sheet: ImportAction['sheet'], row: ExcelRow, index: number, existing: CatalogRow | undefined): ImportAction {
  const values = parseValues(row, sheet);
  const changes = Object.entries(values).filter(([field, value]) => (existing?.[field] ?? null) !== value).map(([field, after]) => ({ field, before: existing?.[field] ?? null, after }));
  return { sheet, row: index + 2, code: row.bundle_bundle_code?.trim() || '', key: sheet === 'Bendel' ? row.bundle_bundle_code?.trim() : row.title_display_id?.trim(), kind: existing ? (changes.length ? 'update' : 'skip') : 'create', id: existing?.id, values: Object.fromEntries(changes.map(change => [change.field, change.after])), changes };
}

export function planMetadataImport(bundleRows: ExcelRow[], titleRows: ExcelRow[], bundles: CatalogRow[], photoRows: ExcelRow[] = []): ImportPlan {
  const plan: ImportPlan = { actions: [], errors: [], warnings: [], snapshot: catalogSnapshot(bundles) };
  if (bundleRows.some(row => retiredBundleHeaders.some(header => header in row))) plan.warnings.push('Kolom lama sumber/Archive, nomor DREAMSEA, writing_support, dan institution diabaikan. Gunakan ekspor terbaru untuk format yang lebih ringkas.');
  const projected = new Map(bundles.map(bundle => [bundle.bundle_code, { ...bundle }]));
  const units = bundles.flatMap(bundle => (bundle.turots_text_units || []).map((unit: CatalogRow) => ({ ...unit, bundle_code: bundle.bundle_code })));
  const seenBundles = new Set<string>(); const seenTitles = new Set<string>();
  const claimedPages = new Map<string, string>();
  const titleRowsById = new Map(titleRows.map(row=>[row.title_display_id?.trim(),row]));
  const pageWillBeReleased = (page: CatalogRow, code: string) => {
    const owner=units.find(unit=>unit.id===page.text_unit_id&&unit.bundle_code===code);
    const ownerRow=owner?titleRowsById.get(owner.display_id):undefined;
    if(!ownerRow||!Object.hasOwn(ownerRow,'title_page_ranges'))return false;
    const requested=ownerRow.title_page_ranges?.trim();
    if(!requested||requested==='#HAPUS')return true;
    return !parsePhotoPageRanges(requested).some(([first,last])=>Number(page.page_order)>=first&&Number(page.page_order)<=last);
  };
  const sequences = new Map<string, number>();
  for (const unit of units) sequences.set(unit.bundle_code, Math.max(sequences.get(unit.bundle_code) || 0, Number(unit.sequence_no) || 0));
  bundleRows.forEach((row, index) => {
    if (!Object.values(row).some(value => value.trim())) return;
    try {
      const code = row.bundle_bundle_code?.trim();
      if (!code) throw new Error('bundle_bundle_code wajib diisi.');
      if (seenBundles.has(code)) throw new Error(`kode ${code} berulang dalam Excel.`);
      seenBundles.add(code);
      const existing = projected.get(code);
      if (row.bundle_id?.trim() && row.bundle_id.trim() !== existing?.id) throw new Error('ID bendel tidak cocok; kode bendel tidak boleh diganti.');
      const action = actionFor('Bendel', row, index, existing);
      const name = row.bundle_collection_name?.trim() || existing?.turots_collections?.name;
      const project = row.bundle_source_project?.trim() || existing?.turots_collections?.source_project;
      if (!name || !project || name === '#HAPUS' || project === '#HAPUS') throw new Error('koleksi dan proyek wajib diisi untuk bendel baru.');
      if (name !== existing?.turots_collections?.name || project !== existing?.turots_collections?.source_project) {
        action.collection = { name, project };
        action.changes.push({ field: 'koleksi / proyek', before: existing ? `${existing.turots_collections?.name} / ${existing.turots_collections?.source_project}` : null, after: `${name} / ${project}` });
        if (existing) action.kind = 'update';
      }
      if (!existing) action.values = { display_title: code, metadata_status: 'imported', ...action.values };
      projected.set(code, { ...existing, ...action.values, bundle_code: code, turots_collections: { name, source_project: project } });
      plan.actions.push(action);
    } catch (error) { plan.errors.push(`Bendel baris ${index + 2}: ${(error as Error).message}`); }
  });
  const photoGroups = new Map<string, CatalogRow[]>();
  photoRows.forEach((row,index)=>{
    if (!Object.values(row).some(value=>value.trim())) return;
    try {
      const code=row.bundle_bundle_code?.trim(); const order=Number(row.photo_order);
      if (!projected.has(code)) throw new Error('Bendel belum terdaftar.');
      if (!Number.isSafeInteger(order)||order<1) throw new Error('Urutan foto harus bilangan positif.');
      const url=new URL(row.photo_image_url);
      if (url.protocol!=='https:'||url.origin!=='https://cloud.naracode.id'||!url.pathname.startsWith('/iiif/3/')) throw new Error('URL foto harus dari Cantaloupe cloud.naracode.id/iiif/3.');
      const group=photoGroups.get(code)||[];
      if(group.some(p=>p.page_order===order||p.image_url===url.href)) throw new Error('Urutan atau URL foto berulang.');
      group.push({page_order:order,canvas_id:url.href.replace(/\/full\/max\/0\/default\.jpg$/,''),image_url:url.href,thumbnail_url:url.href,folio_label:row.photo_label||String(order),label:row.photo_label||String(order)});
      photoGroups.set(code,group);
    } catch(error) { plan.errors.push(`Foto baris ${index+2}: ${(error as Error).message}`); }
  });
  for(const [code,photos] of photoGroups) {
    const bundle=projected.get(code)!; const stored:CatalogRow[]=bundle.turots_pages||[];
    const additions=photos.filter(photo=>{
      const prior=stored.find(p=>p.page_order===photo.page_order);
      if(prior && prior.image_url!==photo.image_url) plan.errors.push(`Foto ${code} nomor ${photo.page_order}: sudah ada gambar berbeda; tidak ditimpa.`);
      if (stored.some(page => page.image_url === photo.image_url && page.page_order !== photo.page_order)) plan.errors.push(`Foto ${code}: URL gambar yang sama sudah digunakan pada urutan lain.`);
      return !prior;
    });
    bundle.turots_pages=[...stored,...additions];
    if(!additions.length)continue;
    let action=plan.actions.find(a=>a.sheet==='Bendel'&&a.code===code);
    if(!action){action={sheet:'Bendel',row:0,code,key:code,kind:'update',id:bundle.id,values:{},changes:[]};plan.actions.push(action);}
    action.photos=additions;
    if(action.kind==='skip')action.kind='update';
    action.changes.push({field:'foto server',before:stored.length,after:bundle.turots_pages.length});
    plan.warnings.push(`${code}: ${additions.length} URL foto didaftarkan; gambar tersedia setelah berkas diunggah ke lokasi server yang sesuai.`);
  }
  titleRows.forEach((row, index) => {
    if (!Object.values(row).some(value => value.trim())) return;
    try {
      const code = row.bundle_bundle_code?.trim(); const key = row.title_display_id?.trim();
      if (!code || !key) throw new Error('bundle_bundle_code dan title_display_id wajib diisi.');
      if (seenTitles.has(key)) throw new Error(`ID judul ${key} berulang dalam Excel.`);
      seenTitles.add(key);
      const bundle = projected.get(code);
      if (!bundle) throw new Error(`bendel ${code} belum ada; tambahkan di lembar Bendel.`);
      const existing = units.find(unit => unit.display_id === key);
      if (existing && existing.bundle_code !== code) throw new Error(`ID ${key} sudah digunakan pada bendel ${existing.bundle_code}.`);
      if (row.title_id?.trim() && row.title_id.trim() !== existing?.id) throw new Error('ID judul tidak cocok; ID inventaris tidak boleh diganti.');
      const action = actionFor('Judul', row, index, existing);
      if (!existing) {
        if (!action.values.title_original || !action.values.category_primary) throw new Error('judul asli dan kategori wajib untuk judul baru.');
        action.values = { sequence_no: (sequences.get(code) || 0) + 1, metadata_status: 'imported', ...action.values };
      }
      const merged = { ...existing, ...action.values };
      sequences.set(code, Math.max(sequences.get(code) || 0, Number(merged.sequence_no) || 0));
      const start = merged.folio_start; const end = merged.folio_end;
      const pages: CatalogRow[] = bundle.turots_pages || [];
      const hasPageRangeColumn = Object.hasOwn(row, 'title_page_ranges');
      const explicitPageRanges = hasPageRangeColumn && Boolean(row.title_page_ranges?.trim()) && row.title_page_ranges?.trim() !== '#HAPUS';
      const clearPageRanges = hasPageRangeColumn && row.title_page_ranges?.trim() === '#HAPUS';
      const legacyRangeChanged = !hasPageRangeColumn && (!existing || 'folio_start' in action.values || 'folio_end' in action.values || !!row.title_folio_start?.trim() || !!row.title_folio_end?.trim());
      const currentPageOrders = pages.filter(page=>page.text_unit_id===existing?.id).map(page=>Number(page.page_order));
      if (clearPageRanges) {
        if (currentPageOrders.length || existing) {
          action.folios = { clear: true };
          action.changes.push({ field: 'pemetaan foto', before: formatPhotoPageRanges(currentPageOrders), after: 'kosong' });
          action.kind = existing ? 'update' : action.kind;
        }
      } else if (explicitPageRanges) {
        const numericRanges = parsePhotoPageRanges(row.title_page_ranges);
        if (!numericRanges.length) throw new Error('Isi rentang halaman foto, misalnya 1-100;101-174.');
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
      } else if (legacyRangeChanged && (start || end)) {
        const numericRanges = imageRanges(start,end);
        if (numericRanges) {
          for (let rangeIndex = 0; rangeIndex < numericRanges.length; rangeIndex += 1) {
            const [first, last] = numericRanges[rangeIndex];
            if (numericRanges.slice(0, rangeIndex).some(([priorFirst, priorLast]) => first <= priorLast && last >= priorFirst)) throw new Error('Rentang foto saling bertumpang tindih.');
            if (pages.length && (!pages.some(p => Number(p.page_order) === first) || !pages.some(p => Number(p.page_order) === last))) throw new Error('Rentang foto melebihi daftar foto bendel atau batas awal/akhirnya tidak ditemukan.');
            const selected = pages.filter(page => Number(page.page_order) >= first && Number(page.page_order) <= last);
            for (const page of selected) {
              const pageKey = page.id || `${code}:${page.page_order}`;
              if ((page.text_unit_id && page.text_unit_id !== existing?.id) || (claimedPages.has(pageKey) && claimedPages.get(pageKey) !== key)) throw new Error(`Foto urutan ${page.page_order} sudah dipakai judul lain atau bertabrakan dalam Excel.`);
              claimedPages.set(pageKey, key);
            }
          }
          if(!pages.length) plan.warnings.push(`Judul baris ${index+2}: metadata judul disimpan, tetapi foto belum terdaftar di katalog. Impor ulang lembar Foto setelah URL foto tersedia.`);
          action.folios = { ranges: numericRanges };
          action.changes.push({ field: 'pemetaan foto', before: existing ? 'Pemetaan lama' : null, after: `${numericRanges.map(([a,b]) => `${a}-${b}`).join('; ')} foto` });
          if (existing) action.kind = 'update';
        } else if (start || end) {
          plan.warnings.push(`Judul baris ${index + 2}: folio naskah ${start || '—'}–${end || '—'} disimpan sebagai metadata. Pemetaan foto hanya memakai nomor urutan pada title_page_ranges, misalnya 1-174.`);
        }
      } else if (!existing) plan.warnings.push(`Judul baris ${index + 2}: belum dipetakan ke foto; isi title_page_ranges setelah foto terdaftar.`);
      plan.actions.push(action);
    } catch (error) { plan.errors.push(`Judul baris ${index + 2}: ${(error as Error).message}`); }
  });
  const projectedUnits = units.map(unit => ({ ...unit }));
  for (const action of plan.actions.filter(action => action.sheet === 'Judul')) {
    const index = projectedUnits.findIndex(unit => unit.display_id === action.key);
    const projectedUnit = { ...(index < 0 ? {} : projectedUnits[index]), ...action.values, display_id: action.key, bundle_code: action.code };
    if (index < 0) projectedUnits.push(projectedUnit); else projectedUnits[index] = projectedUnit;
  }
  for (const action of plan.actions.filter(action => action.sheet === 'Judul' && (action.kind === 'create' || 'sequence_no' in action.values))) {
    const sequence = projectedUnits.find(unit => unit.display_id === action.key)?.sequence_no;
    if (projectedUnits.some(unit => unit.bundle_code === action.code && unit.display_id !== action.key && unit.sequence_no === sequence)) plan.errors.push(`Judul baris ${action.row}: urutan ${sequence} sudah dipakai judul lain pada bendel ${action.code}.`);
  }
  if (!plan.actions.some(action=>action.kind!=='skip') && !plan.errors.length) plan.errors.push('Tidak ada baris metadata. Isi lembar Bendel atau Judul terlebih dahulu.');
  return plan;
}
