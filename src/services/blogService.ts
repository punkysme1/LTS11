import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { SAMPLE_BLOGS } from '../constants';
import { BlogPost } from '../types';

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    }
    return SAMPLE_BLOGS;
  },

  async getById(id: string): Promise<BlogPost | null> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) return null;
      return data as BlogPost;
    }
    return SAMPLE_BLOGS.find(b => b.id === id) || null;
  },

  async create(blog: Omit<BlogPost, 'id'>): Promise<BlogPost | null> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([blog])
        .select()
        .single();
      if (error) throw error;
      return data as BlogPost;
    }
    return null;
  },

  async update(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as BlogPost;
    }
    return null;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    }
    return false;
  }
};
