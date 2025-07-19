import React from 'react';
import { Link } from 'react-router-dom'; // IMPORT: Link
import { blogPosts } from '../data/mockData';
import { BlogStatus } from '../types';
import { CalendarIcon } from '../components/icons';

const BlogListPage: React.FC = () => {
    const publishedPosts = blogPosts
        .filter(post => post.status === BlogStatus.PUBLISHED)
        .sort((a, b) => new Date(b.tanggal_publikasi).getTime() - new Date(a.tanggal_publikasi).getTime());

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-serif text-center mb-10">Blog & Artikel</h1>
            <div className="space-y-10">
                {publishedPosts.map(post => (
                    <div key={post.id} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        <Link to={`/blog/${post.id}`}> {/* FIX: Title is now a link */}
                            <h2 className="text-3xl font-bold font-serif text-primary-900 dark:text-white hover:text-primary-700 dark:hover:text-accent-400">
                               {post.judul_artikel}
                            </h2>
                        </Link>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 my-4">
                            <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1.5" />
                                {new Date(post.tanggal_publikasi).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <span>/</span>
                            <span>Oleh: <strong>{post.penulis}</strong></span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {post.isi_artikel.substring(0, 200)}... {/* Shorten content for list view */}
                        </p>
                         <Link to={`/blog/${post.id}`} className="text-primary-600 dark:text-accent-400 hover:underline font-semibold mt-4 inline-block">
                            Baca Selengkapnya
                         </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogListPage;