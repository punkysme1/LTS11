# Turots IIIF v1.0.0 — status implementasi

## Tahap 1 — fondasi data

- Migrasi Supabase lokal tersedia di `Services/Supabase/turots-local/supabase/migrations/20261003090000_turots_v1_catalog.sql`.
- Model memisahkan koleksi, bendel, unit teks, halaman/canvas, klasifikasi, riset, relasi, dan audit.
- Satu bendel dapat memiliki banyak unit teks; satu unit dapat memiliki banyak halaman.

## Tahap 2 — admin dan import Manifest

- `/admin` mengambil Manifest dari identifier Archive.org atau URL Manifest.
- Canvas diubah menjadi daftar halaman dan URL download Archive.org.
- Admin dapat menyimpan draft; setelah Supabase aktif, data masuk ke tabel koleksi, bendel, unit teks, dan halaman.
- Status draft/review/published disimpan terpisah dari `metadata_status`.

## Tahap 3 — katalog dan viewer publik

- `/katalog` hanya membaca record published dari Supabase.
- `/katalog/:id` menampilkan metadata, daftar halaman, viewer gambar, dan tautan sumber Archive.org.
- Saat database belum dikonfigurasi, record demo DS-004 dipakai agar UI tetap dapat diuji.

## Tahap 4 — metadata dan riset

- Kolom inti sudah disediakan untuk judul asli, judul Latin, judul tim, folio, pengarang, penyalin, bahasa, aksara, tahun, klasifikasi bertingkat, kata kunci, glosarium, referensi, dan catatan.
- Tabel riset dan relasi disiapkan untuk hasil penelitian dan konektivitas antarteks.
- Validasi filologis tetap dilakukan manusia; import Manifest tidak dianggap sebagai verifikasi isi.

## Tahap 5 — kontrak Nawra

- `docs/nawra-contract-v1.json` mendefinisikan operasi pencarian, detail, halaman, relasi, riset, dan sitasi.
- `src/services/nawraAdapter.ts` menyediakan fungsi baca terstruktur dari tabel published.
- Supabase Edge Function `nawra-catalog` menyediakan endpoint HTTP `catalog.search` dan `catalog.detail` dengan envelope kontrak Nawra v1.
- Prinsip kontrak: metadata bukan isi manuskrip, `unknown` bukan ketiadaan, dan setiap temuan perlu sumber/lokator.

## Yang masih harus dilakukan sebelum rilis produksi

1. Jalankan migrasi dan seed pada Supabase lokal, lalu isi `.env` dengan URL dan anon key.
   Script bootstrap tersedia di `scripts/setup-turots-local.ps1`.
2. Daftarkan akun admin pada tabel `turots_admins`; migration hardening sudah mengganti policy sementara `authenticated` dengan pemeriksaan roster admin.
3. Tambahkan form lengkap untuk seluruh kolom fisik/filologis lanjutan dan editor relasi/riset.
4. Tambahkan audit log otomatis, validasi kode Turots, dan pencegah duplikasi lintas sumber.
5. Putuskan kebijakan akses gambar: preview publik, full melalui Archive.org, atau private/researcher.
6. Uji dengan sampel nyata minimal 10 bendel dari Dreamsea, British Library, dan Nahdlatut Turots.
7. Untuk Nawra produksi, bungkus adapter menjadi API server/authenticated endpoint sesuai deployment Nawra.
