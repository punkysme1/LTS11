# Impor dan ekspor metadata Excel

Buka `/admin/manuskrip` dan login sebagai admin Turots. Koneksi database mengikuti `VITE_SUPABASE_URL`; localhost saat ini memakai `https://api.naracode.id`. Fitur ini tidak memerlukan migrasi database baru.

## Alur foto → metadata → URL

1. Unggah foto melalui editor bendel dan tekan **Simpan halaman/foto ke bendel**. Mengunggah berkas saja belum mendaftarkan halaman ke database.
2. Pilih **Ekspor metadata + URL** agar kode bendel dan ID data yang sudah ada ikut terbawa. Untuk memasukkan metadata dari awal, gunakan **Unduh template Excel**.
3. Isi lembar `Bendel` dan `Judul`. Satu bendel dapat mempunyai banyak judul. Gunakan kode bendel yang sama persis pada kedua lembar dan bendel tempat foto disimpan.
4. Pilih **Pilih Excel untuk pratinjau**. Tahap ini hanya membaca data. Pratinjau memperlihatkan baris baru, baris diperbarui, nilai sebelum/sesudah, dan kesalahan berdasarkan nomor baris Excel.
5. Setelah memeriksa perubahan, centang konfirmasi dan tekan **Simpan perubahan ke database**. Jika ada kesalahan validasi, seluruh penyimpanan diblokir.
6. Ekspor kembali untuk mendapatkan UUID dan tautan terbaru. Pilih **Situs ini** untuk URL localhost atau **Situs publik** untuk URL produksi.

## Lembar dan kolom

`Bendel`: satu baris per bendel. Untuk bendel baru, wajib `bundle_bundle_code`, `bundle_collection_name`, `bundle_source_project`. Contoh kode folder Dreamsea: `DS 0097 00057`. Judul bendel menggunakan `bundle_display_title`; kode Dreamsea dapat dicatat pada `bundle_dreamsea_identifier`.

`Judul`: satu baris per judul. Untuk judul baru, wajib `bundle_bundle_code`, `title_display_id`, `title_title_original`, dan `title_category_primary`. ID judul harus unik di seluruh katalog. `title_sequence_no` boleh dikosongkan untuk nomor urut otomatis. `title_folio_start` dan `title_folio_end` memakai bentuk seperti `1r` dan `10v`.

`Petunjuk`: aturan pengisian dan perilaku penyimpanan.

`Referensi`: kategori resmi dan status metadata yang diterima.

Header teknis harus dipertahankan. Kolom boleh diurutkan ulang atau kolom opsional dihilangkan. Simpan kode, folio, tahun/tanggal sebagai teks. Formula pada lembar impor ditolak: paste sebagai nilai terlebih dahulu. Teks Arab, sel kosong, shared strings, dan XLSX terkompresi didukung.

## Aturan pembaruan

- Kode/ID yang sudah ada akan diperbarui; yang baru akan dibuat. UUID hasil ekspor dipakai untuk menolak perubahan identitas yang tidak sengaja.
- Sel kosong atau kolom tidak disertakan: mempertahankan metadata lama.
- `#HAPUS`: mengosongkan field opsional; tidak berlaku untuk identitas, judul wajib, kategori, status, urutan, atau rentang folio.
- URL, UUID, identifier sumber, URL manifest dan item sumber adalah kolom baca-saja. Foto dan manifest tetap dikelola melalui editor bendel.
- Rentang folio diperiksa terhadap halaman yang sudah terdaftar. Folio awal/akhir harus ada; halaman yang sudah dimiliki judul lain tidak diambil alih. Foto di dalam rentang ditautkan ke judul dan tautan halaman lama di luar rentang dilepas.
- Judul tanpa rentang boleh dibuat untuk penyiapan metadata, dengan catatan bahwa foto belum ditautkan. Untuk mengisi rentang, unggah dan simpan foto terlebih dahulu.
- Bendel baru selalu `draft`. Tautan publik berfungsi setelah publikasi. Tautan admin memerlukan login.
- URL Excel adalah hyperlink, bukan koneksi data langsung. Penyuntingan Excel baru masuk setelah proses impor.

## Kegagalan dan pengujian

Sebelum menulis, aplikasi membaca ulang katalog; perubahan server sejak pratinjau mengharuskan pratinjau ulang. Penyimpanan berjalan per baris, bukan transaksi seluruh workbook. Jika jaringan/database gagal, proses berhenti dan laporan menunjukkan jumlah baris yang selesai serta baris yang gagal. Sebagian perubahan mungkin sudah tersimpan. Pratinjau ulang sebelum mencoba kembali; kode/ID yang sudah tersimpan akan dikenali. Jika metadata judul tersimpan tetapi pemetaan foto gagal, pesan menyebutkan kondisi tersebut.

`npm run test:metadata` menguji validasi, pelestarian sel kosong, ID, folio, data baru, pratinjau kedaluwarsa, dan kegagalan sebagian dengan writer simulasi.

`npm run test:metadata-browser` memerlukan server Vite pada port 3005, Edge, serta Playwright (lokasi modul dapat diatur melalui `PLAYWRIGHT_MODULE_PATH`). Semua permintaan ke API produksi dimock; pengujian tidak menulis ke server. Hasilnya berada di `test-results/metadata`.
