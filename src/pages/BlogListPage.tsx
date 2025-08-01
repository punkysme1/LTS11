// src/pages/BlogListPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlogPost, BlogStatus } from '../../types';
import { CalendarIcon } from '../components/icons';

const BlogListPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublishedPosts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('blog')
                // FIX: Menambahkan 'created_at' ke dalam daftar kolom yang dipilih
                .select('id, judul_artikel, isi_artikel, penulis, tanggal_publikasi, url_thumbnail, status, created_at')
                .eq('status', BlogStatus.PUBLISHED)
                .eq('published', true)
                .order('tanggal_publikasi', { ascending: false });

            if (error) {
                console.error('BLOG_LIST_PAGE_ERROR: Error fetching blog posts:', error);
            } else {
                setPosts(data || []);
            }
            setLoading(false);
        };

        fetchPublishedPosts();
    }, []); // Dependensi kosong, data diambil sekali

    if (loading) {
        return <div className="text-center p-8 text-gray-700 dark:text-gray-300">Memuat artikel...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
            <h1 className="text-4xl font-bold font-serif text-center mb-10 text-gray-900 dark:text-white">Blog & Artikel</h1>
            <div className="space-y-10">
                {posts.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">Belum ada artikel yang dipublikasikan.</p>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
                            {post.url_thumbnail && (
                                <div className="md:w-1/3 flex-shrink-0">
                                    <Link to={`/blog/${post.id}`}>
                                        <img
                                            src={post.url_thumbnail}
                                            alt={`Thumbnail ${post.judul_artikel}`}
                                            className="w-full h-48 md:h-full object-cover rounded-md shadow-md"
                                        />
                                    </Link>
                                </div>
                            )}
                            <div className="flex-grow">
                                <Link to={`/blog/${post.id}`} className="block">
                                    <h2 className="text-3xl font-bold font-serif text-primary-800 dark:text-primary-200 hover:text-primary-600 dark:hover:text-accent-400 transition-colors duration-300">
                                        {post.judul_artikel}
                                    </h2>
                                </Link>
                                <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <CalendarIcon className="h-4 w-4 mr-2"/>
                                    <span>{post.tanggal_publikasi ? new Date(post.tanggal_publikasi).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Tanggal tidak tersedia'}</span>
                                    {post.penulis && (
                                        <>
                                            <span className="mx-2">·</span>
                                            <span>{post.penulis}</span>
                                        </>
                                    )}
                                </div>
                                <p className="mt-4 text-gray-700 dark:text-gray-300 line-clamp-4">
                                    {post.isi_artikel}
                                </p>
                                <div className="mt-4">
                                    <Link 
                                        to={`/blog/${post.id}`} 
                                        className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-semibold inline-flex items-center"
                                    >
                                        Baca Selengkapnya
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogListPage;