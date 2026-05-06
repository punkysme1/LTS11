import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('YOUR_SUPABASE_URL')) {
    return null;
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return null;
  }
};

/**
 * Helper to check if Supabase is properly configured
 */
export const isSupabaseConfigured = () => {
  const isConfigured = (
    !!supabaseUrl && 
    supabaseUrl !== 'YOUR_SUPABASE_URL' && 
    supabaseUrl !== 'YOUR_SUPABASE_URL_HERE' &&
    !!supabaseAnonKey && 
    supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
    supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE' &&
    !supabaseAnonKey.includes('MASUKKAN_ANON')
  );
  
  if (!isConfigured) {
    console.warn('Supabase not configured. Using dummy data fallback.');
  } else {
    console.log('Supabase configured successfully using:', supabaseUrl);
  }
  
  return isConfigured;
};

// Export a legacy reference for compatibility, but it might be null initially
export const supabase = getSupabase();
