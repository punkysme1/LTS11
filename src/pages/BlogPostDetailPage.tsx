// src/pages/BlogPostDetailPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { CalendarIcon, UserIcon } from '../components/icons'; // UserIcon sekarang bisa diimpor
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const BlogPostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { blogPosts, loading: dataLoading } = useData();
    const { role, loading: authLoading, isInitialized } = useAuth();

    const post = blogPosts.find(p => p.id === Number(id));

    if (!isInitialized || authLoading || dataLoading) {
        return <div className="text-center py-20">Memuat artikel...</div>;
    }

    if (!post) {
        return <div className="text-center py-20 text-red-600">Artikel tidak ditemukan.</div>;
    }

    const displayDate = post.tanggal_publikasi
        ? new Date(post.tanggal_publikasi).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'long', day: 'numeric',
        })
        : 'Tanggal tidak tersedia';

    // --- PERBAIKAN DI SINI ---
    // Fungsi renderContent sekarang menerima 'string | undefined'
    const renderContent = (content: string | undefined) => {
        // Jika konten tidak ada, jangan render apapun
        if (!content) return null;
        
        // Split konten berdasarkan baris baru untuk membuat paragraf
        return content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
                {paragraph}
            </p>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {post.url_thumbnail && (
                    <div className="w-full aspect-video">
                        <img
                            src={post.url_thumbnail}
                            alt={`Gambar untuk ${post.judul_artikel}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="p-8 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary-900 dark:text-white mb-4">
                        {post.judul_artikel}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
                        <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1.5" />
                            <span>{displayDate}</span>
                        </div>
                        {post.penulis && (
                            <div className="flex items-center">
                                <UserIcon className="h-4 w-4 mr-1.5" />
                                <span>Oleh: <strong>{post.penulis}</strong></span>
                            </div>
                        )}
                    </div>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        {renderContent(post.isi_artikel)}
                    </div>
                </div>
            </article>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold font-serif mb-4 text-gray-900 dark:text-white">Komentar dan Diskusi</h2>
                {role === 'verified_user' || role === 'admin' ? (
                    <CommentForm targetId={post.id} type="blog" />
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">Silakan <Link to="/login" className="text-primary-600 hover:underline">login</Link> untuk berkomentar.</p>
                )}
                <CommentList targetId={post.id} type="blog" userRole={role} />
            </div>
        </div>
    );
};

export default BlogPostDetailPage;