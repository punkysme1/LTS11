/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Upload, FileDown, Plus, Edit, Trash2, CheckCircle, AlertCircle, Search, LogOut, ShieldCheck, User, X, Save, Loader2, Check, FileImage } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { manuscriptService } from '../services/manuscriptService';
import { blogService } from '../services/blogService';
import { guestbookService } from '../services/guestbookService';
import { Manuscript, BlogPost, GuestbookEntry } from '../types';
import { isSupabaseConfigured, getSupabase } from '../lib/supabase';
import * as XLSX from 'xlsx';
import { cn } from '../lib/utils';
import { uploadFile } from '../services/uploadService';

const ADMIN_EMAILS = ['maghfurmunif@gmail.com', 'punkysme@gmail.com'];

const MultiLinkInput = ({ value, onChange, onUpload }: { value: string, onChange: (val: string) => void, onUpload: (file: File, callback: (url: string) => void) => Promise<void> }) => {
  const links = value ? value.split(',').map(s => s.trim()).filter(Boolean) : [];
  const [isUploading, setIsUploading] = useState(false);
  
  const addLink = () => {
    const newLink = prompt('Paste link Google Drive atau URL Gambar:');
    if (newLink) {
      onChange([...links, newLink].join(', '));
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      onUpload(file, (url) => {
        onChange([...links, url].join(', '));
        setIsUploading(true); // Temporary to avoid flicker, actually helper sets it back
      }).finally(() => setIsUploading(false));
    }
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    onChange(newLinks.join(', '));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {links.map((link, i) => (
          <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-[10px] max-w-full overflow-hidden border border-gray-200">
            <span className="truncate flex-1 font-mono text-gray-500">{link}</span>
            <button 
              type="button"
              onClick={() => removeLink(i)} 
              className="w-5 h-5 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
            >
              ×
            </button>
          </div>
        ))}
        {links.length === 0 && <span className="text-[10px] text-gray-400 italic">Belum ada link halaman...</span>}
      </div>
      <div className="flex gap-2">
        <button 
          type="button"
          onClick={addLink}
          className="flex-1 py-3 bg-white border-2 border-dashed border-gray-200 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Tambah Link
        </button>
        <label className="flex-1 py-3 bg-[#5A5A40] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#4a4a34] transition-all cursor-pointer flex items-center justify-center gap-2">
          {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} 
          {isUploading ? 'Uploading...' : 'Upload Gambar'}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} disabled={isUploading} />
        </label>
      </div>
    </div>
  );
};

function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authMsg, setAuthMsg] = useState<{ type: 'info' | 'error' | 'success', text: string } | null>(null);
  
  const [activeTab, setActiveTab] = useState<'manuscripts' | 'blogs' | 'guestbook'>('manuscripts');
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [totalManuscripts, setTotalManuscripts] = useState(0);
  const [manuscriptPage, setManuscriptPage] = useState(1);
  const manuscriptLimit = 20;

  const [isUploading, setIsUploading] = useState<string | null>(null); // To track which field is uploading

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('cloudinary_cloud_name') || '') : '');
  const [cloudinaryUploadPreset, setCloudinaryUploadPreset] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('cloudinary_upload_preset') || '') : '');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isExcelUploading, setIsExcelUploading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [editingItem, setEditingItem] = useState<{ type: 'manuscript' | 'blog' | 'guestbook', data: any } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const supabase = getSupabase();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.id === '0d34701c-895f-4e0c-ad80-fa1e4cb31c9c' || (session?.user?.email && ADMIN_EMAILS.includes(session.user.email))) {
        fetchData();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (user && (user.id === '0d34701c-895f-4e0c-ad80-fa1e4cb31c9c' || (user.email && ADMIN_EMAILS.includes(user.email)))) {
      fetchData();
    }
  }, [user]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setAuthMsg({ type: 'info', text: 'Melakukan autentikasi...' });
    
    const { error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });

    if (error) {
      setAuthMsg({ type: 'error', text: 'Login gagal: ' + error.message });
    } else {
      setAuthMsg({ type: 'success', text: 'Login berhasil!' });
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  };

  const fetchData = async () => {
    try {
      if (activeTab === 'manuscripts') {
        const { data, total } = await manuscriptService.getAll(manuscriptPage, manuscriptLimit, searchTerm);
        setManuscripts(data);
        setTotalManuscripts(total);
      } else if (activeTab === 'blogs') {
        const data = await blogService.getAll();
        setBlogs(data);
      } else if (activeTab === 'guestbook') {
        const data = await guestbookService.getAll();
        setGuestbook(data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setMsg({ type: 'error', text: 'Gagal memuat data dari database.' });
    }
  };

  useEffect(() => {
    if (user && (user.id === '0d34701c-895f-4e0c-ad80-fa1e4cb31c9c' || (user.email && ADMIN_EMAILS.includes(user.email)))) {
      fetchData();
    }
  }, [activeTab, manuscriptPage]);

  // Debounced search for manuscripts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'manuscripts') {
        setManuscriptPage(1);
        fetchData();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleFileUpload = async (file: File, onComplete: (url: string) => void) => {
    const fieldId = Math.random().toString(36).substring(7);
    setIsUploading(fieldId);
    
    try {
      const url = await uploadFile(file);
      onComplete(url);
    } catch (error: any) {
      console.error('Error uploading:', error);
      alert(error instanceof Error ? error.message : 'Gagal mengunggah gambar.');
    } finally {
      setIsUploading(null);
    }
  };

  const handleDelete = async (id: string, type: 'manuscript' | 'blog' | 'guestbook') => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      if (type === 'manuscript') await manuscriptService.delete(id);
      if (type === 'blog') await blogService.delete(id);
      if (type === 'guestbook') await guestbookService.delete(id);
      
      setMsg({ type: 'success', text: 'Berhasil menghapus data.' });
      fetchData();
    } catch (err: any) {
      setMsg({ type: 'error', text: 'Gagal menghapus: ' + err.message });
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    try {
      const { type, data } = editingItem;
      if (type === 'manuscript') {
        await manuscriptService.update(data.id, data);
      } else if (type === 'blog') {
        if (data.id) {
          await blogService.update(data.id, data);
        } else {
          await blogService.create(data);
        }
      }

      setMsg({ type: 'success', text: 'Perubahan berhasil disimpan.' });
      setEditingItem(null);
      fetchData();
    } catch (err: any) {
      setMsg({ type: 'error', text: 'Gagal menyimpan: ' + err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = [{
      kode_inventarisasi: 'SAMPLE-001',
      judul_dari_tim: 'Contoh Judul Naskah',
      afiliasi: 'Keluarga Besar Pondok Pesantren Qomaruddin',
      nama_koleksi: 'Koleksi Kyai Sampun',
      nomor_koleksi: '001',
      judul_dari_afiliasi: 'Kitab Kuning',
      nomor_digitalisasi: 'DIG-001',
      link_digital_afiliasi: '',
      link_digital_tppkp_qomaruddin: '',
      url_kover: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      url_konten: 'https://res.cloudinary.com/demo/image/upload/p1.jpg, https://res.cloudinary.com/demo/image/upload/p2.jpg',
      klasifikasi_kailani: 'Fiqh',
      kategori_ilmu_pesantren: 'Fiqh',
      deskripsi_umum: 'Naskah tua peninggalan kyai...',
      hlm_pemisah: '',
      pengarang: 'Syaikh Ahmad',
      penyalin: 'Zaid',
      tahun_penulisan_di_teks: '1234 H',
      konversi_masehi: '1818 M',
      lokasi_penyalinan: 'Sampurnan',
      asal_usul_naskah: 'Hibah',
      bahasa: 'Arab-Jawa',
      aksara: 'Pegon',
      kover: 'Kulit',
      ukuran_kover: '20x15cm',
      jilid: '1',
      ukuran_kertas: '18x13cm',
      ukuran_dimensi: '',
      watermark: 'Pro Patria',
      countermark: '',
      tinta: 'Hitam & Merah',
      jumlah_halaman: 100,
      halaman_kosong: 2,
      jumlah_baris_per_halaman: 15,
      rubrikasi: 'Ya',
      iluminasi: 'Tidak',
      ilustrasi: 'Tidak',
      catatan_pinggir: 'Ada',
      catatan_makna: 'Ada',
      kolofon: 'Ada di akhir',
      catatan_marginal: 'Beberapa baris',
      kondisi_fisik_naskah: 'Baik',
      keterbacaan: 'Sangat Jelas',
      kelengkapan_naskah: 'Lengkap',
      catatan_catatan: '-',
      kata_kunci: 'Fiqh, Ibadah',
      glosarium: '',
      referensi: '',
      manuskrip_terkait: '',
      tokoh_terkait: '',
      jenis_kertas: 'Daluang',
    }];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "template_mass_upload_manuscripts.xlsx");
    setMsg({ type: 'success', text: 'Template berhasil diunduh. Gunakan sebagai acuan format.' });
  };

  const handleExport = () => {
    if (manuscripts.length === 0) {
      setMsg({ type: 'error', text: 'Tidak ada data untuk diekspor.' });
      return;
    }

    // Define keys for export based on the expected import format
    const exportData = manuscripts.map(m => ({
      kode_inventarisasi: m.kode_inventarisasi || '',
      judul_dari_tim: m.judul_dari_tim || '',
      afiliasi: m.afiliasi || '',
      nama_koleksi: m.nama_koleksi || '',
      nomor_koleksi: m.nomor_koleksi || '',
      judul_dari_afiliasi: m.judul_dari_afiliasi || '',
      nomor_digitalisasi: m.nomor_digitalisasi || '',
      link_digital_afiliasi: m.link_digital_afiliasi || '',
      link_digital_tppkp_qomaruddin: m.link_digital_tppkp_qomaruddin || '',
      url_kover: m.url_kover || '',
      url_konten: m.url_konten || '',
      klasifikasi_kailani: m.klasifikasi_kailani || '',
      kategori_ilmu_pesantren: m.kategori_ilmu_pesantren || '',
      deskripsi_umum: m.deskripsi_umum || '',
      hlm_pemisah: m.hlm_pemisah || '',
      pengarang: m.pengarang || '',
      penyalin: m.penyalin || '',
      tahun_penulisan_di_teks: m.tahun_penulisan_di_teks || '',
      konversi_masehi: m.konversi_masehi || '',
      lokasi_penyalinan: m.lokasi_penyalinan || '',
      asal_usul_naskah: m.asal_usul_naskah || '',
      bahasa: m.bahasa || '',
      aksara: m.aksara || '',
      kover: m.kover || '',
      ukuran_kover: m.ukuran_kover || '',
      jilid: m.jilid || '',
      ukuran_kertas: m.ukuran_kertas || '',
      ukuran_dimensi: m.ukuran_dimensi || '',
      watermark: m.watermark || '',
      countermark: m.countermark || '',
      tinta: m.tinta || '',
      jumlah_halaman: m.jumlah_halaman || 0,
      halaman_kosong: m.halaman_kosong || 0,
      jumlah_baris_per_halaman: m.jumlah_baris_per_halaman || 0,
      rubrikasi: m.rubrikasi || '',
      iluminasi: m.iluminasi || '',
      ilustrasi: m.ilustrasi || '',
      catatan_pinggir: m.catatan_pinggir || '',
      catatan_makna: m.catatan_makna || '',
      kolofon: m.kolofon || '',
      catatan_marginal: m.catatan_marginal || '',
      kondisi_fisik_naskah: m.kondisi_fisik_naskah || '',
      keterbacaan: m.keterbacaan || '',
      kelengkapan_naskah: m.kelengkapan_naskah || '',
      catatan_catatan: m.catatan_catatan || '',
      kata_kunci: m.kata_kunci || '',
      glosarium: m.glosarium || '',
      referensi: m.referensi || '',
      manuskrip_terkait: m.manuskrip_terkait || '',
      tokoh_terkait: m.tokoh_terkait || '',
      jenis_kertas: m.jenis_kertas || '',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Manuscripts");
    XLSX.writeFile(wb, `manuscripts_export_${new Date().toISOString().split('T')[0]}.xlsx`);
    setMsg({ type: 'success', text: 'Berhasil mengekspor data ke Excel.' });
  };

  const handleExcelUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
      setMsg({ type: 'error', text: 'Hanya admin yang boleh mengunggah data.' });
      return;
    }
    
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExcelUploading(true);
    setMsg(null);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = XLSX.utils.sheet_to_json(ws) as any[];

        if (rawData.length === 0) {
          throw new Error('File Excel kosong atau format tidak sesuai.');
        }

        // Transform Excel data to Manuscript format
        const transformed: any[] = rawData.map((row: any) => ({
          kode_inventarisasi: String(row.kode_inventarisasi || ''),
          judul_dari_tim: String(row.judul_dari_tim || ''),
          afiliasi: String(row.afiliasi || ''),
          nama_koleksi: String(row.nama_koleksi || ''),
          nomor_koleksi: String(row.nomor_koleksi || ''),
          judul_dari_afiliasi: String(row.judul_dari_afiliasi || ''),
          nomor_digitalisasi: String(row.nomor_digitalisasi || ''),
          link_digital_afiliasi: String(row.link_digital_afiliasi || ''),
          link_digital_tppkp_qomaruddin: String(row.link_digital_tppkp_qomaruddin || ''),
          url_kover: String(row.url_kover || ''),
          url_konten: String(row.url_konten || ''),
          klasifikasi_kailani: String(row.klasifikasi_kailani || ''),
          kategori_ilmu_pesantren: String(row.kategori_ilmu_pesantren || ''),
          deskripsi_umum: String(row.deskripsi_umum || ''),
          hlm_pemisah: String(row.hlm_pemisah || ''),
          pengarang: String(row.pengarang || ''),
          penyalin: String(row.penyalin || ''),
          tahun_penulisan_di_teks: String(row.tahun_penulisan_di_teks || ''),
          konversi_masehi: String(row.konversi_masehi || ''),
          lokasi_penyalinan: String(row.lokasi_penyalinan || ''),
          asal_usul_naskah: String(row.asal_usul_naskah || ''),
          bahasa: String(row.bahasa || ''),
          aksara: String(row.aksara || ''),
          kover: String(row.kover || ''),
          ukuran_kover: String(row.ukuran_kover || ''),
          jilid: String(row.jilid || ''),
          ukuran_kertas: String(row.ukuran_kertas || ''),
          ukuran_dimensi: String(row.ukuran_dimensi || ''),
          watermark: String(row.watermark || ''),
          countermark: String(row.countermark || ''),
          tinta: String(row.tinta || ''),
          jumlah_halaman: Number(row.jumlah_halaman || 0),
          halaman_kosong: Number(row.halaman_kosong || 0),
          jumlah_baris_per_halaman: Number(row.jumlah_baris_per_halaman || 0),
          rubrikasi: String(row.rubrikasi || ''),
          iluminasi: String(row.iluminasi || ''),
          ilustrasi: String(row.ilustrasi || ''),
          catatan_pinggir: String(row.catatan_pinggir || ''),
          catatan_makna: String(row.catatan_makna || ''),
          kolofon: String(row.kolofon || ''),
          catatan_marginal: String(row.catatan_marginal || ''),
          kondisi_fisik_naskah: String(row.kondisi_fisik_naskah || ''),
          keterbacaan: String(row.keterbacaan || ''),
          kelengkapan_naskah: String(row.kelengkapan_naskah || ''),
          catatan_catatan: String(row.catatan_catatan || ''),
          kata_kunci: String(row.kata_kunci || ''),
          glosarium: String(row.glosarium || ''),
          referensi: String(row.referensi || ''),
          manuskrip_terkait: String(row.manuskrip_terkait || ''),
          tokoh_terkait: String(row.tokoh_terkait || ''),
          jenis_kertas: String(row.jenis_kertas || ''),
        }));

        const result = await manuscriptService.upsertMany(transformed);
        
        if (result.error) {
          throw result.error;
        }

        setMsg({ 
          type: 'success', 
          text: `Berhasil mengunggah ${transformed.length} naskah. Tips: Gunakan tombol 'Export Excel' untuk melihat format data yang sudah ada sebagai referensi.` 
        });
        fetchData();
      } catch (err: any) {
        console.error('Upload error:', err);
        setMsg({ 
          type: 'error', 
          text: `Gagal: ${err.message || 'Terjadi kesalahan saat mengunggah.'}. Pastikan tabel manuscripts sudah ada dan RLS mengizinkan akses anon.` 
        });
      } finally {
        setIsExcelUploading(false);
        // Reset input file agar bisa upload file yang sama lagi jika perlu
        e.target.value = '';
      }
    };
    reader.readAsBinaryString(file);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen italic text-gray-400">Memeriksa autentikasi...</div>;
  }

  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="max-w-md mx-auto py-32 px-4">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#5A5A40] rounded-2xl flex items-center justify-center text-white">
               <ShieldCheck size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-center text-gray-900 mb-2">Admin Login</h1>
          <p className="text-center text-gray-400 text-sm mb-8 italic">Gunakan email admin untuk masuk.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email Admin</label>
              <input 
                type="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none"
                placeholder="********"
                required
              />
            </div>
            <button className="w-full py-4 bg-[#5A5A40] text-white rounded-xl font-bold hover:bg-[#4a4a34] transition-all flex items-center justify-center gap-2">
              Masuk ke Panel
            </button>
            
            {authMsg && (
              <div className={cn(
                "p-4 rounded-xl text-center text-sm font-medium",
                authMsg.type === 'error' ? "bg-red-50 text-red-600" : 
                authMsg.type === 'success' ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
              )}>
                {authMsg.text}
              </div>
            )}
            
            {user && user.email && !ADMIN_EMAILS.includes(user.email) && (
              <div className="p-4 bg-red-100 text-red-700 rounded-xl text-center text-sm font-bold">
                 Akses Ditolak: Anda login sebagai {user.email}.<br/>
                 Gunakan email yang terdaftar sebagai admin.
                 <button onClick={handleLogout} className="mt-2 block w-full text-blue-600 underline">Logout</button>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
             <User size={24} />
           </div>
           <div>
             <h1 className="text-4xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
             <p className="text-gray-500">Selamat datang, <span className="font-bold">{user.email}</span></p>
           </div>
        </div>
        <div className="flex gap-4 items-center">
          {!isSupabaseConfigured() && (
            <span className="text-[10px] bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold uppercase tracking-tighter">
              Mode Demo (Off-line)
            </span>
          )}
          <div className="flex gap-2">
            <button 
              onClick={handleDownloadTemplate}
              className="px-4 py-3 bg-white border border-gray-200 text-gray-500 rounded-xl font-bold text-xs hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
              title="Unduh Template Excel"
            >
              <FileDown size={18} />
              Template
            </button>
            <label className="px-6 py-3 bg-[#5A5A40] text-white rounded-xl font-bold cursor-pointer flex items-center gap-2 hover:bg-[#4a4a34] transition-all shadow-md">
              <Plus size={20} />
              {isExcelUploading ? 'Mengunggah...' : 'Mass Upload .xls'}
              <input type="file" accept=".xls,.xlsx" onChange={handleExcelUpload} className="hidden" />
            </label>
          </div>
          <button onClick={handleLogout} className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:text-red-500 transition-colors" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {msg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-4 rounded-2xl mb-8 flex items-center gap-3 font-bold",
            msg.type === 'success' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}
        >
          {msg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {msg.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-10 border-b border-gray-100 dark:border-gray-800 pb-px">
        {(['manuscripts', 'blogs', 'guestbook'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative",
              activeTab === tab 
                ? "text-[#5A5A40]" 
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#5A5A40] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
        {activeTab === 'manuscripts' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8 gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari Judul Afiliasi (Kitab Kuning), Judul Tim, atau Kode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-[#5A5A40] font-medium"
                />
              </div>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 text-sm font-bold text-[#5A5A40] hover:text-[#4a4a34] transition-colors"
              >
                <FileDown size={18} /> Export Excel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-gray-400 text-xs uppercase tracking-widest font-bold border-b border-gray-50">
                  <tr>
                    <th className="pb-4 pr-4">ID / Kode</th>
                    <th className="pb-4 pr-4">Judul Afiliasi / Tim</th>
                    <th className="pb-4 pr-4">Kategori</th>
                    <th className="pb-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {manuscripts.map(m => (
                    <tr key={m.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-6 pr-4">
                        <div className="text-gray-900 font-bold">{m.kode_inventarisasi}</div>
                        <div className="text-[10px] text-gray-400">{m.id}</div>
                      </td>
                      <td className="py-6 pr-4">
                        <div className="text-gray-900 font-black">{m.judul_dari_tim || m.kode_inventarisasi}</div>
                        <div className="text-xs text-gray-400 italic">{m.judul_dari_afiliasi}</div>
                      </td>
                      <td className="py-6 pr-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] text-gray-500 font-bold uppercase">{m.kategori_ilmu_pesantren}</span>
                      </td>
                      <td className="py-6">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setEditingItem({ type: 'manuscript', data: m })}
                            className="p-2 bg-gray-50 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(m.id, 'manuscript')}
                            className="p-2 bg-gray-50 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalManuscripts > manuscriptLimit && (
              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                  Menampilkan {manuscripts.length} dari {totalManuscripts} naskah
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={manuscriptPage === 1}
                    onClick={() => setManuscriptPage(p => p - 1)}
                    className="px-4 py-2 bg-gray-50 text-[#5A5A40] rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-gray-100 transition-all border border-gray-100"
                  >
                    Sebelumnya
                  </button>
                  <div className="flex items-center px-4 text-xs font-bold text-[#5A5A40]">
                    Halaman {manuscriptPage} dari {Math.ceil(totalManuscripts / manuscriptLimit)}
                  </div>
                  <button
                    disabled={manuscriptPage >= Math.ceil(totalManuscripts / manuscriptLimit)}
                    onClick={() => setManuscriptPage(p => p + 1)}
                    className="px-4 py-2 bg-[#5A5A40] text-white rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-[#4a4a34] transition-all"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blogs' && (
           <div className="p-8">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-xl font-serif font-bold">Daftar Blog</h2>
               <button 
                onClick={() => setEditingItem({ type: 'blog', data: { title: '', content: '', excerpt: '', image_url: '', date: new Date().toISOString().split('T')[0], author: user.email } })}
                className="px-4 py-2 bg-[#5A5A40] text-white rounded-lg text-sm font-bold flex items-center gap-2"
               >
                 <Plus size={16} /> Tambah Blog
               </button>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="text-gray-400 text-xs uppercase tracking-widest font-bold border-b border-gray-50">
                   <tr>
                     <th className="pb-4 pr-4">Tanggal</th>
                     <th className="pb-4 pr-4">Judul</th>
                     <th className="pb-4">Aksi</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm font-medium">
                   {blogs.map(b => (
                     <tr key={b.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                       <td className="py-6 pr-4">{b.date}</td>
                       <td className="py-6 pr-4 font-bold">{b.title}</td>
                       <td className="py-6">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setEditingItem({ type: 'blog', data: b })}
                            className="p-2 bg-gray-50 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(b.id, 'blog')}
                            className="p-2 bg-gray-50 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}

        {activeTab === 'guestbook' && (
           <div className="p-8">
             <h2 className="text-xl font-serif font-bold mb-8">Buku Tamu</h2>
             <div className="grid grid-cols-1 gap-4">
               {guestbook.map(entry => (
                 <div key={entry.id} className="p-6 bg-gray-50 rounded-2xl flex justify-between items-start">
                    <div>
                      <div className="font-bold text-lg">{entry.name}</div>
                      <div className="text-xs text-gray-400 mb-2">{entry.date} • {entry.location}</div>
                      <p className="text-gray-600">{entry.message}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(entry.id, 'guestbook')}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                 </div>
               ))}
             </div>
           </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-2xl font-serif font-bold">
                  {editingItem.type === 'manuscript' ? 'Edit Manuskrip' : editingItem.data.id ? 'Edit Blog' : 'Tambah Blog'}
                </h2>
                <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-8 overflow-y-auto flex-1 space-y-6">
                {editingItem.type === 'manuscript' ? (
                  <div className="space-y-8">
                    {/* General Information */}
                    <section>
                      <h3 className="text-sm font-bold text-[#5A5A40] border-b border-gray-100 pb-2 mb-4 uppercase tracking-widest">Informasi Umum</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Judul Afiliasi (Kitab Kuning)</label>
                          <input type="text" value={editingItem.data.judul_dari_afiliasi || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, judul_dari_afiliasi: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none font-bold" placeholder="Contoh: Kitab Fathul Mu'in" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Judul Tim</label>
                          <input type="text" value={editingItem.data.judul_dari_tim || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, judul_dari_tim: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Kode Inventarisasi</label>
                          <input type="text" value={editingItem.data.kode_inventarisasi || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, kode_inventarisasi: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Kategori Ilmu</label>
                          <input type="text" value={editingItem.data.kategori_ilmu_pesantren || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, kategori_ilmu_pesantren: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Afiliasi</label>
                          <input type="text" value={editingItem.data.afiliasi || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, afiliasi: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                      </div>
                    </section>

                    {/* Physical Details */}
                    <section>
                      <h3 className="text-sm font-bold text-[#5A5A40] border-b border-gray-100 pb-2 mb-4 uppercase tracking-widest">Deskripsi Fisik</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Jenis Kertas</label>
                          <input type="text" value={editingItem.data.jenis_kertas || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, jenis_kertas: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Watermark</label>
                          <input type="text" value={editingItem.data.watermark || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, watermark: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Jumlah Halaman</label>
                          <input type="text" value={editingItem.data.jumlah_halaman || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, jumlah_halaman: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Kondisi Fisik</label>
                          <input type="text" value={editingItem.data.kondisi_fisik_naskah || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, kondisi_fisik_naskah: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                      </div>
                    </section>

                    {/* Origin Information */}
                    <section>
                      <h3 className="text-sm font-bold text-[#5A5A40] border-b border-gray-100 pb-2 mb-4 uppercase tracking-widest">Asal Usul & Penulisan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Pengarang</label>
                          <input type="text" value={editingItem.data.pengarang || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, pengarang: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Penyalin</label>
                          <input type="text" value={editingItem.data.penyalin || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, penyalin: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tahun (Teks)</label>
                          <input type="text" value={editingItem.data.tahun_penulisan_di_teks || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, tahun_penulisan_di_teks: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Lokasi Penyalinan</label>
                          <input type="text" value={editingItem.data.lokasi_penyalinan || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, lokasi_penyalinan: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Asal Usul Naskah</label>
                          <input type="text" value={editingItem.data.asal_usul_naskah || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, asal_usul_naskah: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nama Koleksi</label>
                          <input type="text" value={editingItem.data.nama_koleksi || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, nama_koleksi: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Bahasa</label>
                          <input type="text" value={editingItem.data.bahasa || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, bahasa: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Aksara</label>
                          <input type="text" value={editingItem.data.aksara || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, aksara: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                      </div>
                    </section>

                    {/* Links */}
                    <section>
                      <h3 className="text-sm font-bold text-[#5A5A40] border-b border-gray-100 pb-2 mb-4 uppercase tracking-widest">Media & Link</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Link Kover</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={editingItem.data.url_kover || ''} 
                              onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, url_kover: e.target.value } })} 
                              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none font-mono text-xs" 
                              placeholder="URL Google Drive atau Foto" 
                            />
                            <label className="px-6 py-3 bg-[#5A5A40] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#4a4a34] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap">
                              {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} 
                              <span>Upload Kover</span>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*" 
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, (url) => setEditingItem({ ...editingItem, data: { ...editingItem.data, url_kover: url } }));
                                }} 
                                disabled={!!isUploading} 
                              />
                            </label>
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-3">
                            Link Konten (Halaman Digital)
                          </label>
                          <MultiLinkInput 
                            value={editingItem.data.url_konten || ''} 
                            onChange={val => setEditingItem({ ...editingItem, data: { ...editingItem.data, url_konten: val } })}
                            onUpload={handleFileUpload}
                          />
                          <p className="mt-3 text-[10px] text-secondary/60 italic leading-relaxed">
                            * Anda bisa memasukkan link Folder (Google Drive) atau Link Foto langsung (.jpg, Cloudinary, dsb) satu per satu. Menggunakan Cloudinary sangat disarankan untuk performa terbaik.
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Link Afiliasi</label>
                          <input type="text" value={editingItem.data.link_digital_afiliasi || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, link_digital_afiliasi: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Link TPPKP</label>
                          <input type="text" value={editingItem.data.link_digital_tppkp_qomaruddin || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, link_digital_tppkp_qomaruddin: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                      </div>
                    </section>

                    {/* Taxonomy & Analysis */}
                    <section>
                      <h3 className="text-sm font-bold text-[#5A5A40] border-b border-gray-100 pb-2 mb-4 uppercase tracking-widest">Taksonomi & Analisis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Klasifikasi Kailani</label>
                          <input type="text" value={editingItem.data.klasifikasi_kailani || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, klasifikasi_kailani: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Kata Kunci</label>
                          <input type="text" value={editingItem.data.kata_kunci || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, kata_kunci: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Keterbacaan</label>
                          <input type="text" value={editingItem.data.keterbacaan || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, keterbacaan: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Kelengkapan</label>
                          <input type="text" value={editingItem.data.kelengkapan_naskah || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, kelengkapan_naskah: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                      </div>
                    </section>

                    {/* Notes & Others */}
                    <section>
                      <h3 className="text-sm font-bold text-[#5A5A40] border-b border-gray-100 pb-2 mb-4 uppercase tracking-widest">Catatan & Lainnya</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Deskripsi Umum</label>
                          <textarea rows={3} value={editingItem.data.deskripsi_umum || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, deskripsi_umum: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none resize-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tinta</label>
                          <input type="text" value={editingItem.data.tinta || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, tinta: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Rubrikasi</label>
                          <input type="text" value={editingItem.data.rubrikasi || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, rubrikasi: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Kolofon</label>
                          <input type="text" value={editingItem.data.kolofon || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, kolofon: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Referensi</label>
                          <input type="text" value={editingItem.data.referensi || ''} onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, referensi: e.target.value } })} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none" />
                        </div>
                      </div>
                    </section>

                    <div className="bg-yellow-50 p-4 rounded-xl text-xs text-yellow-700 italic border border-yellow-100">
                      Catatan: Semua kolom metadata dapat diedit melalui form ini. Pastikan untuk menyimpan perubahan.
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Judul Postingan</label>
                      <input 
                        type="text" 
                        value={editingItem.data.title}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Excerpt (Ringkasan)</label>
                      <textarea 
                        rows={2}
                        value={editingItem.data.excerpt}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, excerpt: e.target.value } })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Konten (Teks Lengkap)</label>
                      <textarea 
                        rows={8}
                        value={editingItem.data.content}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, content: e.target.value } })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none resize-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">URL Gambar</label>
                        <input 
                          type="text" 
                          value={editingItem.data.image_url}
                          onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, image_url: e.target.value } })}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tanggal</label>
                        <input 
                          type="date" 
                          value={editingItem.data.date}
                          onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4 flex gap-4">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="flex-1 py-4 bg-[#5A5A40] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#4a4a34] transition-all disabled:opacity-50"
                  >
                    <Save size={20} />
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cloudinary Client-side Settings */}
      <div className="mt-12 bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
            <FileImage size={20} />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-gray-900">Konfigurasi Cloudinary Client-Side (Unsigned)</h2>
            <p className="text-sm text-gray-500">Gunakan ini untuk upload gambar langsung secara mandiri tanpa server backend (Sangat berguna di Cloudflare Pages atau Vercel static).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Cloud Name</label>
            <input 
              type="text" 
              value={cloudinaryCloudName} 
              onChange={e => setCloudinaryCloudName(e.target.value)} 
              placeholder="Contoh: dzussloo4" 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none text-sm transition-all shadow-inner font-mono" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Upload Preset (Unsigned)</label>
            <input 
              type="text" 
              value={cloudinaryUploadPreset} 
              onChange={e => setCloudinaryUploadPreset(e.target.value)} 
              placeholder="Contoh: your_unsigned_preset_name" 
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:ring-2 focus:ring-[#5A5A40] outline-none text-sm transition-all shadow-inner font-mono" 
            />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <div className="text-xs text-gray-500 leading-relaxed max-w-2xl">
            <strong className="text-gray-700 block mb-1">💡 Cara membuat & mengatur Unsigned Preset di Cloudinary:</strong> 
            1. Daftar / Log in ke Cloudinary, temukan <strong className="text-[#5A5A40]">Cloud Name</strong> Anda di Dashboard.<br />
            2. Masuk ke menu <strong className="text-[#5A5A40]">Settings (ikon roda gigi) ⚙️</strong> &rarr; pilih tab <strong className="text-[#5A5A40]">Upload</strong>.<br />
            3. Scroll ke bawah sampai menemukan bagian <strong className="text-[#5A5A40]">Upload presets</strong>, lalu klik <strong className="text-[#5A5A40]">Add upload preset</strong>.<br />
            4. Atur <strong>Signing Mode</strong> dari <span className="line-through">Signed</span> menjadi <strong className="text-green-600 font-bold bg-green-50 px-1 py-0.5 rounded">Unsigned</strong>.<br />
            5. Klik <strong>Save</strong> di pojok kanan atas, lalu salin nama preset tersebut ke kolom di atas.
          </div>
          <button
            onClick={() => {
              localStorage.setItem('cloudinary_cloud_name', cloudinaryCloudName.trim());
              localStorage.setItem('cloudinary_upload_preset', cloudinaryUploadPreset.trim());
              alert('Konfigurasi Cloudinary berhasil disimpan secara lokal di browser Anda! Sekarang Anda sudah bisa langsung upload gambar.');
            }}
            className="w-full xl:w-auto px-8 py-4 bg-[#5A5A40] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#4a4a34] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer self-stretch xl:self-auto"
          >
            <Check size={16} />
            Simpan Konfigurasi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
