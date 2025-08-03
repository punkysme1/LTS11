// src/pages/ManuscriptDetailPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const ManuscriptDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { manuscripts, loading: dataLoading } = useData();
    const { role, loading: authLoading, isInitialized } = useAuth();
    
    const manuscript = manuscripts.find(m => m.kode_inventarisasi === id);

    const [activeTab, setActiveTab] = useState('info');
    const [mainImage, setMainImage] = useState('');
    const [allImages, setAllImages] = useState<string[]>([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (manuscript) {
            const coverUrl = manuscript.url_kover || '';
            
            // Logika parsing yang lebih kuat untuk url_konten
            const rawContentUrls = (manuscript as any).url_konten || '';
            const contentUrls = (rawContentUrls.trim() === '' || rawContentUrls.trim() === '[]')
                ? [] // Jika kosong atau '[]', jadikan array kosong
                : rawContentUrls
                    .split('\n')
                    .map((url: string) => url.trim())
                    .filter(Boolean); // Filter URL yang valid
            
            const combinedImages = [coverUrl, ...contentUrls].filter(Boolean);
            setAllImages(combinedImages);
            setMainImage(coverUrl || combinedImages[0] || '');
        }
    }, [manuscript]);

    const openLightbox = useCallback((index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    }, []);

    if (!isInitialized || authLoading || dataLoading) {
        return <div className="text-center py-16">Memuat detail manuskrip...</div>;
    }

    if (!manuscript) {
        return <div className="text-center py-16 text-red-600">Manuskrip tidak ditemukan.</div>;
    }
    
    const DetailItem: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
        (value && value.toString().trim() !== '') ? (
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-500 dark:text-gray-400">{label}</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-gray-900 dark:text-gray-200">{value}</dd>
            </div>
        ) : null
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DetailItem label="Deskripsi Umum" value={manuscript.deskripsi_umum} />
                        <DetailItem label="Kategori Ilmu" value={manuscript.kategori_ilmu_pesantren} />
                        <DetailItem label="Bahasa" value={manuscript.bahasa} />
                        <DetailItem label="Aksara" value={manuscript.aksara} />
                    </dl>
                );
            case 'fisik':
                 return (
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DetailItem label="Kondisi Fisik" value={(manuscript as any).kondisi_fisik_naskah} />
                        <DetailItem label="Ukuran Dimensi" value={(manuscript as any).ukuran_dimensi} />
                        <DetailItem label="Jumlah Halaman" value={(manuscript as any).jumlah_halaman} />
                        <DetailItem label="Jenis Kertas" value={(manuscript as any).jenis_kertas} />
                    </dl>
                );
            case 'produksi':
                 return (
                     <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DetailItem label="Pengarang" value={manuscript.pengarang} />
                        <DetailItem label="Penyalin" value={(manuscript as any).penyalin} />
                        <DetailItem label="Tahun Penulisan" value={`${(manuscript as any).tahun_penulisan_di_teks || '-'}`} />
                        <DetailItem label="Lokasi Penyalinan" value={(manuscript as any).lokasi_penyalina} />
                    </dl>
                );
            default: return null;
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 my-8 max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-900 dark:text-white mb-2">{manuscript.judul_dari_tim}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">{manuscript.kode_inventarisasi}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border dark:border-gray-700 mb-4 bg-gray-100 dark:bg-gray-900">
                        {mainImage ? (
                            <img
                                src={mainImage}
                                alt="Kover utama"
                                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                                onClick={() => openLightbox(allImages.indexOf(mainImage))}
                            />
                        ) : <div className="flex items-center justify-center h-full text-gray-500">Gambar tidak tersedia</div>}
                    </div>
                    {allImages.length > 1 && (
                        <div className="flex overflow-x-auto space-x-2 pb-2">
                            {allImages.map((imgUrl, index) => (
                                <img
                                    key={index}
                                    src={imgUrl}
                                    onClick={() => setMainImage(imgUrl)}
                                    alt={`thumbnail ${index + 1}`}
                                    className={`flex-none w-20 h-24 object-cover rounded-md border-2 ${mainImage === imgUrl ? 'border-primary-500' : 'border-transparent hover:border-gray-400'} cursor-pointer`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-3">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('info')} className={`${activeTab === 'info' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Informasi</button>
                            <button onClick={() => setActiveTab('fisik')} className={`${activeTab === 'fisik' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Atribut Fisik</button>
                            <button onClick={() => setActiveTab('produksi')} className={`${activeTab === 'produksi' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Produksi</button>
                        </nav>
                    </div>
                    <div className="mt-6">{renderTabContent()}</div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold font-serif mb-4 text-gray-900 dark:text-white">Komentar dan Diskusi</h2>
                {role === 'verified_user' || role === 'admin' ? (
                    <CommentForm targetId={manuscript.kode_inventarisasi} type="manuskrip" />
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">Silakan <Link to="/login" className="text-primary-600 hover:underline">login</Link> untuk berkomentar.</p>
                )}
                <CommentList targetId={manuscript.kode_inventarisasi} type="manuskrip" userRole={role} />
            </div>

            {lightboxOpen && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={allImages.map(url => ({ src: url }))}
                    index={currentImageIndex}
                />
            )}
        </div>
    );
};

export default ManuscriptDetailPage;