export interface Manuskrip {
  // Kunci utama, tipe string
  kode_inventarisasi: string;
  judul_dari_tim: string;
  afiliasi?: string;
  nama_koleksi?: string;
  nomor_koleksi?: string;
  judul_dari_afiliasi?: string;
  nomor_digitalisasi?: string;
  link_digital_afiliasi?: string;
  link_digital_tppkp_qomaruddin?: string;
  url_kover?: string;
  url_konten?: string; // URL yang dipisahkan baris baru
  klasifikasi_kailani?: string;
  kategori_ilmu_pesantren?: string;
  deskripsi_umum?: string;
  hlm_pemisah?: string;
  pengarang?: string;
  penyalin?: string;
  tahun_penulisan_di_teks?: string;
  konversi_masehi?: number;
  lokasi_penyalina?: string;
  asal_usul_naskah?: string;
  bahasa?: string; // Dipisahkan koma
  aksara?: string; // Dipisahkan koma
  kover?: string;
  ukuran_kover?: string;
  jilid?: string;
  ukuran_kertas?: string;
  ukuran_dimensi?: string;
  watermark?: string;
  countermark?: string;
  tinta?: string;
  jumlah_halaman?: number;
  halaman_kosong?: string;
  jumlah_baris_per_halaman?: string;
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
  created_at: string;
}

// FIX: Ubah nilai Enum agar cocok dengan standar database (huruf kapital di awal: 'Draft', 'Published')
export enum BlogStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
}

export interface BlogPost {
  id: number;
  judul_artikel: string;
  isi_artikel?: string;
  penulis?: string;
  tanggal_publikasi?: string;
  status?: BlogStatus;
  url_thumbnail?: string;
  created_at: string;
}

// FIX: Ubah nilai Enum agar cocok dengan standar database (ASUMSI huruf kapital di awal: 'Pending', 'Approved')
// Anda HARUS MENGKONFIRMASI INI DARI DASHBOARD SUPABASE ANDA.
export enum GuestBookStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
}

export interface GuestBookEntry {
  id: number;
  nama_pengunjung?: string;
  asal_institusi?: string;
  pesan?: string;
  tanggal_kirim?: string;
  status?: GuestBookStatus;
  created_at: string;
}