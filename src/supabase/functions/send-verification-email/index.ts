// supabase/functions/send-verification-email/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Pastikan semua variabel ini telah diatur melalui `supabase secrets set`
const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SERVICE_ROLE_KEY_SECRET = Deno.env.get('SERVICE_ROLE_KEY_SECRET')

// Header untuk menangani CORS, sudah benar.
const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Ganti dengan domain frontend Anda di produksi
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
    // Menangani preflight request dari browser
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { user_id } = await req.json(); // Memastikan client mengirim body: { "user_id": "..." }
        if (!user_id) {
            throw new Error('User ID is required in the request body.');
        }

        // Menggunakan service_role key untuk akses admin, sudah benar.
        const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY_SECRET, {
            auth: { autoRefreshToken: false, persistSession: false }
        })

        // Mengambil data email pengguna berdasarkan user_id, sudah benar.
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(user_id)
        if (userError) throw userError

        const userEmail = userData.user.email
        // Fallback jika nama lengkap tidak ada di metadata, sudah bagus.
        const userName = userData.user.user_metadata?.full_name || userEmail.split('@')[0]

        // **BAGIAN PALING KRUSIAL UNTUK DIPERIKSA**
        // Alamat email 'from' ini HARUS sudah diverifikasi di akun SendGrid Anda.
        const fromEmail = 'noreply@yourdomain.com' // GANTI DENGAN EMAIL TERVERIFIKASI ANDA
        const fromName = 'Manuskrip Sampurnan'

        // Memanggil API SendGrid untuk mengirim email
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SENDGRID_API_KEY}`
            },
            body: JSON.stringify({
                personalizations: [{ to: [{ email: userEmail }] }],
                from: { email: fromEmail, name: fromName },
                subject: 'Pendaftaran Akun Berhasil Diverifikasi!',
                content: [{
                    type: 'text/html',
                    value: `
                        <p>Halo ${userName},</p>
                        <p>Kabar gembira! Akun Anda di Galeri Manuskrip Sampurnan telah berhasil diverifikasi oleh admin.</p>
                        <p>Anda sekarang dapat login dan mengakses semua fitur yang tersedia untuk pengguna terverifikasi.</p>
                        <p>Terima kasih atas partisipasi Anda.</p>
                        <br>
                        <p>Salam Hormat,</p>
                        <p>Tim Galeri Manuskrip Sampurnan</p>
                    `
                }]
            })
        })

        if (!response.ok) {
            // Jika SendGrid menolak, log errornya untuk debugging
            const errorData = await response.json();
            console.error('SendGrid API Error:', JSON.stringify(errorData, null, 2));
            throw new Error(`Failed to send email via SendGrid: ${response.status} ${response.statusText}`);
        }

        // Mengirim respons sukses ke client
        return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error('Error in Edge Function:', error.message);
        // Mengirim respons error ke client
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        })
    }
})