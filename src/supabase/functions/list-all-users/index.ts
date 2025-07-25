// supabase/functions/list-all-users/index.ts
// Pastikan Anda telah menginstal @supabase/supabase-js di proyek Edge Function Anda
// npm install @supabase/supabase-js (di folder fungsi Edge)
// denoland.com/manual/references/contributing/module_guidelines
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

serve(async (req) => {
  const authHeader = req.headers.get('Authorization')

  // Verifikasi token pengguna (opsional tapi disarankan)
  // Ini memastikan hanya user yang terautentikasi yang bisa memanggil fungsi ini
  if (!authHeader) {
    return new Response('Unauthorized: Missing Authorization header', { status: 401 })
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
    return new Response('Forbidden: Only admin can perform this action', { status: 403 })
  }


  // Lakukan operasi admin: listing users dari auth.users
  const { data: authUsers, error: listUsersError } = await supabaseClient.auth.admin.listUsers()
  if (listUsersError) {
    console.error('Edge Function Error listing auth users:', listUsersError)
    return new Response(JSON.stringify({ error: listUsersError.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  // Lakukan operasi admin: mengambil semua user_profiles
  const { data: user_profiles, error: profilesError } = await supabaseClient.from('user_profiles').select('*')
  if (profilesError) {
    console.error('Edge Function Error fetching user profiles:', profilesError)
    return new Response(JSON.stringify({ error: profilesError.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
  
  // Kirimkan data gabungan
  return new Response(JSON.stringify({ authUsers: authUsers.users, userProfiles: user_profiles }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})