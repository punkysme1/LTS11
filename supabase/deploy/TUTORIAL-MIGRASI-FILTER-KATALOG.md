# Tutorial menerapkan migrasi filter katalog Turots

Migrasi ini menambah filter Afiliasi dan memperbarui fungsi pencarian katalog. Panduan memakai pola deploy sebelumnya: transfer dengan SCP dari PowerShell, lalu jalankan skrip di ThinkPad melalui SSH. Skrip membuat dan memvalidasi backup database sebelum menjalankan SQL, lalu memuat ulang schema PostgREST.

## 1. PowerShell Windows: salin paket ke ThinkPad

Jalankan dari PowerShell pada komputer ini:

```powershell
$package = "D:\Qomaruddin Database\Apps\Qomaruddin\turots-iiif-concept\supabase\deploy"
scp -r "$package" "nara@100.119.237.85:/home/nara/turots-catalog-filter-migration"
```

Jika `scp` meminta konfirmasi host key, pastikan fingerprint cocok dengan server ThinkPad yang biasa digunakan sebelum menjawab `yes`.

## 2. SSH ThinkPad: terapkan migrasi

```powershell
ssh nara@100.119.237.85
```

Setelah masuk ke shell ThinkPad:

```bash
sudo bash /home/nara/turots-catalog-filter-migration/apply_catalog_filter_migration.sh
```

Skrip berhenti jika container `supabase-db` tidak tersedia, backup kosong/tidak valid, atau SQL gagal. Backup tersimpan di `/opt/naracode/backups/turots/` dengan nama `catalog-filter-before-<waktu>.dump`. Jika perintah berhenti dengan error, simpan outputnya dan jangan mengulang secara membabi buta.

## 3. Verifikasi fungsi

Skrip memverifikasi kedua fungsi yang dipakai aplikasi (`search_turots_catalog` dan `get_turots_catalog_filter_options`) tersedia setelah migrasi. Setelah skrip selesai, buka katalog Turots, pilih afiliasi, dan pastikan daftar bendel/judul berubah sesuai pilihan.

Migrasi memakai `CREATE OR REPLACE FUNCTION` untuk fungsi pencarian baru dengan argumen tambahan; PostgreSQL menyimpan signature baru berdampingan dengan signature lama. Pemanggilan aplikasi mengirim nama argumen, sehingga memakai versi baru setelah schema cache dimuat ulang. Migrasi ini tidak menulis ulang baris katalog.
