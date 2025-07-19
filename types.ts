export interface Manuskrip {
  // Kunci utama, tipe string
  kode_inventarisasi: string;
  judul_dari_tim: string;
  afiliasi: string;
  nama_koleksi: string;
  nomor_koleksi: string;
  judul_dari_afiliasi: string;
  nomor_digitalisasi: string;
  link_digital_afiliasi: string;
  link_digital_tppkp_qomaruddin: string;
  url_kover: string;
  url_konten: string; // URL yang dipisahkan baris baru
  klasifikasi_kailani: string;
  kategori_ilmu_pesantren: string;
  deskripsi_umum: string;
  hlm_pemisah: string;
  pengarang: string;
  penyalin: string;
  tahun_penulisan_di_teks: string;
  konversi_masehi: number;
  lokasi_penyalina: string;
  asal_usul_naskah: string;
  bahasa: string; // Dipisahkan koma
  aksara: string; // Dipisahkan koma
  kover: string;
  ukuran_kover: string;
  jilid: string;
  ukuran_kertas: string;
  ukuran_dimensi: string;
  watermark: string;
  countermark: string;
  tinta: string;
  jumlah_halaman: number;
  halaman_kosong: string;
  jumlah_baris_per_halaman: string;
  rubrikasi: string;
  iluminasi: string;
  ilustrasi: string;
  catatan_pinggir: string;
  catatan_makna: string;
  kolofon: string;
  catatan_marginal: string;
  kondisi_fisik_naskah: string;
  keterbacaan: string;
  kelengkapan_naskah: string;
  catatan_catatan: string;
  // FIX: Tambahkan field 'created_at' yang dibuat otomatis oleh Supabase
  created_at: string;
}

// FIX: Ubah nilai Enum agar cocok dengan standar database (huruf kecil, tanpa spasi)
// Ini akan memperbaiki error saat memfilter atau menyimpan status.
export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export interface BlogPost {
  // Kunci utama, tipe number (default Supabase)
  id: number;
  judul_artikel: string;
  isi_artikel: string;
  penulis: string;
  tanggal_publikasi: string; // string tanggal ISO
  status: BlogStatus;
  // FIX: Tambahkan field 'created_at'
  created_at: string;
}

// FIX: Ubah nilai Enum agar cocok dengan standar database
export enum GuestBookStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
}

export interface GuestBookEntry {
  // Kunci utama, tipe number (default Supabase)
  id: number;
  nama_pengunjung: string;
  asal_institusi: string;
  pesan: string;
  tanggal_kirim: string; // string tanggal ISO
  status: GuestBookStatus;
  // FIX: Tambahkan field 'created_at'
  created_at: string;
}