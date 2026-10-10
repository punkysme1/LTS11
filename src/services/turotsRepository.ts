import { supabase } from '../lib/supabase';

export type DraftInput = {
  bundleTitle?: string; bundleMetadata?: Record<string, unknown>; bundleCode: string; sourceIdentifier: string; archiveIdentifier: string; itemUrl: string;
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
  if(!input.bundleCode.trim()||!input.textUnit.displayId.trim())throw new Error('ID bendel dan ID judul wajib diisi secara terpisah.');
  const collectionId=await resolveCollection(input.collectionName,input.sourceProject);
  const {data:existing,error:existingError}=await supabase.from('turots_bundles').select('id').eq('bundle_code',input.bundleCode).maybeSingle();
  if(existingError)throw existingError;
  if(existing&&(!input.textUnit.folioStart||!input.textUnit.folioEnd))throw new Error('Bendel sudah ada. Isi folio awal dan akhir judul agar halaman tidak tertaut ke judul yang keliru.');
  let bundleId=existing?.id;
  const bundleMetadata=input.bundleMetadata||{};
  if(!bundleId){const {data:bundle,error:bundleError}=await supabase.from('turots_bundles').insert({collection_id:collectionId,bundle_code:input.bundleCode,display_title:input.bundleTitle||input.bundleCode,source_identifier:input.sourceIdentifier||null,archive_identifier:input.archiveIdentifier,item_url:input.itemUrl,iiif_manifest_url:input.manifestUrl,affiliation:input.sourceProject,publication_status:'draft',metadata_status:'imported',...bundleMetadata}).select('id').single();if(bundleError)throw bundleError;bundleId=bundle.id;} else if(Object.keys(bundleMetadata).length){const {error}=await supabase.from('turots_bundles').update(bundleMetadata).eq('id',bundleId);if(error)throw error;}
  const metadataColumns = ['scholarly_classification_1','scholarly_classification_2','scholarly_classification_3','folio_separator','year_masehi','copying_location','manuscript_origin','ink','lines_per_page','rubrication','marginal_notes','meaning_notes','colophon','marginal_note','readability','related_manuscripts','paper_type_other'];
  const metadata = Object.fromEntries(metadataColumns.map((column) => [column, input.textUnit[column]]));
  const {data:sequenceRows,error:sequenceError}=await supabase.from('turots_text_units').select('sequence_no').eq('bundle_id',bundleId).order('sequence_no',{ascending:false}).limit(1);if(sequenceError)throw sequenceError;
  const sequenceNo=(sequenceRows?.[0]?.sequence_no||0)+1;
  const { data: unit, error: unitError } = await supabase.from('turots_text_units').insert({ bundle_id: bundleId, display_id: input.textUnit.displayId, sequence_no: sequenceNo, title_original: input.textUnit.titleOriginal || input.title, title_latin: input.textUnit.titleLatin, title_curatorial: input.textUnit.titleCuratorial, title_from_team: input.textUnit.titleFromTeam, category_primary: input.textUnit.categoryPrimary, category_secondary: input.textUnit.categorySecondary, category_tertiary: input.textUnit.categoryTertiary, description: input.textUnit.description, folio_start: input.textUnit.folioStart, folio_end: input.textUnit.folioEnd, author: input.textUnit.author, scribe: input.textUnit.scribe, language: input.textUnit.language, script: input.textUnit.script, year_original: input.textUnit.yearOriginal, keywords: input.textUnit.keywords, glossary: input.textUnit.glossary, references_text: input.textUnit.references, notes: input.textUnit.notes, ...metadata }).select('id').single();
  if (unitError) throw unitError;
  const attachedCount=existing?await attachFolioRange(bundleId,unit.id,input.textUnit.folioStart!,input.textUnit.folioEnd!):0;
  const pages = input.pages.map((page) => ({ bundle_id: bundleId, text_unit_id: unit.id, canvas_id: page.canvasId, page_order: page.pageOrder, label: page.label, folio_label: page.folioLabel, side: page.side || 'unknown', image_url: page.imageUrl, thumbnail_url: page.imageUrl }));
  if(!existing){const { error: pagesError } = await supabase.from('turots_pages').upsert(pages, { onConflict: 'bundle_id,page_order' });if (pagesError) throw pagesError;}
  return { bundleId, textUnitId: unit.id, pageCount: existing?attachedCount:pages.length };
}

function folioOrdinal(value:string){const match=value.trim().match(/^(\d+)\s*([rv])$/i);return match?Number(match[1])*2+(match[2].toLowerCase()==='v'?1:0):null;}
async function attachFolioRange(bundleId:string,unitId:string,start:string,end:string){
 if(!supabase)throw new Error('Supabase belum dikonfigurasi.');const first=folioOrdinal(start),last=folioOrdinal(end);if(first===null||last===null||last<first)throw new Error('Folio harus memakai format seperti 2r atau 3v–93r.');
 const {data:pages,error}=await supabase.from('turots_pages').select('id,folio_label,text_unit_id').eq('bundle_id',bundleId);if(error)throw error;
 const selected=(pages||[]).filter(page=>{const ordinal=typeof page.folio_label==='string'?folioOrdinal(page.folio_label):null;return ordinal!==null&&ordinal>=first&&ordinal<=last;});
 if(!selected.length)throw new Error(`Tidak ada halaman bernomor di rentang ${start}–${end} pada bendel ini.`);
 if(selected.some(page=>page.text_unit_id&&page.text_unit_id!==unitId))throw new Error(`Rentang ${start}–${end} bertabrakan dengan judul lain. Periksa folio yang sudah dipetakan.`);
 const {error:updateError}=await supabase.from('turots_pages').update({text_unit_id:unitId}).in('id',selected.map(page=>page.id));if(updateError)throw updateError;
 const stale=(pages||[]).filter(page=>page.text_unit_id===unitId&&!selected.some(target=>target.id===page.id));if(stale.length){const {error:detachError}=await supabase.from('turots_pages').update({text_unit_id:null}).in('id',stale.map(page=>page.id));if(detachError)throw detachError;}
 return selected.length;
}

let publishedCatalogCache: { expiresAt: number; promise: Promise<any[]> } | null = null;
export function listPublishedCatalog() {
  if (!supabase) return Promise.resolve([]);
  if (publishedCatalogCache && publishedCatalogCache.expiresAt > Date.now()) return publishedCatalogCache.promise;
  const promise = (async () => {
    const { data, error } = await supabase.from('turots_bundles')
      .select('id,bundle_code,display_title,updated_at,turots_collections(name,source_project),turots_text_units!inner(id,sequence_no,display_id,title_original,title_latin,title_curatorial,description,category_primary,author,scribe,related_persons,language,script,completeness,metadata_status),turots_pages(id,bundle_id,text_unit_id,page_order,thumbnail_url)')
      .eq('publication_status', 'published')
      .eq('turots_text_units.metadata_status','imported')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data || [];
  })();
  publishedCatalogCache = { expiresAt: Date.now() + 10_000, promise };
  void promise.catch(() => { if (publishedCatalogCache?.promise === promise) publishedCatalogCache = null; });
  return promise;
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

export async function updateTextUnitFolioRange(bundleId:string,unitId:string,start:string,end:string){await attachFolioRange(bundleId,unitId,start,end);}
