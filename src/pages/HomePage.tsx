import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Manuskrip, BlogPost, BlogStatus } from '../../types';
import { supabase } from '../supabaseClient';
import ManuscriptCard from '../components/ManuscriptCard';
import BlogCard from '../components/BlogCard';
import { BookOpenIcon, CalendarIcon, ArrowRightIcon } from '../components/icons';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
    const { loading: authLoading } = useAuth(); // Dapatkan status loading dari AuthContext
    const [latestManuscripts, setLatestManuscripts] = useState<Manuskrip[]>([]);
    const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
    const [totalManuscripts, setTotalManuscripts] = useState(0);
    const [lastUpdate, setLastUpdate] = useState('');
    const [loadingData, setLoadingData] = useState(true); // State loading untuk data spesifik halaman

    useEffect(() => {
        const fetchData = async () => {
            // Jika AuthContext masih loading, tunda fetching data halaman ini.
            if (authLoading) {
                console.log('HOME_PAGE_LOG: Waiting for AuthContext to finish loading...');
                return;
            }

            console.log('HOME_PAGE_LOG: AuthContext finished, starting data fetch.');
            setLoadingData(true);

            const { data: manuscriptsData, error: manuscriptsError } = await supabase
                .from('manuskrip')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(8);

            if (manuscriptsData) setLatestManuscripts(manuscriptsData);
            else console.error("HOME_PAGE_ERROR: Error fetching latest manuscripts:", manuscriptsError?.message);

            const { data: postsData, error: postsError } = await supabase
                .from('blog')
                .select('id, judul_artikel, penulis, isi_artikel, status, tanggal_publikasi, url_thumbnail, created_at')
                .eq('status', BlogStatus.PUBLISHED)
                .order('tanggal_publikasi', { ascending: false })
                .limit(3);

            if (postsData) {
                setLatestPosts(postsData);
                if (postsData.length > 0 && postsData[0].tanggal_publikasi) {
                    setLastUpdate(new Date(postsData[0].tanggal_publikasi).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }));
                }
            } else console.error("HOME_PAGE_ERROR: Error fetching latest blog posts:", postsError?.message);

            const { count, error: countError } = await supabase
                .from('manuskrip')
                .select('*', { count: 'exact', head: true });

            if (count !== null) setTotalManuscripts(count);
            else console.error("HOME_PAGE_ERROR: Error fetching manuscript count:", countError?.message);

            setLoadingData(false);
            console.log('HOME_PAGE_LOG: Data fetch finished.');
        };

        fetchData();
    }, [authLoading]); // Panggil ulang fetchData hanya saat authLoading berubah

    // Tampilkan loading jika AuthContext atau data spesifik halaman sedang dimuat
    console.log('HOME_PAGE_STATE: Rendering. authLoading:', authLoading, 'loadingData:', loadingData);
    if (authLoading || loadingData) {
        return <div className="text-center py-20 text-gray-700 dark:text-gray-300">Memuat konten...</div>
    }

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20 px-4 rounded-xl shadow-lg">
                <h1 className="text-5xl md:text-6xl font-extrabold font-serif text-primary-900 dark:text-white leading-tight">
                    Galeri Manuskrip
                </h1>
                <p className="text-3xl md:text-4xl font-extrabold font-serif text-primary-700 dark:text-primary-300 leading-tight mt-2">
                    Sampurnan
                </p>
                <p className="mt-6 max-w-3xl mx-auto text-xl text-primary-700 dark:text-primary-200">
                    Mempersembahkan koleksi naskah kuno dari Pondok Pesantren Qomaruddin, jembatan menuju warisan budaya dan ilmu pengetahuan.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center text-lg bg-white dark:bg-gray-700 px-5 py-3 rounded-full shadow-md">
                        <BookOpenIcon className="h-6 w-6 mr-3 text-primary-600 dark:text-accent-400" />
                        <span>Total <strong>{totalManuscripts}</strong> Manuskrip</span>
                    </div>
                    {lastUpdate && (
                        <div className="flex items-center text-lg bg-white dark:bg-gray-700 px-5 py-3 rounded-full shadow-md">
                            <CalendarIcon className="h-6 w-6 mr-3 text-primary-600 dark:text-accent-400" />
                            <span>Update Terakhir: <strong>{lastUpdate}</strong></span>
                        </div>
                    )}
                </div>
                <div className="mt-12">
                    <Link
                        to="/katalog"
                        className="inline-flex items-center px-10 py-4 bg-primary-600 text-white font-bold text-xl rounded-full hover:bg-primary-700 dark:bg-accent-500 dark:hover:bg-accent-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        Jelajahi Katalog
                        <ArrowRightIcon className="ml-3 h-6 w-6" />
                    </Link>
                </div>
            </section>

            {/* Latest Manuscripts Section */}
            <section className="py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold font-serif text-gray-900 dark:text-white">Manuskrip Terbaru</h2>
                    <Link to="/katalog" className="text-primary-600 dark:text-accent-400 hover:underline text-lg flex items-center">
                        Lihat Semua
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                </div>
                {latestManuscripts.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">Belum ada manuskrip terbaru yang ditemukan.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-12">
                        {latestManuscripts.map(ms => (
                            <ManuscriptCard key={ms.kode_inventarisasi} manuscript={ms} />
                        ))}
                    </div>
                )}
            </section>

            {/* Latest Blog Posts Section */}
            <section className="py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold font-serif text-gray-900 dark:text-white">Artikel Terkini</h2>
                    <Link to="/blog" className="text-primary-600 dark:text-accent-400 hover:underline text-lg flex items-center">
                        Lihat Semua
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                </div>
                {latestPosts.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">Belum ada artikel terbaru yang dipublikasikan.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestPosts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;