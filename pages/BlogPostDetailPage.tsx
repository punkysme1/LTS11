import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';
import { BlogPost } from '../types';
import { CalendarIcon } from '../components/icons';

const BlogPostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // ID dari URL adalah string
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            // Pastikan ID valid (bisa dikonversi ke number jika diperlukan oleh Supabase .eq)
            if (!id || isNaN(Number(id))) { // Menambahkan validasi untuk memastikan ID adalah angka
                setError('ID artikel tidak valid.');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            // Fetch data dari Supabase
            const { data, error } = await supabase
                .from('blog')
                .select('*') // Mengambil semua kolom, termasuk url_thumbnail
                .eq('id', Number(id)) // Konversi ID ke number karena tipe di DB adalah BIGSERIAL (number)
                .single();

            if (error) {
                console.error('Error fetching blog post:', error);
                setError('Gagal memuat artikel. Mungkin artikel ini tidak ada atau terjadi kesalahan.');
            } else {
                setPost(data);
            }
            setLoading(false);
        };

        fetchPost();
    }, [id]); // Dependensi id agar fetch ulang jika id berubah

    if (loading) {
        return <div className="text-center py-20 text-gray-700 dark:text-gray-300">Memuat artikel...</div>;
    }

    if (error || !post) {
        return <div className="text-center py-20 text-red-600 dark:text-red-400">{error || 'Artikel tidak ditemukan.'}</div>;
    }

    // Pastikan tanggal_publikasi ada sebelum mencoba memformatnya
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
                {post.url_thumbnail && ( // <--- TAMBAHAN: Tampilkan gambar thumbnail jika ada
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
                    {post.penulis && ( // Tampilkan penulis hanya jika ada
                        <>
                            <span>/</span>
                            <span>Oleh: <strong>{post.penulis}</strong></span>
                        </>
                    )}
                </div>
                
                {/* Tampilkan konten artikel */}
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {/* Menggunakan dangerouslySetInnerHTML jika isi_artikel adalah HTML (Markdown, rich text) */}
                    {/* Jika isi_artikel adalah teks biasa, gunakan <p>{post.isi_artikel}</p> */}
                    {/* Untuk keamanan, pastikan konten HTML sudah di-sanitasi jika berasal dari input pengguna */}
                    <p>{post.isi_artikel}</p>
                </div>
            </article>
        </div>
    );
};

export default BlogPostDetailPage;