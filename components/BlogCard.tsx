
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { CalendarIcon } from './icons';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to="/blog" className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
      <h3 className="text-xl font-bold font-serif text-primary-800 dark:text-primary-200 group-hover:text-primary-600 dark:group-hover:text-accent-400">
        {post.judul_artikel}
      </h3>
      <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">{post.isi_artikel}</p>
      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <CalendarIcon className="h-4 w-4 mr-2"/>
        <span>{new Date(post.tanggal_publikasi).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span className="mx-2">·</span>
        <span>{post.penulis}</span>
      </div>
    </Link>
  );
};

export default BlogCard;
