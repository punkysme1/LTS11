/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Manuscript {
  id: string;
  inputer?: string;
  kode_inventarisasi: string;
  judul_dari_tim: string;
  afiliasi: string;
  nama_koleksi: string;
  nomor_koleksi: string;
  judul_dari_afiliasi: string;
  nomor_digitalisasi: string;
  link_digital_afiliasi?: string;
  link_digital_tppkp_qomaruddin?: string;
  url_kover?: string;
  url_konten?: string;
  klasifikasi_kailani?: string;
  kategori_ilmu_pesantren?: string;
  deskripsi_umum?: string;
  hlm_pemisah?: string;
  pengarang?: string;
  penyalin?: string;
  tahun_penulisan_di_teks?: string;
  konversi_masehi?: string;
  lokasi_penyalinan?: string;
  asal_usul_naskah?: string;
  bahasa?: string;
  aksara?: string;
  kover?: string;
  ukuran_kover?: string;
  jilid?: string;
  ukuran_kertas?: string;
  ukuran_dimensi?: string;
  watermark?: string;
  countermark?: string;
  tinta?: string;
  jumlah_halaman?: number;
  halaman_kosong?: number;
  jumlah_baris_per_halaman?: number;
  rubrikasi?: string;
  iluminasi?: string;
  ilustrasi?: string;
  catatan_pinggir?: string;
  catatan_makna?: string;
  kolofon?: string;
  catatan_marginal?: string;
  kondisi_fisik_naskah?: string;
  keterbacaan?: string;
  kelengkapan_naskah?: string;
  catatan_catatan?: string;
  created_at?: string;
  kata_kunci?: string;
  glosarium?: string;
  referensi?: string;
  manuskrip_terkait?: string;
  tokoh_terkait?: string;
  jenis_kertas?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image_url?: string;
  excerpt?: string;
  comments?: BlogComment[];
}

export interface BlogComment {
  id: string;
  post_id: string;
  author: string;
  content: string;
  date: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  email?: string;
  message: string;
  date: string;
  location?: string;
}
