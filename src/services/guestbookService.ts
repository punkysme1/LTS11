import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { SAMPLE_GUESTBOOK } from '../constants';
import { GuestbookEntry } from '../types';

export const guestbookService = {
  async getAll(): Promise<GuestbookEntry[]> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as GuestbookEntry[];
    }
    return SAMPLE_GUESTBOOK;
  },

  async addEntry(entry: Omit<GuestbookEntry, 'id'>): Promise<GuestbookEntry | null> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('guestbook')
        .insert([entry])
        .select()
        .single();
      
      if (error) throw error;
      return data as GuestbookEntry;
    }
    
    console.warn('Supabase not configured, entry not saved to database');
    return { ...entry, id: Math.random().toString() } as GuestbookEntry;
  }
};
