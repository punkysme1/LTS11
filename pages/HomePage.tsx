import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Manuskrip, BlogPost } from '../types'; // Tipe data tetap digunakan
import { supabase } from '../src/supabaseClient'; // Pastikan path ini benar
import ManuscriptCard from '../components/ManuscriptCard';
import BlogCard from '../components/BlogCard';
import { BookOpenIcon, CalendarIcon } from '../components/icons';

const HomePage: React.FC = () => {
    const [latestManuscripts, setLatestManuscripts] = useState<Manuskrip[]>([]);
    const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
    const [totalManuscripts, setTotalManuscripts] = useState(0);
    const [lastUpdate, setLastUpdate] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Fetch 4 manuskrip terbaru
            const { data: manuscriptsData, error: manuscriptsError } = await supabase
                .from('manuskrip')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(4);
            
            if (manuscriptsData) setLatestManuscripts(manuscriptsData);

            // Fetch 3 artikel terpublikasi terbaru
            const { data: postsData, error: postsError } = await supabase
                .from('blog')
                .select('*')
                .eq('status', 'PUBLISHED')
                .order('tanggal_publikasi', { ascending: false })
                .limit(3);

            if (postsData) {
                setLatestPosts(postsData);
                if (postsData.length > 0) {
                    setLastUpdate(new Date(postsData[0].tanggal_publikasi).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }));
                }
            }

            // Fetch total jumlah manuskrip
            const { count, error: countError } = await supabase
                .from('manuskrip')
                .select('*', { count: 'exact', head: true });
            
            if (count) setTotalManuscripts(count);
            
            // Handle errors jika perlu
            if (manuscriptsError) console.error("Error fetching manuscripts:", manuscriptsError.message);
            if (postsError) console.error("Error fetching blog posts:", postsError.message);
            if (countError) console.error("Error fetching count:", countError.message);

            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Memuat data...</div>
    }

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center bg-primary-50 dark:bg-primary-950/50 py-20 px-4 rounded-xl">
                <h1 className="text-5xl md:text-6xl font-extrabold font-serif text-primary-900 dark:text-white">
                    Galeri Manuskrip Sampurnan
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-700 dark:text-primary-200">
                    Menjelajahi khazanah intelektual dan warisan budaya melalui koleksi naskah kuno Pondok Pesantren Qomaruddin.
                </p>
                <div className="mt-8 flex justify-center items-center space-x-6 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                        <BookOpenIcon className="h-5 w-5 mr-2" />
                        <span>Total <strong>{totalManuscripts}</strong> Manuskrip</span>
                    </div>
                    {lastUpdate && (
                        <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2" />
                            <span>Update Terakhir: <strong>{lastUpdate}</strong></span>
                        </div>
                    )}
                </div>
                <div className="mt-10">
                    <Link
                        to="/katalog"
                        className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 dark:bg-accent-500 dark:hover:bg-accent-600 transition-colors duration-300 shadow-lg"
                    >
                        Jelajahi Katalog
                    </Link>
                </div>
            </section>
            
            {/* Latest Manuscripts Section */}
            <section>
                <h2 className="text-3xl font-bold font-serif text-center mb-8">Manuskrip Terbaru</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {latestManuscripts.map(ms => (
                        <ManuscriptCard key={ms.kode_inventarisasi} manuscript={ms} />
                    ))}
                </div>
            </section>

            {/* Latest Blog Posts Section */}
            <section>
                <h2 className="text-3xl font-bold font-serif text-center mb-8">Artikel Terkini</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;