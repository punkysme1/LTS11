// supabase/functions/list-all-users/index.ts
// Pastikan Anda telah menginstal @supabase/supabase-js di proyek Edge Function Anda
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

serve(async (req) => {
  // --- INI BAGIAN PALING PENTING UNTUK CORS ---
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://turots.qomaruddin.com', // GANTI DENGAN DOMAIN SPESIFIK ANDA! (Untuk produksi)
                                                                 // Jika lokal, bisa juga 'http://localhost:5173'
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Metode yang diizinkan untuk fungsi ini
  };

  // Tangani permintaan OPTIONS (preflight request CORS)
  if (req.method === 'OPTIONS') {
    // Merespons permintaan OPTIONS dengan header CORS yang sesuai
    return new Response('ok', { headers: corsHeaders });
  }
  // --- AKHIR BAGIAN PENTING UNTUK CORS ---


  const authHeader = req.headers.get('Authorization')

  // Verifikasi token pengguna (opsional tapi disarankan untuk keamanan)
  if (!authHeader) {
    return new Response('Unauthorized: Missing Authorization header', { status: 401, headers: corsHeaders }) // Sertakan headers
  }
  const token = authHeader.split(' ')[1]

  // Buat klien Supabase dengan Service Role Key di dalam Edge Function
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    {
      auth: {
        persistSession: false,
      },
    }
  )

  // Verifikasi user adalah admin (SANGAT PENTING untuk keamanan)
  // Ganti 'YOUR_ADMIN_UID_HERE' dengan UID admin Anda yang sebenarnya
  const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
  if (userError || !user || user.id !== '91f184ea-88c1-4b32-adfa-55901ef23db9') { // GANTI INI DENGAN ID ADMIN ANDA!
    console.error('Edge Function Forbidden access attempt by user:', user?.id, 'Error:', userError);
    return new Response('Forbidden: Only admin can perform this action', { status: 403, headers: corsHeaders }) // Sertakan headers
  }

  // Logika utama fungsi (listing users dan user_profiles)
  try {
    const { data: authUsers, error: listUsersError } = await supabaseClient.auth.admin.listUsers()
    if (listUsersError) {
      console.error('Edge Function Error listing auth users:', listUsersError)
      return new Response(JSON.stringify({ error: listUsersError.message }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }, // Sertakan headers
        status: 500,
      })
    }

    const { data: user_profiles, error: profilesError } = await supabaseClient.from('user_profiles').select('*')
    if (profilesError) {
      console.error('Edge Function Error fetching user profiles:', profilesError)
      return new Response(JSON.stringify({ error: profilesError.message }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }, // Sertakan headers
        status: 500,
      })
    }
    
    // Kirimkan data gabungan
    return new Response(JSON.stringify({ authUsers: authUsers.users, userProfiles: user_profiles }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }, // Sertakan headers
      status: 200,
    })
  } catch (error: any) {
    console.error('Edge Function unhandled error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error: ' + error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }, // Sertakan headers
      status: 500,
    });
  }
})