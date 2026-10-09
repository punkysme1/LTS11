# Turots IIIF Concept

Konsep arsitektur baru Turots berbasis:

- Supabase sebagai database metadata, relasi, penelitian, dan status akses.
- Internet Archive sebagai salah satu sumber citra publik dan Manifest IIIF.
- IIIF Presentation sebagai struktur objek digital: bendel, unit teks, dan halaman.
- Turots sebagai katalog pedagogis untuk santri dan ruang penelitian.
- Nawra sebagai lapisan pencarian dan jawaban berbasis bukti.

Proyek ini sengaja dibuat terpisah dari aplikasi Turots lama. Ia adalah blueprint yang dapat menjadi dasar implementasi ulang setelah struktur database dikonfirmasi.

## Prinsip utama

1. Satu bendel fisik dapat memuat banyak unit teks.
2. Satu unit teks dapat merujuk pada rentang halaman/folio tertentu.
3. Satu halaman digital memiliki identitas dan urutan sendiri.
4. Metadata lama disimpan sebagai sumber impor, bukan langsung dianggap sebagai kebenaran final.
5. Setiap klaim penting dapat diberi sumber, status verifikasi, dan peneliti.
6. IIIF tidak menggantikan Supabase; IIIF menyajikan struktur dan gambar, Supabase menyimpan data kuratorial.

## Struktur konsep

```text
Koleksi
└── Bendel fisik
    ├── Unit teks 1
    │   └── halaman/folio
    ├── Unit teks 2
    │   └── halaman/folio
    └── Penelitian dan relasi
```

## Isi folder

- `docs/concept.md` — konsep produk, UI/UX, dan alur IIIF.
- `docs/data-model.md` — definisi entitas dan pemetaan kolom lama.
- `docs/import-workflow.md` — rencana impor berdasarkan folder.
- `supabase/schema.sql` — skema awal yang dinormalisasi.
- `supabase/seed.sql` — contoh data berdasarkan baris `DS.001`.
- `iiif/sample-manifest.json` — contoh Manifest IIIF Presentation 3.0.
- `src/types.ts` — tipe domain awal untuk implementasi frontend.
- `src/demo-data.ts` — data demo yang menghubungkan Supabase dan IIIF.

## Catatan implementasi

Manifest contoh menggunakan URL placeholder Internet Archive. Setelah identifier item Archive sudah tersedia, URL tersebut diganti dengan Manifest resmi:

```text
https://iiif.archive.org/iiif/IDENTIFIER/manifest.json
```

Foto yang ingin dibatasi tidak boleh diletakkan di item publik Internet Archive. Untuk itu gunakan storage privat dan Manifest yang dilayani oleh backend terautentikasi.

