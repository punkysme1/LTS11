# Impor dan ekspor metadata Excel

Buka `/admin/manuskrip` dan login sebagai admin Turots. Koneksi database mengikuti `VITE_SUPABASE_URL`; localhost saat ini memakai `https://api.naracode.id`. Fungsi impor katalog harus sudah diperbarui di database dengan migration terbaru di `supabase/migrations` sebelum edit metadata atau impor Excel.

## Alur foto → metadata → URL

1. Unggah foto melalui editor bendel dan tekan **Simpan halaman/foto ke bendel**. Mengunggah berkas saja belum mendaftarkan halaman ke database.
2. Pilih **Ekspor metadata + URL** agar kode bendel dan ID data yang sudah ada ikut terbawa. Untuk memasukkan metadata dari awal, gunakan **Unduh template Excel**.
3. Isi lembar `Bendel` dan `Judul`. Satu bendel dapat mempunyai banyak judul. Gunakan kode bendel yang sama persis pada kedua lembar dan bendel tempat foto disimpan.
4. Pilih **Pilih Excel untuk pratinjau**. Tahap ini hanya membaca data. Pratinjau memperlihatkan baris baru, baris diperbarui, nilai sebelum/sesudah, dan kesalahan berdasarkan nomor baris Excel.
5. Setelah memeriksa perubahan, centang konfirmasi dan tekan **Simpan perubahan ke database**. Jika ada kesalahan validasi, seluruh penyimpanan diblokir.
6. Ekspor kembali untuk mendapatkan UUID dan tautan terbaru. Pilih **Situs ini** untuk URL localhost atau **Situs publik** untuk URL produksi.

## Lembar dan kolom

`Bendel`: satu baris per bendel. Untuk bendel baru, wajib `bundle_bundle_code`, `bundle_collection_name`, `bundle_source_project`. Contoh kode folder Dreamsea: `DS 0097 00057`. Judul bendel menggunakan `bundle_display_title`; kode Dreamsea menggunakan `bundle_bundle_code`.

`Judul`: satu baris per judul. Untuk judul baru, wajib `bundle_bundle_code`, `title_display_id`, `title_title_original`, dan `title_category_primary`. ID judul harus unik di seluruh katalog. `title_sequence_no` boleh dikosongkan untuk nomor urut otomatis. `title_folio_start` dan `title_folio_end` berisi nomor folio yang tertulis di manuskrip (misalnya `1r` dan `10v`). `title_page_ranges` adalah rentang nomor foto pada bendel (misalnya `1-174` atau `1-100;101-174` untuk dua judul).

`Petunjuk`: aturan pengisian dan perilaku penyimpanan.

`Referensi`: kategori resmi dan status metadata yang diterima.

Header teknis harus dipertahankan. Kolom boleh diurutkan ulang atau kolom opsional dihilangkan. Simpan kode, folio, tahun/tanggal sebagai teks. Formula pada lembar impor ditolak: paste sebagai nilai terlebih dahulu. Teks Arab, sel kosong, shared strings, dan XLSX terkompresi didukung.

## Aturan pembaruan

- Kode/ID yang sudah ada akan diperbarui; yang baru akan dibuat. UUID hasil ekspor dipakai untuk menolak perubahan identitas yang tidak sengaja.
- Sel kosong atau kolom tidak disertakan: mempertahankan metadata lama.
- `#HAPUS`: mengosongkan field opsional; tidak berlaku untuk identitas, judul wajib, kategori, status, urutan, atau rentang folio.
- URL bendel/judul dan UUID adalah kolom baca-saja. Foto dikelola melalui editor bendel dan disajikan oleh Cantaloupe.
- `title_page_ranges` diperiksa terhadap foto yang sudah tersimpan. Nomor awal/akhir harus ada; foto yang telah ditautkan ke judul lain tidak diambil alih. Untuk 174 foto, satu judul memakai `1-174`; dua judul dapat memakai `1-100` dan `101-174`. Sel kosong mempertahankan pemetaan, `#HAPUS` melepas pemetaan. Folio tekstual seperti `1r–10v` tetap menjadi metadata manuskrip dan tidak menentukan halaman foto.
- Judul tanpa rentang boleh dibuat untuk penyiapan metadata, dengan catatan bahwa foto belum ditautkan. Untuk mengisi rentang, unggah dan simpan foto terlebih dahulu.
- Bendel baru selalu `draft`. Tautan publik berfungsi setelah publikasi. Tautan admin memerlukan login.
- URL Excel adalah hyperlink, bukan koneksi data langsung. Penyuntingan Excel baru masuk setelah proses impor.

## Kegagalan dan pengujian

Sebelum menulis, aplikasi membaca ulang katalog; perubahan server sejak pratinjau mengharuskan pratinjau ulang. Semua perubahan dalam satu kali penyimpanan dikirim ke fungsi database dalam satu transaksi. Jika ada satu baris yang gagal, seluruh transaksi tersebut dibatalkan dan tidak ada baris dari kiriman itu yang disimpan. Periksa pesan kesalahan, perbaiki sumbernya, lalu buat pratinjau baru sebelum mencoba kembali. Kiriman sebelumnya yang sudah berhasil tetap tersimpan. Jika pemetaan foto gagal, seluruh kiriman yang sama dibatalkan.

`npm run test:metadata` menguji validasi, pelestarian sel kosong, ID, folio, data baru, pratinjau kedaluwarsa, dan kegagalan sebagian dengan writer simulasi.

`npm run test:metadata-browser` memerlukan server Vite pada port 3005, Edge, serta Playwright (lokasi modul dapat diatur melalui `PLAYWRIGHT_MODULE_PATH`). Semua permintaan ke API produksi dimock; pengujian tidak menulis ke server. Hasilnya berada di `test-results/metadata`.

## Format tanpa Archive.org

Template dan ekspor tidak lagi menyertakan `bundle_source_identifier`, `bundle_archive_identifier`, `bundle_item_url`, `bundle_iiif_manifest_url`, `bundle_dreamsea_identifier`, atau `bundle_writing_support`. Excel lama tetap diterima; enam kolom ini diabaikan dengan pemberitahuan. Gunakan `bundle_paper_type` untuk jenis kertas.

Tambah manuskrip sekarang memilih bendel yang sudah ada, lalu mengisi metadata judul dan rentang folio. Pembaca hanya memakai foto yang tersimpan di katalog. Kolom database lama dipertahankan untuk kompatibilitas; pembaruan ini tidak menghapus data produksi.

## Pilihan isian Excel

Template dan ekspor menyediakan dropdown hingga baris 10001 untuk pilihan metadata bendel dan judul. Lembar Referensi berisi nilai setiap kolom. Nilai khusus tetap dapat diketik (misalnya aksara `Arab; Pegon` atau `Ada: keterangan`). Kolom `bundle_institution` dihapus dari format aktif dan diabaikan pada impor lama; gunakan `bundle_affiliation`. Tautan unduhan dari admin selalu memakai situs publik Turots.
