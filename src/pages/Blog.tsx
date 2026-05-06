/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { blogService } from '../services/blogService';
import { BlogPost } from '../types';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/utils';
import { ArrowRight, User, Calendar } from 'lucide-react';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await blogService.getAll();
    setBlogs(data);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-20">
        <div className="h-1 w-12 bg-secondary mb-8" />
        <h1 className="text-6xl font-serif font-bold text-primary mb-6 italic tracking-tighter">Warta & Artikel</h1>
        <p className="text-secondary max-w-xl text-lg leading-relaxed">
          Catatan penelitian, digitalisasi, dan wacana seputar manuskrip nusantara.
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse space-y-6">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-[40px]" />
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {blogs.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-xl ring-1 ring-border">
                  <img 
                    src={post.image_url || 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=1200'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={post.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-8">
                    <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">Selami Artikel <ArrowRight size={14} /></span>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.2em] text-secondary mb-4">
                  <span className="flex items-center gap-2 transition-colors group-hover:text-primary"><User size={12} /> {post.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={12} /> {formatDate(post.date)}</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-primary leading-tight group-hover:text-secondary transition-colors mb-4 italic">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
