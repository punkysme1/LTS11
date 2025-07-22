// supabase/functions/send-verification-email/index.ts (contoh dengan SendGrid)
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Asumsi Anda punya variabel lingkungan untuk kunci SendGrid API
const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
    const { user_id } = await req.json()

    if (!user_id) {
        return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false }
    })

    try {
        // Ambil email user dari auth.users
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(user_id)
        if (userError) throw userError

        const userEmail = userData.user.email
        const userName = userData.user.user_metadata?.full_name || userEmail.split('@')[0]

        // Kirim email (contoh menggunakan API SendGrid)
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SENDGRID_API_KEY}`
            },
            body: JSON.stringify({
                personalizations: [{ to: [{ email: userEmail }] }],
                from: { email: 'noreply@yourdomain.com', name: 'Manuskrip Sampurnan' }, // Ganti dengan email Anda
                subject: 'Pendaftaran Akun Berhasil Diverifikasi!',
                content: [{
                    type: 'text/html',
                    value: `
                        <p>Halo ${userName},</p>
                        <p>Akun Anda di Galeri Manuskrip Sampurnan telah berhasil diverifikasi oleh admin.</p>
                        <p>Anda sekarang dapat login dan menikmati semua fitur kami.</p>
                        <p>Terima kasih!</p>
                        <p>Salam Hormat,</p>
                        <p>Tim Galeri Manuskrip Sampurnan</p>
                    `
                }]
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error('SendGrid error:', errorData);
            throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
        }

        return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 })

    } catch (error) {
        console.error('Error in Edge Function:', error.message);
        return new Response(JSON.stringify({ error: 'Failed to send verification email.' }), { status: 500 })
    }
})