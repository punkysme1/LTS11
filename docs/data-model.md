# Model Data dan Pemetaan Metadata

## Model inti

```text
collection
  └── physical_bundle
        ├── text_unit
        │     ├── text_unit_category
        │     ├── text_unit_page
        │     ├── research_link
        │     └── manuscript_relation
        └── iiif_manifest
```

## Pemetaan kolom sementara

| Kolom lama | Entitas baru | Catatan |
|---|---|---|
| ID | text_unit.display_id | Kode tampilan, bukan primary key |
| Kode Proyek | source_project | DREAMSEA/NT/EAP |
| Kode Koleksi | collection.code | Ndalem, Wasil, dan seterusnya |
| Klasifikasi 1–3 | classification | Dapat dibuat hirarkis |
| Kode H | text_unit.sequence_no | Nomor urut dalam kelompok |
| hlm | text_unit.folio_start/end | Jangan disimpan hanya sebagai teks bebas |
| judul_asli | text_unit.title_original | Judul sebagaimana tercatat |
| Judul Latin SKB 3 Menteri | text_unit.title_latin | Judul normatif/transliterasi |
| nomor_digitalisasi | digitization.source_identifier | Identitas pada sumber digital |
| judul_dari_tim | text_unit.title_curatorial | Judul hasil tim |
| afiliasi | source_affiliation | DREAMSEA/BL/NT atau pemilik |
| nama_koleksi | collection.name | Nama koleksi |
| nomor_koleksi | physical_bundle.shelfmark | Nomor objek fisik |
| pengarang | text_attribution | Kelak menjadi entitas/claim |
| penyalin | text_attribution | Pisahkan dari pengarang |
| bahasa | language | Many-to-many |
| aksara | script | Many-to-many |
| jumlah_halaman | physical_bundle.extent | Bukan selalu jumlah unit teks |
| manuskrip_terkait | manuscript_relation | Jangan berupa teks koma |
| tokoh_terkait | person_link | Jangan berupa teks koma |
| referensi | research/reference | Sumber klaim |

## Status epistemik

Setiap metadata penting perlu memiliki status:

- `imported` — disalin dari katalog lama;
- `curated` — ditata oleh tim Qomaruddin;
- `verified` — diperiksa peneliti/kurator;
- `provisional` — masih dugaan;
- `conflicting` — terdapat perbedaan sumber;
- `unknown` — belum diketahui.

