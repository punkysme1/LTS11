# Layanan unggah Turots untuk Cantaloupe

Layanan ini menerima unggahan admin yang sudah diverifikasi melalui Supabase, lalu menaruh berkas sumber di `/opt/turots-iiif/images` agar Cantaloupe dapat membacanya. PDF tetap disimpan sebagai PDF; Cantaloupe memproses halaman PDF saat diminta. Layanan menerima unggahan langsung sampai 95 MiB dan unggahan potongan yang dapat dilanjutkan untuk berkas sampai 1 GiB. Potongan 32 MiB menjaga setiap permintaan tetap kecil melewati proxy.

Salin folder ini ke host, simpan env-file rahasia di `/opt/turots-iiif/upload.env`, lalu build image dari folder tersebut:

```bash
sudo docker build --pull -t turots-image-upload:1 .
```

Jalankan kontainer dengan env-file rahasia `/opt/turots-iiif/upload.env`, bind mount direktori gambar, dan port lokal `127.0.0.1:8183`:

```bash
sudo docker run -d \
  --name turots-image-upload \
  --restart unless-stopped \
  --memory 512m \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=16m \
  --user 1000:1000 \
  --env-file /opt/turots-iiif/upload.env \
  -p 127.0.0.1:8183:8183 \
  -v /opt/turots-iiif/images:/opt/turots-iiif/images:rw \
  turots-image-upload:1
```

Sesuaikan UID:GID jika pemilik folder gambar di host berbeda. `upload.env` hanya perlu URL dan anon key Supabase serta daftar origin yang diizinkan. Jangan commit `upload.env`. Layanan memeriksa token pengguna melalui PostgREST dan kebijakan RLS pada tabel admin; layanan tidak memerlukan kunci service-role.

Tes lokal:

```bash
npm run test:upload-service
```

Layanan memasang `poppler-utils` dan menyediakan endpoint admin massal memakai path `/admin-upload/{filename}` yang sudah diteruskan reverse proxy. Operasi dibedakan dengan query `action=status`, `action=chunk`, `action=complete`, atau `action=pdf-info`. Jumlah halaman dihitung dari PDF di disk. Admin dapat memilih seluruh folder NT/EAP. Berkas yang sudah tersedia di IIIF dilewati, berkas besar dilanjutkan dari potongan terakhir, dan halaman disimpan per bendel setelah pratinjau sumber berhasil.

Chunk tersimpan di `.turots-upload-chunks` di dalam direktori gambar. Sesi unggah dibatasi ke admin pemiliknya dan dibersihkan otomatis setelah tujuh hari. Jangan menghapus direktori itu saat ada unggahan yang sedang berjalan.
