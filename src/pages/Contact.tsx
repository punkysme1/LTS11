/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-24">
        <div className="h-1 w-12 bg-secondary mb-8" />
        <h1 className="text-6xl font-serif font-bold text-primary mb-6 italic tracking-tighter">Hubungi Kami</h1>
        <p className="text-secondary max-w-xl text-lg leading-relaxed">
          Ada pertanyaan, kerja kolaborasi, atau sekadar ingin berkunjung? Silakan hubungi kami.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-12"
        >
          <div className="space-y-10">
             <div className="flex gap-8 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-bg-sidebar flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all transform shadow-sm">
                   <MapPin size={24} />
                </div>
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 italic">Lokasi Galeri</h4>
                   <p className="text-secondary leading-relaxed font-serif italic text-lg">
                      Kampus Institut Agama Islam Qomaruddin,<br />
                      Sampurnan, Bungah, Gresik, Jawa Timur,<br />
                      Indonesia 61152
                   </p>
                </div>
             </div>
             
             <div className="flex gap-8 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-bg-sidebar flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all transform shadow-sm">
                   <Mail size={24} />
                </div>
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 italic">Email Resmi</h4>
                   <p className="text-secondary leading-relaxed font-serif italic text-lg font-bold">
                      galeri.manuskrip@sampurnan.org
                   </p>
                </div>
             </div>

             <div className="flex gap-8 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-bg-sidebar flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all transform shadow-sm">
                   <Phone size={24} />
                </div>
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 italic">WhatsApp / Telepon</h4>
                   <p className="text-secondary leading-relaxed font-serif italic text-lg font-bold">
                      +62 812-3456-7890 (Humas)
                   </p>
                </div>
             </div>
          </div>

          <div className="pt-12 border-t border-border">
             <h4 className="text-[10px] uppercase font-bold tracking-[0.4em] text-secondary mb-8">Media Sosial</h4>
             <div className="flex gap-6">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 shadow-sm">
                    <Icon size={18} />
                  </a>
                ))}
             </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="bg-bg-sidebar p-12 rounded-[48px] shadow-xl border border-border shadow-primary/5"
        >
           <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary px-1">Nama</label>
                    <input type="text" className="w-full px-8 py-5 rounded-2xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm" placeholder="Budi" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary px-1">Email</label>
                    <input type="email" className="w-full px-8 py-5 rounded-2xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm" placeholder="budi@email.com" />
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-secondary px-1">Subjek</label>
                 <input type="text" className="w-full px-8 py-5 rounded-2xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm" placeholder="Tujuan pesan..." />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-secondary px-1">Pesan</label>
                 <textarea rows={5} className="w-full px-8 py-5 rounded-2xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm" placeholder="Tuliskan pesan Anda..."></textarea>
              </div>
              <button disabled className="w-full py-6 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:brightness-110 transition-all opacity-50 cursor-not-allowed text-xs uppercase tracking-widest shadow-xl shadow-primary/10">
                 Kirim Email <Send size={18} />
              </button>
           </form>
        </motion.div>
      </div>

      <section className="mt-24">
         <div className="rounded-[40px] overflow-hidden bg-bg-sidebar h-96 relative border border-border shadow-xl overflow-hidden ring-1 ring-border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.3323087313045!2d112.58315264871465!3d-6.99307730030588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd801264b300fe7%3A0xc36261f9da9242d5!2sIAI%20Qomaruddin%20Sampurnan%20Bungah%20Gresik!5e0!3m2!1sid!2sid!4v1714918239066!5m2!1sid!2sid" 
              className="w-full h-full border-0 grayscale opacity-60" 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
         </div>
      </section>
    </div>
  );
}
