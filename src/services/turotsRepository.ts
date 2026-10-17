import { parsePhotoPageRanges } from './pageRanges';
import { supabase } from '../lib/supabase';
import { resolveCatalogCollection } from './collectionResolver';

type CatalogRow = { b: any; u: any; id: string; kind: 'bundle' | 'title' };

async function fetchAllRows<T>(buildQuery: (from: number, to: number) => any, pageSize = 1000): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await buildQuery(from, from + pageSize - 1);
    if (error) throw error;
    rows.push(...((data || []) as T[]));
    if ((data || []).length < pageSize) return rows;
  }
}

export function formatCatalogRpcError(error: { code?: string; message?: string } | null | undefined, action: string) {
  const message = error?.message || 'Kesalahan server yang tidak diketahui.';
  if (/column reference "bundle_id" is ambiguous/i.test(message)) {
    return `Perubahan belum disimpan. Fungsi impor database masih memakai versi yang bentrok. Terapkan migration 20261016150000_fix_turots_catalog_import_bundle_id_ambiguity.sql lalu coba lagi.`;
  }
  if (/column reference "key_name" is ambiguous/i.test(message)) {
    return `Perubahan belum disimpan. Fungsi impor database masih memakai versi yang bentrok. Terapkan migration 20261016140000_fix_turots_catalog_import_key_name_ambiguity.sql lalu migration bundle_id terbaru.`;
  }
  if (/column reference "op" is ambiguous/i.test(message)) {
    return `Perubahan belum disimpan. Database belum memakai perbaikan fungsi impor terbaru. Terapkan berurutan migration 20261016130000, 20261016140000, dan 20261016150000, kemudian coba lagi.`;
  }
  if (error?.code === '42501') return 'Akses ditolak. Masuk kembali menggunakan akun admin Turots.';
  if (error?.code === 'PGRST202') return `Fungsi database untuk ${action} belum tersedia di schema cache. Pastikan migration terkait sudah diterapkan dan schema cache dimuat ulang.`;
  return `${action}: ${message}`;
}

export type DraftInput = {
  bundleTitle?: string; bundleMetadata?: Record<string, unknown>; bundleCode: string; sourceIdentifier?: string; archiveIdentifier?: string; itemUrl?: string;
  manifestUrl?: string; title: string; collectionName: string; sourceProject: string; photoPageRanges?: string;
  provenance?: Array<{ field: string; value: string; source: string; locator?: string; method?: string; confidence?: string; note?: string }>;
  textUnit: { displayId: string; titleOriginal?: string; titleLatin?: string; titleCuratorial?: string; titleFromTeam?: string; categoryPrimary?: string; categorySecondary?: string; categoryTertiary?: string; description?: string; folioStart?: string; folioEnd?: string; author?: string; scribe?: string; language?: string; script?: string; yearOriginal?: string; keywords?: string; glossary?: string; references?: string; notes?: string; [key: string]: any };
  pages: Array<{ canvasId: string; pageOrder: number; label: string; imageUrl?: string; folioLabel?: string; side?: 'recto'|'verso'|'unknown' }>;
};

export async function resolveCollection(name: string, sourceProject: string) {
 if(!supabase)throw new Error('Supabase belum dikonfigurasi.');
 return resolveCatalogCollection(supabase, name, sourceProject);
}

export async function saveCatalogDraft(input: DraftInput) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
  if(!input.bundleCode.trim()||!input.textUnit.displayId.trim())throw new Error('ID bendel dan ID judul wajib diisi secara terpisah.');
  const {data:existing,error:existingError}=await supabase.from('turots_bundles').select('id').eq('bundle_code',input.bundleCode).maybeSingle();
  if(existingError)throw existingError;
  const activeTitleIds=new Set<string>();
  if(existing){
    const {data:activeUnits,error:unitsError}=await supabase.from('turots_text_units').select('id').eq('bundle_id',existing.id).is('archived_at',null);
    if(unitsError)throw unitsError;
    (activeUnits||[]).forEach(unit=>activeTitleIds.add(unit.id));
    existing.turots_pages=await fetchAllRows<any>((from,to)=>supabase.from('turots_pages').select('id,page_order,folio_label,text_unit_id').eq('bundle_id',existing.id).order('page_order').range(from,to));
  }
  const bundleMetadata=input.bundleMetadata||{};
  const metadataColumns = ['scholarly_classification_1','scholarly_classification_2','scholarly_classification_3','folio_separator','year_masehi','copying_location','manuscript_origin','ink','lines_per_page','rubrication','marginal_notes','meaning_notes','colophon','marginal_note','readability','related_manuscripts','paper_type_other'];
  const metadata = Object.fromEntries(metadataColumns.map((column) => [column, input.textUnit[column]]));
  const titleValues = {
    title_original: input.textUnit.titleOriginal || input.title,
    title_latin: input.textUnit.titleLatin,
    title_curatorial: input.textUnit.titleCuratorial,
    title_from_team: input.textUnit.titleFromTeam,
    category_primary: input.textUnit.categoryPrimary,
    category_secondary: input.textUnit.categorySecondary,
    category_tertiary: input.textUnit.categoryTertiary,
    description: input.textUnit.description,
    folio_start: input.textUnit.folioStart,
    folio_end: input.textUnit.folioEnd,
    author: input.textUnit.author,
    scribe: input.textUnit.scribe,
    language: input.textUnit.language,
    script: input.textUnit.script,
    year_original: input.textUnit.yearOriginal,
    keywords: input.textUnit.keywords,
    glossary: input.textUnit.glossary,
    references_text: input.textUnit.references,
    notes: input.textUnit.notes,
    metadata_status: 'imported',
    ...metadata,
  };
  const operations: Array<Record<string, unknown>> = [];
  if (!existing) operations.push({
    sheet: 'Bendel', row: 0, code: input.bundleCode, key: input.bundleCode, values: {
      display_title: input.bundleTitle || input.bundleCode,
      affiliation: input.sourceProject,
      metadata_status: 'imported',
      source_identifier: input.sourceIdentifier,
      archive_identifier: input.archiveIdentifier,
      item_url: input.itemUrl,
      iiif_manifest_url: input.manifestUrl,
      ...bundleMetadata,
    },
    collection: { name: input.collectionName, project: input.sourceProject },
    photos: input.pages.map(page => ({
      canvas_id: page.canvasId, page_order: page.pageOrder, label: page.label,
      folio_label: page.folioLabel || page.label, side: page.side || 'unknown',
      image_url: page.imageUrl, thumbnail_url: page.imageUrl,
    })),
  });

  let folios: { ranges?: Array<[number, number]>; clear?: boolean } | null = null;
  let pageCount = 0;
  const availablePages = existing?.turots_pages || input.pages.map(page => ({ page_order: page.pageOrder, folio_label: page.folioLabel }));
  if (input.photoPageRanges !== undefined) {
    const numericRanges = parsePhotoPageRanges(input.photoPageRanges);
    if (numericRanges.length) {
      if (!availablePages.length) throw new Error('Bendel belum memiliki halaman foto yang tersimpan. Simpan foto ke bendel dahulu.');
      const pageOrders = new Set(availablePages.map(page => Number(page.page_order)));
      for (const [first, last] of numericRanges) {
        if (!pageOrders.has(first) || !pageOrders.has(last)) throw new Error(`Rentang foto ${first}-${last}: nomor halaman awal dan akhir harus ada dalam bendel.`);
        if (availablePages.some(page => Number(page.page_order) >= first && Number(page.page_order) <= last && page.text_unit_id && activeTitleIds.has(page.text_unit_id))) {
          throw new Error(`Rentang foto ${first}-${last} masih digunakan oleh judul aktif lain dalam bendel. Bila ini judul yang sama, buka menu edit pada judul tersebut, bukan Tambah judul.`);
        }
      }
      folios = numericRanges.length ? { ranges: numericRanges } : null;
      pageCount = availablePages.filter(page => numericRanges.some(([first, last]) => Number(page.page_order) >= first && Number(page.page_order) <= last)).length;
    } else if (existing) {
      folios = { clear: true };
    }
  }
  operations.push({ sheet: 'Judul', row: 0, code: input.bundleCode, key: input.textUnit.displayId, values: titleValues, photos: [], folios });
  const { error } = await supabase.rpc('apply_turots_catalog_import', { p_operations: operations });
  if (error) throw new Error(formatCatalogRpcError(error, 'Data tidak disimpan'));
  return { bundleId: existing?.id || input.bundleCode, textUnitId: input.textUnit.displayId, pageCount: pageCount || (existing ? 0 : input.pages.length) };
}

let publishedCatalogCache: { expiresAt: number; promise: Promise<any[]> } | null = null;
export function listPublishedCatalog() {
  if (!supabase) return Promise.resolve([]);
  if (publishedCatalogCache && publishedCatalogCache.expiresAt > Date.now()) return publishedCatalogCache.promise;
  const promise = (async () => {
    const { data, error } = await supabase.from('turots_bundles')
      .select('id,bundle_code,display_title,updated_at,access_level,source_identifier,turots_collections(name,source_project),turots_text_units(id,sequence_no,display_id,slug,title_original,title_latin,title_curatorial,description,category_primary,author,scribe,related_persons,language,script,completeness,metadata_status,folio_start,folio_end),turots_pages(id,bundle_id,text_unit_id,page_order,thumbnail_url,image_url,access_level)')
      .eq('publication_status', 'published')
      .in('access_level', ['public_preview', 'public_full'])
      .eq('turots_text_units.metadata_status', 'imported')
      .in('turots_pages.access_level', ['public_preview', 'public_full'])
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return (data || []).map((bundle: any) => ({
      ...bundle,
      turots_text_units: (bundle.turots_text_units || []).filter((unit: any) => unit.metadata_status === 'imported'),
      turots_pages: (bundle.turots_pages || []).filter((page: any) => ['public_preview', 'public_full'].includes(page.access_level)),
    }));
  })();
  publishedCatalogCache = { expiresAt: Date.now() + 10_000, promise };
  void promise.catch(() => { if (publishedCatalogCache?.promise === promise) publishedCatalogCache = null; });
  return promise;
}

export async function listPublicCatalogFilterOptions() {
  if (!supabase) return { collections: [], languages: [], scripts: [], completeness: [], persons: [] };
  const { data, error } = await supabase.rpc('get_turots_catalog_filter_options');
  if (error) {
    const rows = await listPublishedCatalog();
    const units = rows.flatMap(bundle => (bundle.turots_text_units || []).filter((unit: any) => !unit.archived_at && unit.metadata_status === 'imported'));
    const values = (items: Array<unknown>) => [...new Set(items.map(value => String(value || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    return {
      collections: values(rows.map(bundle => bundle.turots_collections?.name)),
      languages: values(units.flatMap((unit: any) => String(unit.language || '').split(/[,;|]/))),
      scripts: values(units.flatMap((unit: any) => String(unit.script || '').split(/[,;|]/))),
      completeness: values(units.map((unit: any) => unit.completeness)),
      persons: values(units.flatMap((unit: any) => [unit.author, unit.scribe])),
    };
  }
  return data || { collections: [], languages: [], scripts: [], completeness: [], persons: [] };
}

export async function searchPublishedCatalog(filters: {
  query?: string; category?: string; collection?: string; language?: string;
  script?: string; completeness?: string; person?: string; status?: string;
  sort?: string; offset?: number; limit?: number;
} = {}) {
  if (!supabase) return { rows: [], total: 0 };
  const { data, error } = await supabase.rpc('search_turots_catalog', {
    p_query: filters.query || '', p_category: filters.category || '', p_collection: filters.collection || '',
    p_language: filters.language || '', p_script: filters.script || '', p_completeness: filters.completeness || '',
    p_person: filters.person || '', p_status: filters.status || '', p_sort: filters.sort || 'newest',
    p_offset: filters.offset || 0, p_limit: filters.limit || 12,
  });
  if (error) {
    // Keep the catalogue usable while a deployment is waiting for its new
    // migration; the legacy read path is protected by the existing published RLS.
    const bundles = (await listPublishedCatalog()).filter(bundle => ['public_preview', 'public_full'].includes(bundle.access_level));
    const query = (filters.query || '').trim().toLocaleLowerCase();
    const text = (value: unknown) => String(value || '').toLocaleLowerCase();
    const split = (value: unknown) => String(value || '').split(/[,;|]/).map(item => item.trim().toLocaleLowerCase());
    const rows: CatalogRow[] = [];
    for (const bundle of bundles) {
      const activeUnits = (bundle.turots_text_units || []).filter((unit: any) => !unit.archived_at && unit.metadata_status === 'imported');
      const collection = bundle.turots_collections?.name || '';
      const bundleText = [bundle.display_title, bundle.bundle_code, bundle.source_identifier, collection].map(text).join(' ');
      const bundleMatches = (!query || bundleText.includes(query) || activeUnits.some((unit: any) => [unit.title_original, unit.title_latin, unit.title_curatorial, unit.display_id, unit.author, unit.scribe, unit.related_persons].map(text).join(' ').includes(query)))
        && (!filters.category || filters.category === 'Bendel')
        && (!filters.collection || collection === filters.collection);
      if (bundleMatches) rows.push({ b: bundle, u: {}, id: `bundle-${bundle.id}`, kind: 'bundle' });
      for (const unit of activeUnits) {
        const matches = (!query || [unit.title_original, unit.title_latin, unit.title_curatorial, unit.description, unit.author, unit.scribe, unit.related_persons, unit.display_id, bundle.bundle_code].map(text).join(' ').includes(query))
          && (!filters.category || unit.category_primary === filters.category)
          && (!filters.collection || collection === filters.collection)
          && (!filters.language || split(unit.language).includes(filters.language.toLocaleLowerCase()))
          && (!filters.script || split(unit.script).includes(filters.script.toLocaleLowerCase()))
          && (!filters.completeness || unit.completeness === filters.completeness)
          && (!filters.person || [unit.author, unit.scribe, unit.related_persons].map(text).join(' ').includes(filters.person.toLocaleLowerCase()))
          && (!filters.status || unit.metadata_status === filters.status);
        if (matches) rows.push({ b: bundle, u: unit, id: unit.id, kind: 'title' });
      }
    }
    rows.sort((left, right) => filters.sort === 'judul'
      ? String(left.u.title_latin || left.u.title_original || left.b.display_title || left.b.bundle_code).localeCompare(String(right.u.title_latin || right.u.title_original || right.b.display_title || right.b.bundle_code))
      : String(right.b.updated_at || '').localeCompare(String(left.b.updated_at || '')));
    const offset = Math.max(0, filters.offset || 0);
    const limit = Math.max(1, Math.min(filters.limit || 12, 48));
    return { rows: rows.slice(offset, offset + limit), total: rows.length };
  }
  const result = data || [];
  return { rows: result.map((item: any) => item.entry as CatalogRow), total: Number(result[0]?.total_count || 0) };
}

export async function listMonthlyPopularViews() {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc('get_turots_monthly_popular');
  if (error) throw error;
  return data || [];
}

export async function listAdminBundles() {
  if (!supabase) return [];
  const bundles: any[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabase.from('turots_bundles').select('*, turots_collections(*)').order('updated_at', { ascending: false }).range(offset, offset + 499);
    if (error) throw error;
    bundles.push(...(data || []));
    if ((data || []).length < 500) break;
  }
  const ids = bundles.map(bundle => bundle.id);
  for (const bundle of bundles) {
    bundle.turots_text_units = [];
    bundle.turots_pages = [];
  }
  const byId = new Map(bundles.map(bundle => [bundle.id, bundle]));
  for (let offset = 0; offset < ids.length; offset += 100) {
    const chunk = ids.slice(offset, offset + 100);
    const [units, pages] = await Promise.all([
      fetchAllRows<any>((from, to) => supabase.from('turots_text_units').select('*').in('bundle_id', chunk).order('sequence_no').range(from, to)),
      fetchAllRows<any>((from, to) => supabase.from('turots_pages').select('*').in('bundle_id', chunk).order('page_order').range(from, to)),
    ]);
    for (const unit of units) byId.get(unit.bundle_id)?.turots_text_units.push(unit);
    for (const page of pages) byId.get(page.bundle_id)?.turots_pages.push(page);
  }
  return bundles;
}

export async function archiveCatalogRecord(kind: 'bundle' | 'title', id: string) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { data, error } = await supabase.rpc('archive_turots_catalog_record', { p_kind: kind, p_id: id });
  if (error) throw error;
  return data;
}

export async function getPublishedBundleByCode(code: string) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { data, error } = await supabase.from('turots_bundles')
    .select('id,bundle_code,display_title,updated_at,publication_status,access_level,turots_collections(name,source_project)')
    .eq('bundle_code', code).eq('publication_status', 'published').maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPublishedTitleById(id: string) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { data, error } = await supabase.from('turots_text_units').select('id,bundle_id,display_id,slug,turots_bundles!inner(publication_status,access_level)').eq('id', id).eq('turots_bundles.publication_status','published').in('turots_bundles.access_level',['public_preview','public_full']).maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateBundle(bundleId: string, values: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { data, error } = await supabase.from('turots_bundles').update({ ...values, updated_at: new Date().toISOString() }).eq('id', bundleId).select().single();
  if (error) throw error;
  return data;
}

export async function saveCantaloupePages(bundleId: string, pages: Array<{ canvasId: string; label: string; folioLabel: string; imageUrl: string; checksumSha256?: string }>, sourceListComplete = false) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  if (!pages.length) throw new Error('Tidak ada foto Cantaloupe untuk disimpan.');
  const { data, error } = await supabase.rpc('save_turots_bundle_pages', {
    p_bundle_id: bundleId,
    p_pages: pages.map(page => ({
      canvas_id: page.canvasId,
      label: page.label,
      folio_label: page.folioLabel,
      image_url: page.imageUrl,
      thumbnail_url: page.imageUrl,
      checksum_sha256: page.checksumSha256,
    })),
    p_source_list_complete: sourceListComplete,
  });
  if (error?.code === 'PGRST202' || /could not find the function .*save_turots_bundle_pages/i.test(error?.message || '')) {
    throw new Error('Foto yang tadi berhasil dikirim ke Cantaloupe belum tercatat sebagai halaman bendel. Database Supabase belum memiliki fungsi penyimpanan foto (migration 20261016110000_turots_integrity_hardening.sql belum diterapkan atau schema cache belum diperbarui). Minta pengelola server menerapkan migration tersebut, lalu buka lagi bendel dan tekan “Periksa sumber yang sudah ada” kemudian simpan. Jangan unggah ulang foto.');
  }
  if (error) throw new Error(error.code === '42501' ? 'Akses ditolak. Masuk kembali menggunakan akun admin Turots.' : `Perubahan halaman dibatalkan: ${error.message}`);
  return data as { added: number; updated: number; total: number; missing: number };
}

export async function saveBulkCantaloupePages(
  bundleId: string,
  pages: Array<{ canvasId: string; pageOrder: number; label: string; folioLabel: string; imageUrl: string; checksumSha256?: string }>,
  allowReassignment: boolean,
  bundleExtentPages: number | null,
) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  if (!pages.length) throw new Error('Tidak ada halaman terverifikasi untuk disimpan.');
  const { data, error } = await supabase.rpc('save_turots_bulk_bundle_pages', {
    p_bundle_id: bundleId,
    p_pages: pages.map(page => ({
      canvas_id: page.canvasId,
      page_order: page.pageOrder,
      label: page.label,
      folio_label: page.folioLabel,
      image_url: page.imageUrl,
      thumbnail_url: page.imageUrl,
      checksum_sha256: page.checksumSha256,
    })),
    p_allow_reassignment: allowReassignment,
    p_bundle_extent_pages: bundleExtentPages,
  });
  if (error?.code === 'PGRST202') throw new Error('Fungsi unggah massal belum tersedia di database. Terapkan migration 20261017100000_turots_bulk_photo_upload.sql lalu muat ulang schema cache.');
  if (error) throw new Error(error.code === '42501' ? 'Akses ditolak. Masuk kembali menggunakan akun admin Turots.' : `Penyimpanan massal dibatalkan tanpa perubahan pada bendel ini: ${error.message}`);
  return data as { added: number; updated: number; moved: number; deduplicated: number; total: number; extent_pages: number | null };
}

export async function publishBulkCantaloupeBundle(bundleId: string) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { error: pageError } = await supabase.from('turots_pages')
    .update({ access_level: 'public_preview' }).eq('bundle_id', bundleId);
  if (pageError) throw pageError;
  const { data, error } = await supabase.from('turots_bundles')
    .update({ publication_status: 'published', access_level: 'public_preview', updated_at: new Date().toISOString() })
    .eq('id', bundleId).select('publication_status').single();
  if (error) throw error;
  return data;
}

export async function createCantaloupeBundle(input: { bundleCode: string; displayTitle: string; collectionName: string; sourceProject: string; bundleMetadata: Record<string, unknown>; pages: Array<{ canvasId: string; label: string; folioLabel: string; imageUrl: string; checksumSha256?: string }> }) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const code=input.bundleCode.trim();
  if(!code)throw new Error('Kode bendel wajib diisi.');
  const { error } = await supabase.rpc('apply_turots_catalog_import', {
    p_operations: [{
      sheet: 'Bendel', row: 0, code, key: code,
      values: { display_title: input.displayTitle || code, affiliation: input.sourceProject, metadata_status: 'imported', ...input.bundleMetadata },
      collection: { name: input.collectionName, project: input.sourceProject },
      photos: input.pages.map((page, index) => ({
        canvas_id: page.canvasId, page_order: index + 1, label: page.label, folio_label: page.folioLabel,
        image_url: page.imageUrl, thumbnail_url: page.imageUrl, checksum_sha256: page.checksumSha256,
      })),
    }],
  });
  if (error) throw new Error(formatCatalogRpcError(error, 'Bendel dan foto tidak disimpan'));
  return { bundleId: code, added: input.pages.length, updated: 0, total: input.pages.length, missing: 0 };
}

export async function updateTextUnit(unitId: string, values: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { data, error } = await supabase.from('turots_text_units').update({ ...values, updated_at: new Date().toISOString() }).eq('id', unitId).select().single();
  if (error) throw error;
  return data;
}

export async function updateTextUnitFolioRange(bundleId:string,unitId:string,start:string,end:string){
  const ranges = parsePhotoPageRanges(`${start}${end ? `-${end}` : ''}`);
  if (!ranges.length) throw new Error('Rentang halaman foto harus memakai nomor urutan, misalnya 1-174.');
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const folios = { ranges };
  const { error } = await supabase.rpc('save_turots_title_folio_range', {
    p_bundle_id: bundleId, p_text_unit_id: unitId, p_folios: folios,
  });
  if (error) throw new Error(`Pemetaan halaman tidak diubah: ${error.message}`);
}
