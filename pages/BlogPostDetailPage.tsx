import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';
import { BlogPost } from '../types';
import { CalendarIcon } from '../components/icons';

const BlogPostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('blog') // Sesuaikan nama tabel jika berbeda
                .select('*')
                .eq('id', id)
                .single(); // .single() untuk mengambil satu baris data

            if (error) {
                console.error('Error fetching blog post:', error);
                setError('Gagal memuat artikel. Mungkin artikel ini tidak ada.');
            } else {
                setPost(data);
            }
            setLoading(false);
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <div className="text-center py-20">Memuat artikel...</div>;
    }

    if (error || !post) {
        return <div className="text-center py-20 text-red-500">{error || 'Artikel tidak ditemukan.'}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary-900 dark:text-white mb-4">
                    {post.judul_artikel}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1.5" />
                        {new Date(post.tanggal_publikasi).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                    <span>/</span>
                    <span>Oleh: <strong>{post.penulis}</strong></span>
                </div>
                
                {/* Tampilkan konten artikel */}
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {/* Jika konten Anda adalah HTML, gunakan dangerouslySetInnerHTML. Jika teks biasa, gunakan <p> */}
                    <p>{post.isi_artikel}</p>
                </div>
            </article>
        </div>
    );
};

export default BlogPostDetailPage;
