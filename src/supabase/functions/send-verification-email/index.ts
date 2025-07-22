// supabase/functions/send-verification-email/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SERVICE_ROLE_KEY_SECRET = Deno.env.get('SERVICE_ROLE_KEY_SECRET')

serve(async (req) => {
    // Tangani permintaan OPTIONS (preflight CORS)
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*', // Sesuaikan dengan domain frontend Anda di produksi
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
        })
    }

    let user_id;
    try {
        const requestBody = await req.json();
        user_id = requestBody.user_id;
    } catch (e) {
        console.error('Error parsing request body:', e.message);
        return new Response(JSON.stringify({ error: 'Invalid JSON body or missing user_id.' }), { status: 400 });
    }

    if (!user_id) {
        return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY_SECRET, {
        auth: { autoRefreshToken: false, persistSession: false }
    })

    try {
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(user_id)
        if (userError) throw userError

        const userEmail = userData.user.email
        const userName = userData.user.user_metadata?.full_name || userEmail.split('@')[0]

        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SENDGRID_API_KEY}`
            },
            body: JSON.stringify({
                personalizations: [{ to: [{ email: userEmail }] }],
                from: { email: 'noreply@yourdomain.com', name: 'Manuskrip Sampurnan' },
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

        return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Penting untuk CORS
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.error('Error in Edge Function:', error.message);
        return new Response(JSON.stringify({ error: 'Failed to send verification email.' }), { status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Penting untuk CORS
                'Content-Type': 'application/json'
            }
        })
    }
})