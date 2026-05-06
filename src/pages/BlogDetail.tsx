/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import { formatDate } from '../lib/utils';
import { ArrowLeft, MessageCircle, Send, User } from 'lucide-react';

function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    setLoading(true);
    const data = await blogService.getById(id);
    setPost(data);
    setLoading(false);
  };

  if (loading || !post) return (
    <div className="py-24 text-center animate-pulse">
      <div className="h-12 w-48 bg-bg-sidebar mx-auto rounded-xl" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="mb-12 flex items-center gap-3 text-secondary hover:text-primary transition-all font-bold uppercase text-[10px] tracking-widest group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Warta
      </button>

      <article>
        <header className="mb-16">
          <div className="text-[10px] uppercase font-bold tracking-[0.4em] text-secondary mb-6">
            Diterbitkan pada {formatDate(post.date)} • Oleh {post.author}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary leading-[1] mb-10 tracking-tighter italic">
            {post.title}
          </h1>
          <div className="aspect-[21/9] rounded-[48px] overflow-hidden shadow-xl border border-border">
            <img 
              src={post.image_url || 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=1200'} 
              className="w-full h-full object-cover" 
              alt={post.title} 
            />
          </div>
        </header>

        <div className="prose prose-xl prose-stone max-w-none mb-32 leading-relaxed font-serif italic text-primary first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
          {post.content}
        </div>

        {/* Comments Section */}
        <section className="border-t border-border pt-20">
          <h3 className="text-3xl font-serif font-bold text-primary mb-12 flex items-center gap-3 italic underline decoration-secondary/20 underline-offset-8">
             <MessageCircle className="text-secondary" size={24} /> Komentar Penelusur
          </h3>
          
          <div className="space-y-12 mb-20">
            {post.comments?.map(comment => (
              <div key={comment.id} className="flex gap-8 group">
                <div className="w-14 h-14 rounded-2xl bg-bg-sidebar flex items-center justify-center text-primary flex-shrink-0 font-bold group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-rotate-3 shadow-sm">
                  {comment.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-xs uppercase tracking-widest text-primary">{comment.author}</span>
                    <span className="h-0.5 w-4 bg-border" />
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{formatDate(comment.date)}</span>
                  </div>
                  <p className="text-secondary font-serif italic text-lg leading-relaxed">
                    "{comment.content}"
                  </p>
                </div>
              </div>
            ))}
            {(!post.comments || post.comments.length === 0) && (
              <div className="text-secondary italic font-serif text-lg text-center p-12 bg-bg-sidebar/30 dark:bg-gray-900/30 rounded-3xl border border-dashed border-border">Belum ada komentar. Jadilah penelusur pertama!</div>
            )}
          </div>

          <div className="bg-bg-sidebar p-12 rounded-[48px] border border-border shadow-xl shadow-primary/5">
            <h4 className="text-2xl font-serif font-bold text-primary mb-8 italic">Tinggalkan Jejak</h4>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="Nama Lengkap" className="px-8 py-5 rounded-2xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm" />
                <input type="email" placeholder="Email (Opsional)" className="px-8 py-5 rounded-2xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm" />
              </div>
              <textarea rows={4} placeholder="Tulis komentar Anda di sini..." className="w-full px-8 py-5 rounded-2xl bg-white border border-border outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm" />
              <button disabled className="px-10 py-5 bg-primary text-white rounded-xl font-bold flex items-center gap-3 opacity-50 cursor-not-allowed text-xs uppercase tracking-widest shadow-xl shadow-primary/10">
                Kirim Komentar <Send size={16} />
              </button>
            </form>
          </div>
        </section>
      </article>
    </div>
  );
}

export default BlogDetail;
