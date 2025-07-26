// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be defined in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true, // Pastikan ini true
        storage: window.localStorage, // Secara eksplisit gunakan local storage
        autoRefreshToken: true, // Pastikan auto refresh token aktif
        detectSessionInUrl: true, // Untuk kasus redirect dari magic link, dll.
    },
});