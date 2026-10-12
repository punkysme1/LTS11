# Turots v2.0.0

Status: rilis lokal tersimpan; belum dipush ke GitHub.

## Cakupan

- Katalog membedakan metadata bendel sebagai rekod induk dari metadata judul sebagai item yang berada di dalam bendel.
- Halaman bendel menampilkan metadata bendel dan daftar judul; mode baca bendel menyediakan navigasi gambar lengkap dan panel identitas ringkas.
- Admin dapat mengelola metadata bendel dan judul serta memetakan foto ke urutan bendel.
- Layanan unggah IIIF menerima JPEG, PNG, TIFF, dan PDF hingga 95 MiB per berkas. Nama sumber dengan spasi dan tanda kurung diperbolehkan.
- Cantaloupe menyajikan halaman PDF dengan identifier berhalaman (`nama.pdf;N`). Admin meminta jumlah halaman PDF, mengecek halaman awal/akhir, lalu menyiapkan urutan halaman untuk bendel.
- Kode upload service dan tesnya disertakan di `deploy/upload-service/` supaya ikut tersimpan bersama rilis aplikasi.

## Verifikasi

- `npm run build` — lulus.
- `npm run verify:v11` — lulus.
- `npm run test:upload-service` — lulus: autentikasi admin, CORS, tanda tangan JPEG/PDF, nama berkurung, penolakan overwrite, dan keamanan path.
- Build memberi peringatan bahwa chunk utama 520,78 kB; tidak menghalangi build, namun pemecahan bundle dapat dioptimalkan kemudian.

## Catatan operasional

- Frontend tetap dapat dideploy otomatis melalui GitHub dan Cloudflare Pages.
- Upload service berjalan sebagai kontainer terpisah pada host Cantaloupe. Perubahan `deploy/upload-service/` perlu disalin dan image Docker dibangun ulang pada host; jangan menaruh secret Supabase di repositori.
- Nomor halaman PDF ditampilkan sebagai `Halaman PDF N`. Sistem tidak menebak folio `r/v` dan tidak menentukan sendiri batas judul; pemetaan metadata judul tetap dilakukan kurator.
- Tag Git lokal `v2.0.0` menandai snapshot rilis ini. Push tag dilakukan bersama push branch saat siap.
