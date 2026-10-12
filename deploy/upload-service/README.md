# Layanan unggah Turots untuk Cantaloupe

Layanan ini menerima unggahan admin yang sudah diverifikasi melalui Supabase, lalu menaruh berkas sumber di `/opt/turots-iiif/images` agar Cantaloupe dapat membacanya. PDF tetap disimpan sebagai PDF; Cantaloupe memproses halaman PDF saat diminta.

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

Sesuaikan UID:GID jika pemilik folder gambar di host berbeda. Jangan commit `upload.env` atau kunci service-role.

Tes lokal:

```bash
npm run test:upload-service
```

Admin mengunggah satu PDF per proses dan memasukkan jumlah halaman. Identifier IIIF halaman dibentuk sebagai `nama.pdf;1`, `nama.pdf;2`, dan seterusnya.
