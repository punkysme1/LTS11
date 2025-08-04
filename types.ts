// src/types.ts
import { Session, User } from '@supabase/supabase-js';

// ... (Interface lain seperti Manuskrip, BlogPost, dll. tidak berubah) ...

export interface Manuskrip {
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
  url_konten?: string;
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
  kata_kunci?: string;
  glosarium?: string;
  referensi?: Array<{ judul: string; penulis: string; tahun: number | string; link: string }>;
  manuskrip_terkait?: string; 
  tokoh_terkait?: string;
  jenis_kertas?: string;
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
  published?: boolean;
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
  is_approved?: boolean;
}

export interface SearchHistoryEntry {
    id: number;
    user_id: string;
    query: string;
    timestamp: string;
    created_at: string;
}

export enum UserProfileStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export interface UserProfileData {
    id: string;
    full_name: string;
    domicile_address: string;
    institution_affiliation: string;
    is_alumni: boolean;
    alumni_unit?: string | null;
    alumni_grad_year?: number | null;
    occupation: string;
    phone_number: string;
    status: UserProfileStatus;
    created_at: string;
    updated_at: string;
    auth_users?: {
        email?: string;
    };
}

export type UserRole = 'guest' | 'authenticated' | 'pending' | 'verified_user' | 'admin';

export interface AuthContextType {
    session: Session | null;
    user: User | null;
    userProfile: UserProfileData | null;
    role: UserRole;
    loading: boolean;
    isInitialized: boolean;
    signOut: () => Promise<void>;
}

// --- PERUBAHAN UTAMA DI SINI ---
export interface Comment {
    id: number;
    user_id: string;
    manuscript_id?: string;
    blog_id?: number;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    parent_id?: number | null; // Properti ini ditambahkan
    user_profiles?: {
        full_name: string;
    } | null;
}