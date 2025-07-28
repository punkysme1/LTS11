// BlogPostDetailPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { BlogPost, BlogStatus } from '../../types';
import { CalendarIcon } from '../components/icons';
import { useAuth } from '../hooks/useAuth';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const BlogPostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { role, loading: authLoading } = useAuth(); // Dapatkan role dan authLoading
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            // Hanya fetch data jika authStore sudah selesai memuat sesi
            if (authLoading) {
                console.log('BLOG_POST_DETAIL_PAGE_LOG: Waiting for AuthContext to finish loading...');
                return;
            }
            console.log('BLOG_POST_DETAIL_PAGE_LOG: AuthContext finished, starting data fetch.');

            if (!id || isNaN(Number(id))) {
                setError('ID artikel tidak valid.');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            let query = supabase.from('blog').select('*').eq('id', Number(id));

            // Jika bukan admin, pastikan statusnya PUBLISHED dan published=TRUE
            if (role !== 'admin') {
                query = query.eq('status', BlogStatus.PUBLISHED).eq('published', true);
            }

            const { data, error: dbError } = await query.single();

            if (dbError) {
                console.error('BLOG_POST_DETAIL_PAGE_ERROR: Error fetching blog post:', dbError);
                setError('Gagal memuat artikel. Mungkin artikel ini tidak ada atau terjadi kesalahan.');
            } else {
                setPost(data);
            }
            setLoading(false);
            console.log('BLOG_POST_DETAIL_PAGE_LOG: Data fetch finished.');
        };

        fetchPost();
    }, [id, authLoading, role]);

    // Gabungkan loading state
    if (authLoading || loading) {
        return <div className="text-center py-20 text-gray-700 dark:text-gray-300">Memuat artikel...</div>;
    }

    if (error || !post) {
        return <div className="text-center py-20 text-red-600 dark:text-red-400">{error || 'Artikel tidak ditemukan.'}</div>;
    }

    const displayDate = post.tanggal_publikasi
        ? new Date(post.tanggal_publikasi).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Tanggal tidak tersedia';

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
                {post.url_thumbnail && (
                    <div className="mb-8 overflow-hidden rounded-lg aspect-video bg-gray-100 dark:bg-gray-700">
                        <img
                            src={post.url_thumbnail}
                            alt={`Gambar untuk ${post.judul_artikel}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary-900 dark:text-white mb-4">
                    {post.judul_artikel}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1.5" />
                        <span>{displayDate}</span>
                    </div>
                    {post.penulis && (
                        <>
                            <span>/</span>
                            <span>Oleh: <strong>{post.penulis}</strong></span>
                        </>
                    )}
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <p>{post.isi_artikel}</p>
                </div>
            </article>

            {/* Komentar & Diskusi Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-4">Komentar dan Diskusi</h2>
                {role === 'verified_user' || role === 'admin' ? (
                    <CommentForm targetId={post.id} type="blog" />
                ) : role === 'pending' ? (
                    <p className="text-yellow-600 dark:text-yellow-400">Akun Anda sedang menunggu verifikasi untuk dapat berkomentar.</p>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">Silakan <Link to="/login" className="text-primary-600 hover:underline">login</Link> atau <Link to="/register" className="text-primary-600 hover:underline">daftar</Link> untuk berkomentar.</p>
                )}
                
                <CommentList targetId={post.id} type="blog" userRole={role} />
            </div>
        </div>
    );
};

export default BlogPostDetailPage;