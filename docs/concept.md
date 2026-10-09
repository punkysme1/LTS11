# Konsep Produk Turots Baru

## Tujuan

Turots baru bukan sekadar galeri foto. Ia adalah database kuratorial manuskrip Qomaruddin yang:

- membersihkan metadata dari sumber lama;
- memecah satu bendel menjadi unit teks yang lebih teliti;
- memberi kategori yang berguna bagi santri;
- memperlihatkan hubungan antar-manuskrip;
- menampung hasil penelitian;
- menyediakan bukti yang dapat dibaca Nawra.

## Istilah yang harus dibedakan

| Istilah | Makna |
|---|---|
| Koleksi | Kelompok besar berdasarkan asal/afiliasi |
| Bendel | Objek fisik yang dijilid/disatukan |
| Unit teks | Judul, risalah, fragmen, atau karya di dalam bendel |
| Halaman | Unit digital/foto dengan urutan dan label folio |
| Manifest | Dokumen IIIF yang menjelaskan struktur objek digital |
| Penelitian | Hasil analisis manusia yang merujuk pada satu atau lebih unit |

## Alur pengguna

### Santri

1. Membuka katalog.
2. Memilih kategori keilmuan.
3. Melihat judul, sumber, koleksi, dan ringkasan sederhana.
4. Melihat relasi kitab: matan, syarah, hasyiyah, pelengkap.
5. Melihat beberapa halaman pilihan melalui viewer.

### Peneliti

1. Membuka detail unit teks.
2. Melihat bendel induk dan rentang folio.
3. Membuka Manifest IIIF.
4. Melihat provenance dan status verifikasi.
5. Membaca penelitian yang terkait.
6. Menyalin sitasi permanen.

## Cara kerja UI dan IIIF

```text
Pengguna memilih unit teks
        ↓
Turots mengambil metadata dari Supabase
        ↓
Turots mengambil Manifest/Canvas IIIF
        ↓
Viewer menampilkan thumbnail, label folio, dan preview
        ↓
Panel samping menampilkan metadata, relasi, dan penelitian
```

Halaman detail sebaiknya memiliki empat area:

1. **Identitas** — judul, kode, kategori, afiliasi.
2. **Viewer** — halaman yang diizinkan oleh Manifest.
3. **Konteks** — bendel, unit teks lain, dan relasi.
4. **Penelitian** — ringkasan, peneliti, sumber, dan status verifikasi.

## ID dan nomor

Rumus ID yang diberikan pengguna dapat dipertahankan sebagai **display code**, tetapi sistem juga perlu UUID/database ID yang tidak berubah.

```text
database_id: UUID stabil
display_id: 01.A.04.0001
source_code: DS.001
collection_code: 01.001.1
```

Jika urutan data berubah, UUID tetap sama. Display code dapat dikoreksi melalui proses revisi.

## Klasifikasi

Tiga kolom klasifikasi dapat digunakan sebagai hirarki awal:

```text
Klasifikasi 1: Akidah
Klasifikasi 2: Syarah
Klasifikasi 3: Puisi/terjemah
```

Namun kategori pedagogis pesantren sebaiknya tetap berupa relasi many-to-many agar satu unit dapat masuk lebih dari satu konteks.

