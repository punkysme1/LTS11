/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Heart } from 'lucide-react';
import { manuscriptService } from '../services/manuscriptService';
import { guestbookService } from '../services/guestbookService';
import { Manuscript, GuestbookEntry } from '../types';
import { SAMPLE_MANUSCRIPTS, SAMPLE_GUESTBOOK } from '../constants';
import { getGoogleDriveUrl } from '../lib/utils';

export default function Home() {
  const [featuredManuscripts, setFeaturedManuscripts] = useState<Manuscript[]>(SAMPLE_MANUSCRIPTS);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(SAMPLE_GUESTBOOK);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await manuscriptService.getAll(1, 3);
        if (data && data.length > 0) {
          setFeaturedManuscripts(data);
        }

        const entries = await guestbookService.getAll();
        if (entries && entries.length > 0) {
          setGuestbookEntries(entries.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-32 py-10">
      {/* Hero Section */}
      <section className="relative px-0 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="h-1 w-12 bg-secondary mb-8" />
            <h1 className="text-6xl lg:text-8xl font-serif font-bold text-primary leading-[0.9] tracking-tighter mb-8 italic">
              Warisan Tulis Nusantara.
            </h1>
            <p className="text-xl text-secondary leading-relaxed mb-12 max-w-lg">
              Melestarikan ribuan tahun sejarah, ilmu, dan kearifan melalui teknologi digital di Galeri Manuskrip Sampurnan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/katalog" className="px-10 py-5 bg-primary text-white rounded-xl font-bold flex items-center gap-3 hover:brightness-110 transition-all shadow-xl shadow-primary/20 uppercase text-xs tracking-widest">
                Mulai Menelusuri <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden border-[16px] border-white shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dhz970cgz/image/upload/v1758438100/007.jpg" 
                className="w-full h-full object-cover"
                alt="Manuscript"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-secondary p-8 rounded-3xl text-white shadow-xl max-w-xs md:block hidden animate-bounce-slow">
               <p className="text-sm italic font-serif">"Setiap lembar adalah saksi bisu kejayaan intelektual masa lalu."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Numbers */}
      <section className="bg-bg-sidebar rounded-[48px] p-16 border border-border">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           {[
             { label: 'Total Naskah', value: '450+' },
             { label: 'Kategori Ilmu', value: '12+' },
             { label: 'Pengunjung', value: '2.5k' },
             { label: 'Donatur', value: '180' }
           ].map((stat, i) => (
             <div key={i}>
               <div className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-2">{stat.value}</div>
               <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">{stat.label}</div>
             </div>
           ))}
         </div>
      </section>

      {/* Featured Grid */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">Katalog Unggulan</h2>
            <div className="h-0.5 w-24 bg-border mb-6" />
            <p className="text-secondary">Pilihan naskah langka yang paling sering dikunjungi oleh para peneliti dan pecinta turats.</p>
          </div>
          <Link to="/katalog" className="px-8 py-4 border border-primary text-primary rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all">
            Lihat Katalog Lengkap
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredManuscripts.map((m) => (
            <Link key={m.id} to={`/katalog/${m.id}`} className="group block">
              <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden mb-8 shadow-lg ring-1 ring-border group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={getGoogleDriveUrl(m.url_kover || '') as string || 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=800'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={m.judul_dari_tim}
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-bold text-white uppercase tracking-widest mb-3">
                    {m.kategori_ilmu_pesantren}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                    {m.judul_dari_afiliasi || m.judul_dari_tim}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between px-2">
                <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">{m.kode_inventarisasi}</div>
                <div className="text-[10px] font-bold text-secondary/40 italic mx-2 truncate flex-1 text-right">{m.judul_dari_tim}</div>
                <ArrowRight size={16} className="text-secondary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Guestbook Snippet Artistic */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <h2 className="text-5xl font-serif font-bold text-primary leading-tight underline decoration-secondary/30 underline-offset-8">Kata Para Penelusur Sejarah.</h2>
          <div className="space-y-8">
            {guestbookEntries.map(entry => (
              <div key={entry.id} className="group">
                <div className="flex gap-6 items-start">
                   <div className="text-4xl font-serif text-secondary/30 italic">"</div>
                   <p className="text-xl font-serif italic text-primary flex-1 leading-relaxed">
                     {entry.message}
                   </p>
                </div>
                <div className="flex items-center gap-4 mt-6 ml-10">
                  <div className="h-px w-8 bg-border" />
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">{entry.name}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/buku-tamu" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#5A4B3A] group">
            Isi Buku Tamu Kami <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        <div className="relative">
           <div className="aspect-square rounded-full border border-border p-12">
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
                <img src="https://res.cloudinary.com/dhz970cgz/image/upload/v1758516865/34.Al-Khutbah00010.jpg" />
              </div>
           </div>
           {/* Decorative circles */}
           <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-xl" />
           <div className="absolute bottom-12 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        </div>
      </section>

      {/* CTA Artisan */}
      <section className="py-12">
        <div className="bg-primary rounded-[60px] p-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
             <Book size={600} className="text-white rotate-12" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 italic">Titipkan Berkah Melalui Turats.</h2>
            <p className="text-white/60 text-lg mb-12">Setiap kontribusi Anda mendukung keberlanjutan digitalisasi naskah nusantara.</p>
            <Link to="/donasi" className="px-12 py-6 bg-white text-primary rounded-xl font-bold inline-flex items-center gap-3 hover:scale-105 transition-all shadow-2xl">
              Donasi Sekarang <Heart size={20} className="fill-current" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
