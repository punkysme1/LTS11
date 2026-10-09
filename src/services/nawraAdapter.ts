import { supabase } from '../lib/supabase';

/** Read-only adapter for Nawra. It deliberately exposes metadata and evidence
 * references, never assumes that metadata is the manuscript image itself. */
export async function searchCatalog(query = '', limit = 20) {
  if (!supabase) return [];
  const { data, error } = await supabase.from('turots_bundles')
    .select('id,bundle_code,display_title,archive_identifier,iiif_manifest_url,turots_collections(name,source_project),turots_text_units(display_id,title_original,title_latin,category_primary,category_secondary,description)')
    .eq('publication_status', 'published').order('updated_at', { ascending: false }).limit(limit);
  if (error) throw error;
  const q = query.trim().toLowerCase();
  return (data ?? []).filter((row: any) => !q || JSON.stringify(row).toLowerCase().includes(q));
}

export async function catalogDetail(id: string) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('turots_bundles').select('*,turots_collections(*),turots_text_units(*),turots_pages(*)').eq('id', id).eq('publication_status', 'published').single();
  if (error) throw error;
  return data;
}

export async function catalogPages(id: string) {
  if (!supabase) return [];
  const { data, error } = await supabase.from('turots_pages').select('*').eq('bundle_id', id).order('page_order');
  if (error) throw error;
  return data ?? [];
}

export const nawraContract = {
  version: '1.0.0',
  scope: 'published',
  operations: ['catalog.search', 'catalog.detail', 'catalog.pages', 'catalog.relations', 'catalog.research', 'catalog.citation'],
  principles: ['metadata_is_not_content', 'unknown_is_not_absence', 'cite_source_and_locator'],
};
