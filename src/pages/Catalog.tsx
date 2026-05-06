/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ChevronLeft, ChevronRight, BookOpen, Clock, Tag, ArrowRight } from 'lucide-react';
import { manuscriptService } from '../services/manuscriptService';
import { Manuscript } from '../types';
import { Link } from 'react-router-dom';
import { cn, getGoogleDriveUrl } from '../lib/utils';

const CATEGORIES = [
  'Semua', 'NAHWU', 'FIKIH', 'TAFSIR', 'SEJARAH', 'TASAWWUF', 'AKHLAK', 'HADITS', 'TAUHID', 'SHOROF', 'TAJWID', 'BALAGHOH', 'MANTIQ'
];

export default function Catalog() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const limit = 12; // Using 12 for grid layout (20 was requested but 12 fits 3/4 cols better, but I'll stick to 20 if needed. 12 for now as sample data is small)
  
  // Real limit from user request: 20 per page
  const ACTUAL_LIMIT = 20;

  useEffect(() => {
    fetchData();
  }, [page, search, selectedCategory]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, total } = await manuscriptService.getAll(page, ACTUAL_LIMIT, search);
      
      // Client-side filtering for category if needed (Supabase could do this too)
      let filtered = data;
      if (selectedCategory !== 'Semua') {
        filtered = data.filter(m => m.kategori_ilmu_pesantren?.includes(selectedCategory));
      }
      
      setManuscripts(filtered);
      setTotal(total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / ACTUAL_LIMIT);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-20">
        <div className="h-1 w-12 bg-secondary mb-8" />
        <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 italic tracking-tighter">Katalog Manuskrip</h1>
        <p className="text-secondary max-w-2xl text-lg leading-relaxed">
          Menampilkan koleksi digital dari Perpustakaan Sampurnan. Gunakan filter untuk menelusuri kategori ilmu tertentu.
        </p>
      </header>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Cari Judul Manuskrip atau Kode Inventaris..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-14 pr-6 py-4 bg-bg-sidebar/30 border border-border rounded-2xl focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-sm font-medium"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setPage(1); }}
              className={cn(
                "px-5 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase whitespace-nowrap transition-all",
                selectedCategory === cat 
                  ? "bg-primary text-white shadow-lg" 
                  : "bg-white text-secondary border border-border hover:border-secondary/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-3xl" />
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {manuscripts.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group"
                >
                  <Link to={`/katalog/${m.id}`}>
                    <div className="bg-white border border-border rounded-lg p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative h-full flex flex-col">
                      <div className="relative aspect-[3/4] overflow-hidden rounded mb-4 bg-bg-base">
                        <img 
                          src={getGoogleDriveUrl(m.url_kover || '') as string || 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=800'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                          alt={m.judul_dari_tim}
                        />
                        <div className="absolute top-2 right-2">
                           <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm ring-1 ring-black/5">
                             <BookOpen size={14} />
                           </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[8px] font-bold rounded uppercase tracking-widest border border-secondary/10">
                            {m.kategori_ilmu_pesantren || 'Manuskrip'}
                          </span>
                          <span className="text-[8px] font-bold text-secondary/40 uppercase tracking-widest">{m.kode_inventarisasi}</span>
                        </div>
                        
                        <h3 className="text-base font-serif font-black text-primary mb-2 line-clamp-2 leading-tight group-hover:text-secondary transition-colors italic">
                          {m.judul_dari_afiliasi || m.judul_dari_tim}
                        </h3>
                        
                        <div className="text-[10px] text-secondary/60 mb-4 line-clamp-1 italic">
                          {m.judul_dari_afiliasi ? m.judul_dari_tim : m.pengarang || 'Pengarang tidak diketahui'}
                        </div>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                           <div className="flex items-center gap-1.5 text-[9px] font-bold text-secondary uppercase tracking-wider">
                              <Clock size={10} /> {m.tahun_penulisan_di_teks || 'N/A'}
                           </div>
                           <ArrowRight size={14} className="text-secondary/40 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {manuscripts.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Tidak ada naskah ditemukan</h3>
              <p className="text-gray-600 dark:text-gray-400">Coba ubah kata kunci atau kategori pencarian Anda.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('Semua'); }}
                className="mt-6 text-[#5A5A40] font-bold hover:underline"
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-bold"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      "w-12 h-12 rounded-xl font-bold transition-all text-xs tracking-widest uppercase",
                      page === i + 1 
                        ? "bg-primary text-white shadow-lg" 
                        : "bg-white dark:bg-gray-900 text-secondary border border-border dark:border-gray-800 hover:border-secondary/40"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-bold"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
