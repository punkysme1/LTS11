/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Book, Heart, Globe, Shield, History, Users } from 'lucide-react';

const VALUES = [
  { icon: Shield, title: 'Pelestarian', desc: 'Menjaga keberadaan fisik dan digital manuskrip kuno.' },
  { icon: Globe, title: 'Akses Publik', desc: 'Memberikan akses seluas-luasnya bagi peneliti dan umum.' },
  { icon: Book, title: 'Edukasi', desc: 'Menjadi media pembelajaran sejarah dan literasi masa lalu.' },
  { icon: Users, title: 'Kolaborasi', desc: 'Bekerja sama dengan berbagai lembaga turats nusantara.' },
];

export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-24 relative">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="aspect-[21/9] rounded-[48px] overflow-hidden mb-12 shadow-2xl relative"
        >
          <img src="https://images.unsplash.com/photo-1549675584-91f19337af3d?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Gallery Interior" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-10 lg:p-20">
             <div className="h-1 w-12 bg-white mb-6" />
             <h1 className="text-5xl md:text-8xl font-serif font-bold text-white leading-[0.9] tracking-tighter mb-4 italic">Profil <span className="text-white/60">Galeri</span>.</h1>
             <p className="text-white/60 font-bold uppercase tracking-[0.4em] text-[10px]">Menjaga warisan, menginspirasi masa depan.</p>
          </div>
        </motion.div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-serif font-bold text-primary leading-tight italic">Menghubungkan Tradisi dengan <span className="text-secondary underline decoration-secondary/30 underline-offset-8">Modernitas</span>.</h2>
          <p className="text-secondary text-lg leading-relaxed">
            Galeri Manuskrip Sampurnan bermula dari sebuah kesadaran akan pentingnya menjaga tumpukan naskah rapuh yang tersimpan di berbagai sudut perpustakaan pesantren dan koleksi pribadi. Sejak tahun 2018, kami telah mendedikasikan diri untuk melakukan inventarisasi dan digitalisasi naskah kuno.
          </p>
          <div className="flex gap-6 pt-4">
             <div className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest">2018 Berdiri</div>
             <div className="px-8 py-4 bg-white border border-border rounded-xl font-bold text-xs uppercase tracking-widest text-secondary">500+ Koleksi</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6 pt-12">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-xl">
              <img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Research" />
            </div>
            <div className="rounded-3xl overflow-hidden aspect-square shadow-xl bg-[#5A5A40] flex items-center justify-center p-8 text-white">
               <History size={48} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden aspect-square shadow-xl">
              <img src="https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Manuscript" />
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-xl">
               <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Books" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <h2 className="text-4xl font-serif font-bold text-primary mb-16 text-center italic">Nilai-Nilai Utama Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-white shadow-sm rounded-3xl border border-border hover:border-secondary transition-colors group text-center"
            >
              <div className="w-16 h-16 bg-bg-sidebar rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                <v.icon size={28} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 italic">{v.title}</h4>
              <p className="text-secondary text-xs leading-[1.8] font-medium uppercase tracking-wider">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
