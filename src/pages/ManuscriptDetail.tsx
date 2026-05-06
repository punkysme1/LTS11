/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Download, ExternalLink, Info, Book, FileText, Calendar, MapPin, User, PenTool, Hash, Info as InfoIcon, Image as ImageIcon, BookOpen, History, Layers, Type, Maximize2, Palette, Shield, Globe, Clock, Tag, Search, Bookmark, Users, Database, AlignLeft } from 'lucide-react';
import { manuscriptService } from '../services/manuscriptService';
import { Manuscript } from '../types';
import { cn, getGoogleDriveUrl } from '../lib/utils';
import ManuscriptViewer from '../components/ManuscriptViewer';

const ProtectedViewer = ({ id, url, title }: { id: string, url?: string, title: string }) => {
  if (!url) return null;
  
  const isGoogleDrive = url.includes('drive.google.com');
  const isFolder = url.includes('/folders/');
  const isDirectImage = url.match(/\.(jpg|jpeg|png|webp|gif|svg)/i) || url.includes('cloudinary.com');
  const osdSources = getGoogleDriveUrl(url, 'osd');

  return (
    <div className="relative group/viewer mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif font-bold text-primary italic flex items-center gap-3">
          <BookOpen className="text-secondary" /> {isFolder ? 'Koleksi Digital (Folder)' : 'Pratinjau Digital'}
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
          <Shield size={12} /> Akses Terbatas (Secure Viewer)
        </span>
      </div>
      
      <div className="relative aspect-[3/4] sm:aspect-[16/10] rounded-[40px] overflow-hidden bg-bg-sidebar shadow-2xl border border-border group select-none">
        {/* Anti-selection Overlay */}
        <div 
          className="absolute inset-0 z-40 cursor-default pointer-events-none" 
          onContextMenu={(e) => e.preventDefault()}
        />
        
        {isFolder ? (
          <iframe 
            src={getGoogleDriveUrl(url, 'preview') as string || undefined}
            className="w-full h-full relative z-10 border-0 bg-white"
            allow="autoplay"
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (isGoogleDrive || isDirectImage) ? (
          <div className="w-full h-full relative z-10">
            <ManuscriptViewer id={id} title={title} tileSources={osdSources as string | string[]} />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center text-secondary/20 z-0">
              <ImageIcon size={64} className="animate-pulse" />
            </div>
            <img 
              src={getGoogleDriveUrl(url, 'image') as string || undefined} 
              alt={title}
              className="relative z-10 w-full h-full object-contain p-4 transition-transform duration-500"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </>
        )}

        {/* Watermark Overlay (Only for non-OSD) */}
        {!(isGoogleDrive && !isFolder) && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center opacity-[0.03]">
            <div className="text-primary font-bold text-6xl rotate-[-25deg] whitespace-nowrap">
              GALERI MANUSKRIP SAMPURNAN
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-secondary/[0.03] border border-border/50 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-secondary border border-border/50 flex-shrink-0">
          <Info size={18} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-primary mb-1">Tip Navigasi:</h4>
          <p className="text-xs text-secondary leading-relaxed">
            {isFolder ? (
              <>Konten ini berupa folder. Gunakan navigasi di dalam bingkai di atas untuk berpindah antar lembar foto. <strong>Tip:</strong> Pisahkan link foto dengan tanda koma (,) untuk menggunakan fitur Viewer Digital modern.</>
            ) : (
              <>Gunakan kursor atau kontrol zoom untuk melihat detail naskah. Jika terdapat lebih dari satu halaman (link yang dipidahkan koma), gunakan tanda panah di samping untuk navigasi.</>
            )}
          </p>
        </div>
      </div>
      
      <p className="mt-4 text-xs italic text-secondary text-right">
        * Gambar/Dokumen dilindungi oleh sistem keamanan Perpustakaan Sampurnan.
      </p>
    </div>
  );
};

function ManuscriptDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    setLoading(true);
    const data = await manuscriptService.getById(id);
    setManuscript(data);
    setLoading(false);
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-[3/4] bg-bg-sidebar rounded-3xl" />
        <div className="space-y-6">
          <div className="h-12 bg-bg-sidebar rounded-xl w-3/4" />
          <div className="h-6 bg-bg-sidebar rounded-xl w-1/2" />
        </div>
      </div>
    </div>
  );

  if (!manuscript) return (
    <div className="text-center py-48">
      <h2 className="text-4xl font-serif font-bold text-primary mb-6 italic">Naskah tidak ditemukan.</h2>
      <Link to="/katalog" className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">Kembali ke Katalog</Link>
    </div>
  );

  const MetadataRow = ({ icon: Icon, label, value }: { icon: any, label: string, value?: string | number }) => {
    if (value === undefined || value === null || value === '') return null;
    return (
      <div className="flex gap-4 py-3 border-b border-border/50 last:border-0 items-start group/row">
        <div className="w-8 h-8 rounded-lg bg-bg-sidebar flex items-center justify-center text-primary group-hover/row:bg-primary group-hover/row:text-white transition-all flex-shrink-0">
          <Icon size={14} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[8px] uppercase font-bold tracking-[0.2em] text-secondary/60 mb-0.5">{label}</div>
          <div className="text-primary font-serif italic text-sm leading-tight break-words">{value}</div>
        </div>
      </div>
    );
  };

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-6 flex items-center gap-3 italic">
      <Icon size={14} /> {title}
    </h3>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-12 flex items-center gap-3 text-secondary hover:text-primary transition-all font-bold uppercase text-[10px] tracking-widest group"
      >
        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-translate-x-1">
          <ArrowLeft size={14} />
        </div>
        Kembali
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Cover & Primary Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="sticky top-32">
            <div className="rounded-[40px] overflow-hidden bg-white shadow-xl p-6 sm:p-10 border border-border ring-1 ring-black/5">
              <img 
                src={getGoogleDriveUrl(manuscript.url_kover || '') as string || 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=800'} 
                className="w-full rounded-2xl object-cover aspect-[3/4] shadow-sm italic text-xs text-secondary flex items-center justify-center bg-bg-base" 
                alt={manuscript.judul_dari_afiliasi || manuscript.judul_dari_tim}
              />
            </div>
            
            <div className="flex gap-4 mt-8">
              <button className="flex-1 py-5 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:brightness-110 transition-all text-xs uppercase tracking-widest">
                <Share2 size={16} /> Bagikan
              </button>
              {manuscript.url_konten && (
                 <button className="flex-1 py-5 border border-primary/20 text-primary rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-primary/5 transition-all text-xs uppercase tracking-widest opacity-50 cursor-not-allowed">
                   <Download size={16} /> Unduh Naskah
                 </button>
              )}
            </div>

            <ProtectedViewer id={manuscript.id} url={manuscript.url_konten} title={manuscript.judul_dari_afiliasi || manuscript.judul_dari_tim} />
          </div>
        </motion.div>

        {/* Info Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-16"
        >
          <div>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-1.5 bg-secondary text-white font-bold text-[9px] rounded-full uppercase tracking-widest">{manuscript.kategori_ilmu_pesantren}</span>
              <span className="px-4 py-1.5 bg-bg-sidebar text-secondary font-bold text-[9px] rounded-full uppercase tracking-widest">{manuscript.kode_inventarisasi}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-primary leading-[1] mb-6 tracking-tighter italic">
              {manuscript.judul_dari_afiliasi || manuscript.judul_dari_tim}
            </h1>
            <p className="text-xl text-secondary/60 font-serif italic mb-10 leading-relaxed">
              {manuscript.judul_dari_afiliasi ? manuscript.judul_dari_tim : manuscript.pengarang || 'Pengarang tidak diketahui'}
            </p>
            <div className="prose prose-sm max-w-none text-secondary leading-relaxed text-lg bg-white p-10 rounded-3xl border border-border shadow-sm italic font-serif">
              {manuscript.deskripsi_umum || 'Tidak ada deskripsi tersedia untuk naskah ini.'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Column 1: Identitas & Kandungan */}
            <div className="space-y-12">
              <section>
                <SectionHeader icon={Shield} title="Identitas & Inventaris" />
                <div className="space-y-0.5">
                  <MetadataRow icon={User} label="Inputer" value={manuscript.inputer} />
                  <MetadataRow icon={Hash} label="Kode Inventarisasi" value={manuscript.kode_inventarisasi} />
                  <MetadataRow icon={Globe} label="Afiliasi" value={manuscript.afiliasi} />
                  <MetadataRow icon={Database} label="Nama Koleksi" value={manuscript.nama_koleksi} />
                  <MetadataRow icon={Bookmark} label="Nomor Koleksi" value={manuscript.nomor_koleksi} />
                  <MetadataRow icon={BookOpen} label="Nomor Digitalisasi" value={manuscript.nomor_digitalisasi} />
                  <MetadataRow icon={Clock} label="Dibuat Pada" value={manuscript.created_at} />
                </div>
              </section>

              <section>
                <SectionHeader icon={InfoIcon} title="Kandungan Isi" />
                <div className="space-y-0.5">
                  <MetadataRow icon={Layers} label="Klasifikasi Kailani" value={manuscript.klasifikasi_kailani} />
                  <MetadataRow icon={Book} label="Kategori Ilmu" value={manuscript.kategori_ilmu_pesantren} />
                  <MetadataRow icon={User} label="Pengarang" value={manuscript.pengarang} />
                  <MetadataRow icon={PenTool} label="Penyalin" value={manuscript.penyalin} />
                  <MetadataRow icon={Type} label="Bahasa" value={manuscript.bahasa} />
                  <MetadataRow icon={AlignLeft} label="Aksara" value={manuscript.aksara} />
                  <MetadataRow icon={Search} label="Kata Kunci" value={manuscript.kata_kunci} />
                  <MetadataRow icon={BookOpen} label="Glosarium" value={manuscript.glosarium} />
                </div>
              </section>

              <section>
                <SectionHeader icon={Calendar} title="Waktu & Lokasi" />
                <div className="space-y-0.5">
                   <MetadataRow icon={Calendar} label="Tahun Penulisan" value={manuscript.tahun_penulisan_di_teks} />
                   <MetadataRow icon={History} label="Konversi Masehi" value={manuscript.konversi_masehi} />
                   <MetadataRow icon={MapPin} label="Lokasi Penyalinaan" value={manuscript.lokasi_penyalinan} />
                   <MetadataRow icon={Globe} label="Asal-Usul Naskah" value={manuscript.asal_usul_naskah} />
                </div>
              </section>
            </div>

            {/* Column 2: Fisik & Kuantitas */}
            <div className="space-y-12">
              <section>
                <SectionHeader icon={FileText} title="Dimensi & Material" />
                <div className="space-y-0.5">
                  <MetadataRow icon={Book} label="Kover" value={manuscript.kover} />
                  <MetadataRow icon={Maximize2} label="Ukuran Kover" value={manuscript.ukuran_kover} />
                  <MetadataRow icon={Hash} label="Jilid" value={manuscript.jilid} />
                  <MetadataRow icon={FileText} label="Jenis Kertas" value={manuscript.jenis_kertas} />
                  <MetadataRow icon={Type} label="Ukuran Kertas" value={manuscript.ukuran_kertas} />
                  <MetadataRow icon={Maximize2} label="Ukuran Dimensi" value={manuscript.ukuran_dimensi} />
                  <MetadataRow icon={Palette} label="Watermark" value={manuscript.watermark} />
                  <MetadataRow icon={Palette} label="Countermark" value={manuscript.countermark} />
                  <MetadataRow icon={PenTool} label="Tinta" value={manuscript.tinta} />
                </div>
              </section>

              <section>
                <SectionHeader icon={Hash} title="Kuantitas & Struktur" />
                <div className="space-y-0.5">
                  <MetadataRow icon={FileText} label="Jumlah Halaman" value={manuscript.jumlah_halaman} />
                  <MetadataRow icon={FileText} label="Halaman Kosong" value={manuscript.halaman_kosong} />
                  <MetadataRow icon={AlignLeft} label="Baris / Halaman" value={manuscript.jumlah_baris_per_halaman} />
                  <MetadataRow icon={Layers} label="Halaman Pemisah" value={manuscript.hlm_pemisah} />
                </div>
              </section>

              <section>
                <SectionHeader icon={Palette} title="Seni & Catatan" />
                <div className="space-y-0.5">
                  <MetadataRow icon={Palette} label="Rubrikasi" value={manuscript.rubrikasi} />
                  <MetadataRow icon={Palette} label="Iluminasi" value={manuscript.iluminasi} />
                  <MetadataRow icon={Palette} label="Ilustrasi" value={manuscript.ilustrasi} />
                  <MetadataRow icon={AlignLeft} label="Catatan Pinggir" value={manuscript.catatan_pinggir} />
                  <MetadataRow icon={AlignLeft} label="Catatan Makna" value={manuscript.catatan_makna} />
                  <MetadataRow icon={Book} label="Kolofon" value={manuscript.kolofon} />
                  <MetadataRow icon={AlignLeft} label="Catatan Marginal" value={manuscript.catatan_marginal} />
                </div>
              </section>
            </div>
          </div>

          <section className="space-y-8">
            <SectionHeader icon={InfoIcon} title="Status & Kondisi" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-bg-sidebar rounded-2xl border border-border">
                <div className="text-[10px] font-bold uppercase text-secondary mb-2">Kondisi Fisik</div>
                <div className="font-serif italic text-primary">{manuscript.kondisi_fisik_naskah || 'Tidak Tercatat'}</div>
              </div>
              <div className="p-6 bg-bg-sidebar rounded-2xl border border-border">
                <div className="text-[10px] font-bold uppercase text-secondary mb-2">Keterbacaan</div>
                <div className="font-serif italic text-primary">{manuscript.keterbacaan || 'Tidak Tercatat'}</div>
              </div>
              <div className="p-6 bg-bg-sidebar rounded-2xl border border-border">
                <div className="text-[10px] font-bold uppercase text-secondary mb-2">Kelengkapan</div>
                <div className="font-serif italic text-primary">{manuscript.kelengkapan_naskah || 'Tidak Tercatat'}</div>
              </div>
            </div>
          </section>

          {(manuscript.referensi || manuscript.manuskrip_terkait || manuscript.tokoh_terkait) && (
            <section className="bg-primary/5 p-10 rounded-[40px] border border-primary/10">
              <SectionHeader icon={Layers} title="Referensi & Relasi" />
              <div className="space-y-6">
                <MetadataRow icon={ExternalLink} label="Referensi" value={manuscript.referensi} />
                <MetadataRow icon={Book} label="Manuskrip Terkait" value={manuscript.manuskrip_terkait} />
                <MetadataRow icon={Users} label="Tokoh Terkait" value={manuscript.tokoh_terkait} />
              </div>
            </section>
          )}

          {manuscript.catatan_catatan && (
            <section className="bg-secondary/5 p-10 rounded-[40px] border border-secondary/10">
              <h3 className="font-serif font-bold text-primary text-xl mb-6 italic underline decoration-secondary/20 underline-offset-8">Catatan Peneliti</h3>
              <p className="text-primary dark:text-gray-300 italic leading-relaxed font-serif text-lg">
                "{manuscript.catatan_catatan}"
              </p>
            </section>
          )}

          <div className="pt-12 border-t border-border dark:border-gray-800 flex flex-wrap gap-8">
             {manuscript.link_digital_afiliasi && (
               <a 
                 href={manuscript.link_digital_afiliasi} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex items-center gap-3 font-bold text-primary hover:text-secondary transition-colors text-xs uppercase tracking-widest"
               >
                 Akses Digital Afiliasi <ExternalLink size={14} />
               </a>
             )}
             {manuscript.link_digital_tppkp_qomaruddin && (
               <a 
                 href={manuscript.link_digital_tppkp_qomaruddin}
                 target="_blank" 
                 rel="noreferrer"
                 className="flex items-center gap-3 font-bold text-primary hover:text-secondary transition-colors text-xs uppercase tracking-widest"
               >
                 Tersedia di Galeri TPPKP <ExternalLink size={14} />
               </a>
             )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ManuscriptDetail;
