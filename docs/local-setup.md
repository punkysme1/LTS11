# Setup Turots v1.0.0 pada Supabase lokal

1. Pastikan Docker Desktop aktif.
2. Install Supabase CLI.

Jika Scoop belum terpasang, gunakan instalasi project dependency dari root project Supabase:

```powershell
cd C:\Naracode\Services\Supabase\turots-local
npm install supabase --save-dev
npx.cmd supabase --help
```

Supabase CLI akan dijalankan dengan `npx.cmd`, bukan dengan perintah global `supabase`. Bentuk `.cmd` menghindari pemblokiran `npx.ps1` oleh PowerShell Execution Policy.

3. Jalankan dari PowerShell:

```powershell
.\scripts\setup-turots-local.ps1
```

Jika PowerShell memblokir file `.ps1`, jalankan tanpa mengubah policy permanen:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\scripts\setup-turots-local.ps1
```

Atau hanya untuk sesi PowerShell saat ini:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\setup-turots-local.ps1
```

Untuk sekaligus mendaftarkan user Auth sebagai admin:

```powershell
.\scripts\setup-turots-local.ps1 -AdminUserId 'UUID_USER_SUPABASE'
```

Ambil URL dan anon key dari output `supabase status`, lalu isi `.env`:

```env
VITE_SUPABASE_URL=http://127.0.0.1:30131
VITE_SUPABASE_ANON_KEY=...
```

Sesudah mengisi `.env`, jalankan kembali aplikasi Turots dan uji:

- `/admin` untuk login dan import Manifest.
- `/katalog` untuk melihat data published.
- `/katalog/:id` untuk viewer halaman.
