# Pemetaan metadata spreadsheet ke Turots v1.0.0

Model baru sengaja tidak menyimpan satu baris spreadsheet sebagai satu manuskrip secara otomatis. Satu baris harus dipahami berdasarkan tiga tingkat:

```text
Koleksi → Bendel → Unit teks/judul → Halaman/Canvas
```

## Pemetaan inti

| Kolom spreadsheet | Tabel/kolom v1 | Catatan |
|---|---|---|
| Kode Proyek | `turots_collections.source_project` | DREAMSEA, NT, EAP, dan seterusnya |
| Kode Koleksi / nama koleksi | `turots_collections.code`, `.name` | Satu koleksi boleh memiliki banyak bendel |
| ID | `turots_text_units.display_id` | ID unit teks, bukan sekadar ID foto |
| nomor_digitalisasi | `turots_bundles.source_identifier` | Provenance sumber |
| nomor_koleksi | `turots_bundles.bundle_code` | Identitas bendel fisik/digital |
| judul_asli | `turots_text_units.title_original` | Judul dalam aksara sumber |
| Judul Latin SKB 3 Menteri | `turots_text_units.title_latin` | Bentuk transliterasi |
| judul_dari_tim | `turots_text_units.title_from_team` | Judul kerja kuratorial |
| Klasifikasi Keilmuan 1–3 | `turots_text_unit_classifications` | Tiga level klasifikasi, bukan satu string gabungan |
| kategori_ilmu_pesantren | `category_primary/secondary/tertiary` | Kategori pedagogis dapat berbeda dari klasifikasi ilmiah |
| hlm_pemisah | `folio_start`, `folio_end` | Batas unit teks dalam bendel |
| pengarang | `author` | Boleh `Anonymous` atau `Unknown`, jangan dikosongkan tanpa alasan |
| penyalin | `scribe` | Identitas penyalin |
| bahasa | `language` | Gunakan nilai terkendali bila sudah tersedia |
| aksara | `script` | Arab, Pegon, Jawa, Latin, dan seterusnya |
| tahun_penulisan_di_teks | `year_original` | Nilai tekstual apa adanya |
| deskripsi_umum | `description` | Deskripsi kuratorial unit teks |
| kata_kunci | `keywords` | Sementara berupa teks; dapat dinormalisasi kemudian |
| glosarium | `glossary` | Catatan istilah |
| referensi | `references_text` | Rujukan katalog/penelitian; nama internal menghindari reserved word PostgreSQL |
| catatan_catatan | `notes` | Catatan editorial dan peringatan kualitas |
| manuskrip_terkait | `turots_relations` | Relasi eksplisit antar-unit teks |
| tokoh_terkait | tahap berikutnya | Sebaiknya menjadi tabel authority/person |
| nomor halaman dan file foto | `turots_pages` | Satu Canvas = satu baris halaman |

## Aturan pemecahan bendel

1. Satu `nomor_koleksi` menghasilkan satu `turots_bundles`.
2. Setiap judul atau bagian teks yang berbeda menghasilkan satu `turots_text_units`.
3. `hlm_pemisah` wajib dicatat untuk menjelaskan batas unit.
4. Baris yang hanya mendeskripsikan halaman tidak boleh membuat bendel baru.
5. Foto halaman masuk ke `turots_pages` dan terhubung ke unit teks melalui `text_unit_id`.
6. Jika batas unit belum diketahui, gunakan `metadata_status = 'unknown'` dan masukkan alasan ke `notes`.

## Validasi sebelum import

- `display_id` harus unik.
- `bundle_code` harus unik.
- Semua unit teks harus memiliki bendel.
- Semua halaman harus memiliki `page_order` unik dalam bendel.
- `archive_identifier` dan URL sumber wajib disimpan bila sumbernya Archive.org.
- Nilai kosong tidak boleh diterjemahkan otomatis menjadi `tidak ada`; bedakan `unknown`, `not_applicable`, dan kosong.
- Judul dari sumber, transliterasi, dan judul kuratorial harus disimpan di kolom berbeda.
