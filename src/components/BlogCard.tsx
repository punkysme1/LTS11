// src/components/BlogCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { CalendarIcon } from './icons'; // Pastikan ikon ini ada

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const displayDate = post.tanggal_publikasi 
    ? new Date(post.tanggal_publikasi).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Tanggal tidak tersedia';

  return (
    <Link 
      to={`/blog/${post.id}`} 
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {post.url_thumbnail ? (
          <img
            src={post.url_thumbnail}
            alt={`Thumbnail ${post.judul_artikel}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
            Tidak ada gambar
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-serif text-primary-800 dark:text-primary-200 group-hover:text-primary-600 dark:group-hover:text-accent-400">
          {post.judul_artikel}
        </h3>
        <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">{post.isi_artikel}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CalendarIcon className="h-4 w-4 mr-2"/>
          <span>{displayDate}</span>
          {post.penulis && (
            <>
              <span className="mx-2">·</span>
              <span>{post.penulis}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;