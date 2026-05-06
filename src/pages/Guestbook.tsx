/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { guestbookService } from '../services/guestbookService';
import { GuestbookEntry } from '../types';
import { formatDate } from '../lib/utils';
import { MessageSquare, Send, Quote } from 'lucide-react';

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const data = await guestbookService.getAll();
    setEntries(data);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setLoading(true);
    await guestbookService.addEntry({ 
      name, 
      message,
      date: new Date().toISOString(),
      location: 'Unknown'
    });
    setName('');
    setMessage('');
    await fetchEntries();
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-20">
        <div className="h-1 w-12 bg-secondary mb-8" />
        <h1 className="text-6xl font-serif font-bold text-primary mb-6 italic tracking-tighter">Buku Tamu</h1>
        <p className="text-secondary max-w-xl text-lg leading-relaxed">
          Tinggalkan jejak penelusuran Anda di galeri kami.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
        <div className="lg:col-span-2">
          <div className="bg-bg-sidebar p-10 rounded-3xl border border-border sticky top-32 shadow-xl shadow-primary/5">
            <h3 className="text-2xl font-serif font-bold text-primary mb-8 italic">Tulis Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2 px-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary mb-2 px-1">Pesan / Kesan</label>
                <textarea 
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                  placeholder="Tuliskan pengalaman atau pesan Anda..."
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-50 shadow-xl shadow-primary/10"
              >
                Kirim Pesan <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-12">
          <h3 className="text-2xl font-serif font-bold text-primary flex items-center gap-3 italic">
            <MessageSquare className="text-secondary" /> Pesan Penelusur
          </h3>
          <div className="space-y-8">
            {entries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative bg-white p-10 rounded-3xl border border-border shadow-sm"
              >
                <Quote className="absolute top-10 right-10 text-border/40" size={48} />
                <div className="relative z-10">
                  <p className="text-primary text-lg leading-relaxed italic mb-8 font-serif">
                    "{entry.message}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-bg-sidebar flex items-center justify-center text-primary font-bold text-xs">
                      {entry.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-primary">{entry.name}</div>
                      <div className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-0.5">{formatDate(entry.date)}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
