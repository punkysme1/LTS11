# Turots v1.1.0 — implementasi dan hasil verifikasi
Tanggal: 4 Oktober 2026.

Status: implementasi tersedia di http://localhost:3005. Pemeriksaan build, komponen kategori, dan database lulus. QA login admin masih memerlukan akun admin yang tersedia.

## Implementasi
- Entry aktif: src/AppV11.tsx.
- Beranda baru, sidebar desktop, navigasi bawah mobile: Beranda, Katalog, Favorit, Profil.
- Grid katalog per unit teks; URL detail memakai UUID bendel dan ID unit.
- Pencarian, kategori tunggal 19 pilihan, koleksi, bahasa, aksara, status metadata, urutan, pagination 12 unit.
- Filter dan pagination masih client-side; tidak diklaim sebagai pencarian database berskala besar.
- Favorit lokal di browser, profil perpustakaan (bukan akun pembaca).
- Detail: pemilihan unit, 31 halaman pada data lokal ds-004, zoom gambar 50–300%, scroll, tautan Manifest IIIF, metadata lipat.
- Viewer menggunakan gambar, belum tiled deep zoom/IIIF Image API penuh.
- CategorySelect pada form tambah/edit: 19 pilihan, nilai lama tak dikenal ditandai untuk pemetaan.
- Alur edit metadata memakai route khusus per unit teks (`/admin/manuskrip/:id/edit`) agar konteks manuskrip tidak tercampur.
- Daftar admin diringkas menjadi baris ID, judul, dan aksi; tombol Edit/Hapus/Publish sejajar pada desktop dan tetap adaptif pada mobile.
- Tombol Logout mengakhiri sesi Supabase dan tersedia dari katalog serta halaman editor.
- Penghapusan unit meminta konfirmasi dan hanya menargetkan unit teks terpilih.
- Perbaikan pemetaan metadata baru dari form ke repository.
- Data kategori kedua/ketiga lama dipertahankan; tidak lagi ditawarkan sebagai kategori publik.
- Migration 20261003170000_turots_v11_categories.sql diterapkan lokal dan dicatat di supabase_migrations.
- Tabel kategori 19 nilai, FK category_primary tervalidasi, index kategori.
- Kategori utama dan nomor mengikuti rumus Excel: Siroh 01, Sejarah 02, Fikih 03, Akidah 04, Quran 05, Hadis 06, Falak 07, Nahwu 08, Shorof 09, Ilmu alat 10, Akhlaq 11, Khutbah 12, Doa 13, Fatwa 14, Surat 15, Primbon 16, Mantiq 17, Maulid 18, Matematika 19.
- Kode inventaris otomatis `PP.KK.CC.NNNN`, dengan proyek Dreamsea/NT/EAP, koleksi A–F, kategori 01–19, dan nomor urut 0001–9999.
- Judul asli dipisahkan secara eksplisit dari nama folder foto/Archive Identifier.
- Kategori 2 dan 3 opsional; form metadata bertahap menyediakan bahasa, aksara, kover, ukuran P × L cm, jumlah lembar, fitur fisik, kondisi, catatan berulang, tag, glosarium, referensi berulang, mention manuskrip, dan mention tokoh.
- Tombol Sumber Archive.org di detail dihapus; tautan Manifest IIIF tetap tersedia di kontrol viewer.
- Slug detail memakai slug judul tersimpan dengan fallback UUID; trigger database menjaga keunikan slug.
- Vite server dan preview strictPort 3005. Server duplikat PID 10624 di 3007 dihentikan.

## Bukti pengujian
- npm run verify:v11: lulus render dropdown, 19 nilai unik + placeholder, pilihan aktif, legacy value disabled, kedua form dan konfigurasi port.
- npm run build: lulus.
- npm run verify:v1: lulus setelah perapian daftar admin.
- npm run verify:nawra: lulus pemeriksaan kontrak statis; bukan uji jaringan Nawra.
- SQL lokal: 19 kategori; constraint convalidated=true; kategori ilegal ditolak dengan foreign_key_violation tanpa mengubah metadata pengguna.
- Browser localhost:3005: beranda baru, katalog Fikih 1 unit, Akidah 0 unit, filter lanjutan, tambah favorit dan halaman favorit, detail UUID dan 31 halaman terlihat.
- Startup kedua di 3005: berhenti dengan "Port 3005 is already in use"; tidak bergeser port.
- Browser localhost:3005 sebelumnya memperlihatkan filter, favorit, detail 31 halaman, unit teks, dan zoom; setelah perubahan metadata, browser perlu dimuat ulang untuk QA visual terbaru.
- Login dan simpan admin belum diuji dengan akun admin nyata.

## Pekerjaan tersisa
1. Jalankan QA visual terbaru desktop/mobile dan uji simpan/hapus admin dengan akun terautentikasi.
2. Pencarian/pagination server-side dan payload katalog ringkas.
3. Viewer tiled IIIF, anotasi, sitasi, relasi dan penelitian.
4. Import massal, transaksi penyimpanan atomik, validasi publikasi dan audit log.
5. Normalisasi bahasa/aksara serta kurasi metadata contoh yang masih berisi nilai uji.
6. Sinkronisasi favorit per akun jika diperlukan.

## Arah sesi berikutnya
- Rancang dan implementasikan unggah massal melalui Excel dengan validasi, pratinjau, pemetaan kolom, dan laporan baris gagal.
- Diskusikan keputusan autentikasi: login admin, pendaftaran/undangan, peran, serta akun pembaca.
- Lanjutkan fitur lain setelah skema impor dan model akses disepakati.

Desain acuan: design-concepts/unified-product-flow.png dan desktop-product-flow.png. Implementasi memakai arah visual tersebut; kesetiaan visual belum disahkan melalui screenshot QA.
