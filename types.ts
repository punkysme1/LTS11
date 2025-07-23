// types.ts
export interface Manuskrip {
  // ... (field-field yang sudah ada)
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
  hlm_pemisah?: string; // Sudah ada di skema
  pengarang?: string;
  penyalin?: string;
  tahun_penulisan_di_teks?: string;
  konversi_masehi?: number;
  lokasi_penyalina?: string;
  asal_usul_naskah?: string;
  bahasa?: string;
  aksara?: string;
  kover?: string;
  ukuran_kover?: string;
  jilid?: string;
  ukuran_kertas?: string; // BARU: Jenis Kertas
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

  // --- FIELD BARU UNTUK REFERENSI ---
  kata_kunci?: string;
  glosarium?: string;
  referensi?: Array<{ judul: string; penulis: string; tahun: number; link: string }>;
  manuskrip_terkait?: string; // Manuskrip yang berhubungan
  tokoh_terkait?: string; // Tokoh yang berhubungan
}

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

export enum GuestBookStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
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

export interface SearchHistoryEntry {
    id: number;
    user_id: string; // UUID
    query: string;
    timestamp: string; // ISO string
    created_at: string;
}

export enum UserProfileStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export interface UserProfileData {
    id: string;
    full_name: string;
    domicile_address: string;
    institution_affiliation: string;
    is_alumni: boolean;
    alumni_unit?: string;
    alumni_grad_year?: number;
    occupation: string;
    phone_number: string;
    status: UserProfileStatus;
    created_at: string;
    updated_at: string;
    // BARU: Field email yang akan di-join dari auth.users
    auth_users?: { // Nama properti akan menjadi auth_users jika Anda select alias
        email?: string;
    };
    // Jika Anda ingin email langsung di level atas UserProfileData:
    // email?: string; // Ini jika Anda ingin email ada di level root, tapi akan konflik dengan select join
}

// Interface untuk data yang dikirim dari form pendaftaran (hanya email & password)
export interface SignUpFormData {
    email: string;
    password: string;
}

// Interface untuk data yang dikirim saat melengkapi profil (setelah sign-up)
export interface CompleteProfileFormData {
    full_name: string;
    domicile_address: string;
    institution_affiliation: string;
    is_alumni: boolean;
    alumni_unit?: string;
    alumni_grad_year?: number;
    occupation: string;
    phone_number: string;
}

// BARU: Role Pengguna
export type UserRole = 'guest' | 'pending' | 'verified_user' | 'admin';

// BARU: Tipe data untuk komentar
export interface Comment {
    id: number;
    user_id: string; // UUID dari user yang berkomentar
    manuscript_id?: string; // UUID dari manuskrip yang dikomentari (opsional)
    blog_id?: number; // ID dari blog post yang dikomentari (opsional)
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    // Untuk menampilkan nama user, bisa di-join dari `user_profiles`
    user_profiles?: {
        full_name: string;
    };
}