# Workflow Impor Folder ke Internet Archive dan Supabase

## Struktur folder yang disarankan

```text
incoming/
└── DS-001/
    ├── f001r.jpg
    ├── f001v.jpg
    ├── f002r.jpg
    └── f002v.jpg
```

Nama file sebaiknya konsisten agar sistem dapat membaca folio dan recto/verso.

## Tahapan importer

1. Membaca nama folder sebagai `source_identifier` atau `bundle_code`.
2. Membaca nama file dan mengurai folio.
3. Membuat checksum SHA-256.
4. Membuat thumbnail/preview.
5. Membuat atau memperbarui record bendel di Supabase.
6. Membuat record halaman.
7. Mengunggah item publik ke Internet Archive bila telah disetujui.
8. Menyimpan identifier Internet Archive.
9. Mengambil URL Manifest IIIF.
10. Menyimpan URL Manifest ke Supabase.
11. Membuat laporan sukses/gagal dan file yang belum dipetakan.

## Penting

Internet Archive bukan tempat untuk file yang harus privat. Folder yang belum disetujui untuk publikasi harus tetap berada di storage privat.

## Bentuk URL

```text
https://iiif.archive.org/iiif/{archive_identifier}/manifest.json
```

Turots tidak perlu mengunduh ulang semua foto untuk menampilkan Manifest. Turots cukup menyimpan `archive_identifier` dan URL Manifest di database.

