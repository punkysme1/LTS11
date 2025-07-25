import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be defined in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// PENTING UNTUK PRODUKSI:
// Operasi administratif Supabase (misalnya, `supabase.auth.admin.listUsers()`,
// `supabase.auth.admin.createUser()`, `supabase.from('user_profiles').insert()` jika hanya admin)
// TIDAK BOLEH DILAKUKAN DARI SISI KLIEN (FRONTEND) menggunakan Service Role Key.
//
// Service Role Key adalah rahasia dan HARUS TETAP DI SISI SERVER.
//
// Untuk melakukan operasi admin dari aplikasi frontend Anda secara aman,
// Anda HARUS MENGGUNAKAN SUPABASE EDGE FUNCTIONS.
// Panggil Edge Function dari frontend, dan Edge Function tersebut yang akan
// menggunakan Service Role Key untuk berinteraksi dengan Supabase Admin API.
//
// Oleh karena itu, export `supabaseAdmin` DIHAPUS UNTUK DEPLOYMENT PRODUKSI.