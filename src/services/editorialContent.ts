import { supabase } from '../lib/supabase';

export type EditorialType = 'article' | 'information' | 'announcement';
export type PublicationState = 'draft' | 'published' | 'archived';

export interface EditorialEntry {
  id: string;
  content_type: EditorialType;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image_url: string | null;
  status: PublicationState;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  affiliation: string | null;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  moderated_at: string | null;
}

function requireSupabase() {
  if (!supabase) throw new Error('Layanan Supabase belum dikonfigurasi.');
  return supabase;
}

export async function listPublishedContent(type: EditorialType) {
  const { data, error } = await requireSupabase()
    .from('turots_content')
    .select('id,content_type,slug,title,excerpt,body,cover_image_url,status,featured,published_at,created_at,updated_at')
    .eq('content_type', type)
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('published_at', { ascending: false });
  if (error) throw error;
  return (data || []) as EditorialEntry[];
}

export async function getPublishedContent(type: EditorialType, slug: string) {
  const { data, error } = await requireSupabase()
    .from('turots_content')
    .select('id,content_type,slug,title,excerpt,body,cover_image_url,status,featured,published_at,created_at,updated_at')
    .eq('content_type', type)
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return (data || null) as EditorialEntry | null;
}

export async function listAdminContent(type: EditorialType) {
  const { data, error } = await requireSupabase()
    .from('turots_content')
    .select('*')
    .eq('content_type', type)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data || []) as EditorialEntry[];
}

export async function saveEditorialEntry(entry: Partial<EditorialEntry> & Pick<EditorialEntry, 'content_type' | 'slug' | 'title' | 'body' | 'status'>) {
  const client = requireSupabase();
  const payload = {
    ...entry,
    published_at: entry.status === 'published' ? entry.published_at || new Date().toISOString() : entry.published_at,
    updated_at: new Date().toISOString(),
  };
  const query = entry.id
    ? client.from('turots_content').update(payload).eq('id', entry.id)
    : client.from('turots_content').insert(payload);
  const { error } = await query;
  if (error) throw error;
}

export async function listGuestbook(status?: GuestbookEntry['status']) {
  let query = requireSupabase().from('turots_guestbook').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as GuestbookEntry[];
}

export async function submitGuestbookEntry(entry: Pick<GuestbookEntry, 'name' | 'affiliation' | 'message'>) {
  const { error } = await requireSupabase().from('turots_guestbook').insert({ ...entry, status: 'pending' });
  if (error) throw error;
}

export async function moderateGuestbookEntry(id: string, status: 'accepted' | 'rejected') {
  const client = requireSupabase();
  const { error } = await client.from('turots_guestbook').update({
    status,
    moderated_at: new Date().toISOString(),
  }).eq('id', id);
  if (error) throw error;
}
