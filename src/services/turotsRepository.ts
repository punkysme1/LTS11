import { supabase } from '../lib/supabase';

export type DraftInput = {
  bundleCode: string; sourceIdentifier: string; archiveIdentifier: string; itemUrl: string;
  manifestUrl: string; title: string; collectionName: string; sourceProject: string;
  provenance?: Array<{ field: string; value: string; source: string; locator?: string; method?: string; confidence?: string; note?: string }>;
  textUnit: { displayId: string; titleOriginal?: string; titleLatin?: string; titleCuratorial?: string; titleFromTeam?: string; categoryPrimary?: string; categorySecondary?: string; categoryTertiary?: string; description?: string; folioStart?: string; folioEnd?: string; author?: string; scribe?: string; language?: string; script?: string; yearOriginal?: string; keywords?: string; glossary?: string; references?: string; notes?: string; [key: string]: any };
  pages: Array<{ canvasId: string; pageOrder: number; label: string; imageUrl?: string; folioLabel?: string; side?: 'recto'|'verso'|'unknown' }>;
};

export async function resolveCollection(name: string, sourceProject: string) {
 if(!supabase)throw new Error('Supabase belum dikonfigurasi.');
 const {data,error}=await supabase.from('turots_collections').select('id').eq('name',name).eq('source_project',sourceProject).maybeSingle();
 if(error)throw error;
 if(data)return data.id;
 const result=await supabase.from('turots_collections').insert({code:sourceProject.toUpperCase()+'-'+name.toUpperCase().replace(/\s+/g,'-'),name,source_project:sourceProject}).select('id').single();
 if(result.error)throw result.error;
 return result.data.id;
}

export async function saveCatalogDraft(input: DraftInput) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
  if(input.bundleCode.trim()!==input.textUnit.displayId.trim())throw new Error('ID manuskrip harus sama dengan ID inventaris yang dimasukkan.');
  const collectionId=await resolveCollection(input.collectionName,input.sourceProject);
  const {data:existing,error:existingError}=await supabase.from('turots_bundles').select('id').eq('bundle_code',input.bundleCode).maybeSingle();
  if(existingError)throw existingError;
  if(existing)throw new Error('Bendel sudah ada. Gunakan Edit agar metadata dan pemetaan halaman tidak tertimpa.');
  const {data:bundle,error:bundleError}=await supabase.from('turots_bundles').insert({collection_id:collectionId,bundle_code:input.bundleCode,display_title:input.title,source_identifier:input.sourceIdentifier||null,archive_identifier:input.archiveIdentifier,item_url:input.itemUrl,iiif_manifest_url:input.manifestUrl,publication_status:'draft',metadata_status:'imported'}).select('id').single();
  if(bundleError)throw bundleError;
  const metadataColumns = ['scholarly_classification_1','scholarly_classification_2','scholarly_classification_3','folio_separator','year_masehi','copying_location','manuscript_origin','cover','cover_size','binding','paper_size','dimensions','watermark','countermark','ink','total_pages','blank_pages','lines_per_page','rubrication','illumination','illustration','marginal_notes','meaning_notes','colophon','marginal_note','physical_condition','readability','completeness','related_manuscripts','related_persons','paper_type','paper_type_other','paper_length_cm','paper_width_cm'];
  const metadata = Object.fromEntries(metadataColumns.map((column) => [column, input.textUnit[column]]));
  const { data: unit, error: unitError } = await supabase.from('turots_text_units').insert({ bundle_id: bundle.id, display_id: input.textUnit.displayId, sequence_no: 1, title_original: input.textUnit.titleOriginal || input.title, title_latin: input.textUnit.titleLatin, title_curatorial: input.textUnit.titleCuratorial, title_from_team: input.textUnit.titleFromTeam, category_primary: input.textUnit.categoryPrimary, category_secondary: input.textUnit.categorySecondary, category_tertiary: input.textUnit.categoryTertiary, description: input.textUnit.description, folio_start: input.textUnit.folioStart, folio_end: input.textUnit.folioEnd, author: input.textUnit.author, scribe: input.textUnit.scribe, language: input.textUnit.language, script: input.textUnit.script, year_original: input.textUnit.yearOriginal, keywords: input.textUnit.keywords, glossary: input.textUnit.glossary, references_text: input.textUnit.references, notes: input.textUnit.notes, ...metadata }).select('id').single();
  if (unitError) throw unitError;
  const pages = input.pages.map((page) => ({ bundle_id: bundle.id, text_unit_id: unit.id, canvas_id: page.canvasId, page_order: page.pageOrder, label: page.label, folio_label: page.folioLabel, side: page.side || 'unknown', image_url: page.imageUrl, thumbnail_url: page.imageUrl }));
  const { error: pagesError } = await supabase.from('turots_pages').upsert(pages, { onConflict: 'bundle_id,page_order' });
  if (pagesError) throw pagesError;
  return { bundleId: bundle.id, textUnitId: unit.id, pageCount: pages.length };
}

export async function listPublishedCatalog() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('turots_bundles').select('*, turots_collections(*), turots_text_units(*), turots_pages(*)').eq('publication_status', 'published').order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function listAdminBundles() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('turots_bundles').select('*, turots_collections(*), turots_text_units(*), turots_pages(*)').order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateBundle(bundleId: string, values: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { data, error } = await supabase.from('turots_bundles').update({ ...values, updated_at: new Date().toISOString() }).eq('id', bundleId).select().single();
  if (error) throw error;
  return data;
}

export async function updateTextUnit(unitId: string, values: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const { data, error } = await supabase.from('turots_text_units').update({ ...values, updated_at: new Date().toISOString() }).eq('id', unitId).select().single();
  if (error) throw error;
  return data;
}
