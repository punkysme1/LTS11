/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Globe, Shield, Wallet, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function Donation() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-24">
        <div className="h-1 w-12 bg-secondary mb-8" />
        <h1 className="text-6xl font-serif font-bold text-primary mb-6 italic tracking-tighter">Wakaf Literasi</h1>
        <p className="text-secondary max-w-xl text-lg leading-relaxed">
          Setiap bantuan Anda adalah nafas bagi naskah-naskah yang hampir punah. Investasi abadi untuk memelihara peradaban.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[56px] overflow-hidden shadow-2xl relative group border border-border"
        >
          <img src="https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=1200" className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" alt="Support" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent flex flex-col justify-end p-12">
             <div className="text-white">
                <blockquote className="text-2xl font-serif italic mb-8 leading-relaxed">
                  "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya."
                </blockquote>
                <div className="w-12 h-1 bg-white/40 rounded-full" />
             </div>
          </div>
        </motion.div>

        <div className="space-y-16">
          <div className="space-y-10">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary leading-[1.1] italic">Ke mana Dana Anda <span className="text-secondary underline decoration-secondary/30 underline-offset-8">Dialokasikan?</span></h2>
            <div className="space-y-8">
               <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-bg-sidebar flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all transform shadow-sm font-bold"><Shield size={20} /></div>
                  <p className="text-secondary italic font-serif text-lg leading-relaxed pt-1">Restorasi fisik naskah yang lapuk dan berjamur agar tidak hancur dimakan zaman.</p>
               </div>
               <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-bg-sidebar flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all transform shadow-sm font-bold"><Globe size={20} /></div>
                  <p className="text-secondary italic font-serif text-lg leading-relaxed pt-1">Pemeliharaan infrastruktur repositori digital agar ilmu di dalamnya abadi di dunia maya.</p>
               </div>
            </div>
          </div>

          <div className="bg-bg-sidebar p-12 rounded-[48px] shadow-xl border border-border shadow-primary/5">
             <h3 className="text-xs font-bold text-primary mb-10 uppercase tracking-[0.4em] italic underline decoration-primary/20 underline-offset-8">Metode Transfer</h3>
             
             <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-border shadow-sm group">
                   <div className="text-[10px] uppercase font-bold text-secondary mb-4 tracking-[0.3em]">Bank Syariah Indonesia (BSI)</div>
                   <div className="flex justify-between items-center">
                      <div className="text-3xl font-serif font-bold text-primary italic tracking-tighter">712-321-4455</div>
                      <button 
                        onClick={() => handleCopy('7123214455')}
                        className="p-4 rounded-xl bg-bg-sidebar text-primary hover:bg-primary hover:text-white transition-all shadow-sm transform group-hover:rotate-3"
                      >
                         {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                      </button>
                   </div>
                   <div className="text-[10px] text-secondary mt-4 font-bold uppercase tracking-[0.2em] italic">A.N Galeri Turats Sampurnan</div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-border shadow-sm group">
                   <div className="text-[10px] uppercase font-bold text-secondary mb-4 tracking-[0.3em]">Bank Mandiri</div>
                   <div className="flex justify-between items-center">
                      <div className="text-3xl font-serif font-bold text-primary italic tracking-tighter">142-00-1122-3344</div>
                      <button 
                        onClick={() => handleCopy('1420011223344')}
                        className="p-4 rounded-xl bg-bg-sidebar text-primary hover:bg-primary hover:text-white transition-all shadow-sm transform group-hover:-rotate-3"
                      >
                         {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                      </button>
                   </div>
                   <div className="text-[10px] text-secondary mt-4 font-bold uppercase tracking-[0.2em] italic">A.N Yayasan Qomaruddin (Unit Galeri)</div>
                </div>
             </div>
             
             <div className="mt-10 p-6 bg-primary/5 border border-primary/10 rounded-2xl flex gap-4 items-center">
                <CheckCircle size={20} className="text-primary flex-shrink-0" />
                <p className="text-[11px] text-primary leading-relaxed italic font-serif">
                  Konfirmasi wakaf Anda melalui WhatsApp Humas agar dapat kami catat dalam rekapitulasi penelusur dermawan.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
