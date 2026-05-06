import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { SAMPLE_MANUSCRIPTS } from '../constants';
import { Manuscript } from '../types';

export const manuscriptService = {
  async getAll(page: number = 1, limit: number = 20, search: string = ''): Promise<{ data: Manuscript[], total: number }> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('manuscripts').select('*', { count: 'exact' });
      
      if (search) {
        query = query.or(`judul_dari_afiliasi.ilike.%${search}%,judul_dari_tim.ilike.%${search}%,kode_inventarisasi.ilike.%${search}%`);
      }

      const { data, count, error } = await query
        .range((page - 1) * limit, page * limit - 1)
        .order('judul_dari_afiliasi', { ascending: true }); // Order by affiliation title by default

      if (error) throw error;
      return { data: data as Manuscript[], total: count || 0 };
    }

    // Fallback to sample data
    let filtered = [...SAMPLE_MANUSCRIPTS];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(m => 
        m.judul_dari_afiliasi.toLowerCase().includes(s) || 
        m.judul_dari_tim.toLowerCase().includes(s) || 
        m.kode_inventarisasi.toLowerCase().includes(s)
      );
    }
    
    filtered.sort((a, b) => (a.judul_dari_afiliasi || '').localeCompare(b.judul_dari_afiliasi || ''));
    
    return {
      data: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length
    };
  },

  async getById(id: string): Promise<Manuscript | null> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('manuscripts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) return null;
      return data as Manuscript;
    }
    return SAMPLE_MANUSCRIPTS.find(m => m.id === id) || null;
  },

  async upsertMany(manuscripts: Omit<Manuscript, 'id'>[]) {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('manuscripts')
        .upsert(manuscripts, { onConflict: 'kode_inventarisasi' });
      
      if (error) {
        console.error('Upsert error:', error);
        return { error };
      }
      return { data };
    }
    return { error: new Error('Supabase not configured') };
  },

  async update(id: string, updates: Partial<Manuscript>) {
    const supabase = getSupabase();
    console.log('UPDATING MANUSCRIPT:', id, updates);
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('manuscripts')
        .update(updates)
        .match({ id }); // Use match for better compatibility
      
      if (error) {
        console.error('Update error in service:', error);
        throw error;
      }
      return data;
    }
    throw new Error('Supabase not configured or available for update');
  },

  async delete(id: string) {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from('manuscripts')
        .delete()
        .match({ id });
      
      if (error) throw error;
      return true;
    }
    return false;
  }
};
