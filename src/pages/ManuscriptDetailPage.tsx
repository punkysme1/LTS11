import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import ShareButtons from '../components/ShareButtons';

const ManuscriptDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { manuscripts, loading: dataLoading } = useData();
    // 'role' sekarang akan digunakan
    const { role, loading: authLoading, isInitialized } = useAuth(); 
    
    const manuscript = manuscripts.find(m => m.kode_inventarisasi === id);

    const [activeTab, setActiveTab] = useState('infoUmum');
    // 'mainImage' sekarang akan digunakan
    const [mainImage, setMainImage] = useState(''); 
    const [allImages, setAllImages] = useState<string[]>([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (manuscript) {
            const coverUrl = manuscript.url_kover || '';
            const rawContentUrls = manuscript.url_konten || '';
            const contentUrls = (rawContentUrls.trim() === '' || rawContentUrls.trim() === '[]')
                ? []
                : rawContentUrls.split('\n').map((url: string) => url.trim()).filter(Boolean);
            
            const combinedImages = [coverUrl, ...contentUrls].filter(Boolean);
            setAllImages(combinedImages);
            setMainImage(coverUrl || combinedImages[0] || '');
        }
    }, [manuscript]);

    // 'openLightbox' sekarang akan digunakan
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
    
    const currentUrl = window.location.href;
    const description = manuscript.deskripsi_umum?.substring(0, 155) + '...' || 'Detail manuskrip dari Pusat Digitalisasi Manuskrip Qomaruddin.';

    // 'DetailItem' sekarang akan digunakan di dalam renderTabContent
    const DetailItem: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
        (value && value.toString().trim() !== '' && value.toString().trim() !== 'null') ? (
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200 dark:border-gray-700 first:border-t-0">
                <dt className="font-medium text-gray-500 dark:text-gray-400">{label}</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{value}</dd>
            </div>
        ) : null
    );
    
    // 'renderLink' sekarang akan digunakan di dalam renderTabContent
    const renderLink = (url: string | undefined, text: string) => {
        if (!url) return text;
        return <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{text}</a>;
    }

    // 'renderTabContent' sekarang berisi implementasi lengkap dan akan dipanggil
    const renderTabContent = () => {
        switch (activeTab) {
            case 'infoUmum':
                return (
                    <dl>
                        <DetailItem label="Deskripsi Umum" value={manuscript.deskripsi_umum} />
                        <DetailItem label="Klasifikasi Kailani" value={manuscript.klasifikasi_kailani} />
                        <DetailItem label="Kategori Ilmu" value={manuscript.kategori_ilmu_pesantren} />
                        <DetailItem label="Bahasa" value={manuscript.bahasa} />
                        <DetailItem label="Aksara" value={manuscript.aksara} />
                        <DetailItem label="Asal Usul Naskah" value={manuscript.asal_usul_naskah} />
                    </dl>
                );
            case 'fisik':
                 return (
                    <dl>
                        <DetailItem label="Kondisi Fisik" value={manuscript.kondisi_fisik_naskah} />
                        <DetailItem label="Ukuran Dimensi" value={manuscript.ukuran_dimensi} />
                        <DetailItem label="Jumlah Halaman" value={manuscript.jumlah_halaman} />
                        <DetailItem label="Halaman Kosong" value={manuscript.halaman_kosong} />
                        <DetailItem label="Baris per Halaman" value={manuscript.jumlah_baris_per_halaman} />
                        <DetailItem label="Jenis Kertas" value={manuscript.jenis_kertas} />
                        <DetailItem label="Ukuran Kertas" value={manuscript.ukuran_kertas} />
                        <DetailItem label="Watermark" value={manuscript.watermark} />
                        <DetailItem label="Countermark" value={manuscript.countermark} />
                        <DetailItem label="Tinta" value={manuscript.tinta} />
                        <DetailItem label="Kover" value={manuscript.kover} />
                        <DetailItem label="Ukuran Kover" value={manuscript.ukuran_kover} />
                        <DetailItem label="Jilid" value={manuscript.jilid} />
                    </dl>
                );
            case 'produksi':
                 return (
                     <dl>
                        <DetailItem label="Pengarang" value={manuscript.pengarang} />
                        <DetailItem label="Penyalin" value={manuscript.penyalin} />
                        <DetailItem label="Tahun Penulisan" value={manuscript.tahun_penulisan_di_teks} />
                        <DetailItem label="Konversi Masehi" value={manuscript.konversi_masehi} />
                        <DetailItem label="Lokasi Penyalinan" value={manuscript.lokasi_penyalina} />
                     </dl>
                );
            case 'catatan':
                return (
                    <dl>
                        <DetailItem label="Kolofon" value={manuscript.kolofon} />
                        <DetailItem label="Rubrikasi" value={manuscript.rubrikasi} />
                        <DetailItem label="Iluminasi" value={manuscript.iluminasi} />
                        <DetailItem label="Ilustrasi" value={manuscript.ilustrasi} />
                        <DetailItem label="Catatan Pinggir" value={manuscript.catatan_pinggir} />
                        <DetailItem label="Catatan Makna" value={manuscript.catatan_makna} />
                        <DetailItem label="Catatan Marginal" value={manuscript.catatan_marginal} />
                        <DetailItem label="Catatan Tambahan" value={manuscript.catatan_catatan} />
                        <DetailItem label="Halaman Pemisah" value={manuscript.hlm_pemisah} />
                        <DetailItem label="Keterbacaan" value={manuscript.keterbacaan} />
                        <DetailItem label="Kelengkapan Naskah" value={manuscript.kelengkapan_naskah} />
                    </dl>
                );
            case 'relasi':
                return (
                    <dl>
                        <DetailItem label="Afiliasi" value={manuscript.afiliasi} />
                        <DetailItem label="Nama Koleksi" value={manuscript.nama_koleksi} />
                        <DetailItem label="Nomor Koleksi" value={manuscript.nomor_koleksi} />
                        <DetailItem label="Judul Afiliasi" value={manuscript.judul_dari_afiliasi} />
                        <DetailItem label="Nomor Digitalisasi" value={manuscript.nomor_digitalisasi} />
                        <DetailItem label="Link Digital Afiliasi" value={renderLink(manuscript.link_digital_afiliasi, manuscript.link_digital_afiliasi || 'Tidak tersedia')} />
                        <DetailItem label="Link Digital TPPKP" value={renderLink(manuscript.link_digital_tppkp_qomaruddin, manuscript.link_digital_tppkp_qomaruddin || 'Tidak tersedia')} />
                        <DetailItem label="Kata Kunci" value={manuscript.kata_kunci} />
                        <DetailItem label="Manuskrip Terkait" value={manuscript.manuskrip_terkait} />
                        <DetailItem label="Tokoh Terkait" value={manuscript.tokoh_terkait} />
                        <DetailItem label="Glosarium" value={manuscript.glosarium} />
                        {manuscript.referensi && manuscript.referensi.length > 0 && (
                            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-t border-gray-200 dark:border-gray-700">
                                <dt className="font-medium text-gray-500 dark:text-gray-400">Referensi</dt>
                                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-gray-800 dark:text-gray-200">
                                    <ul className="list-disc list-inside space-y-2">
                                        {manuscript.referensi.map((ref, index) => (
                                            <li key={index}>
                                                {ref.penulis}, {ref.judul}, ({ref.tahun}). {ref.link && renderLink(ref.link, 'Akses sumber')}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        )}
                    </dl>
                )
            default: return null;
        }
    };
    
    // 'TabButton' sekarang akan digunakan untuk merender tombol tab
    const TabButton: React.FC<{tabId: string, label: string}> = ({tabId, label}) => (
        <button 
            onClick={() => setActiveTab(tabId)} 
            className={`${activeTab === tabId ? 'border-primary-500 text-primary-600 dark:text-accent-300' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm transition-colors`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 md:p-8 my-8 max-w-7xl mx-auto">
            <Helmet>
                <title>{`${manuscript.judul_dari_tim} - Manuskrip Qomaruddin`}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={manuscript.judul_dari_tim} />
                <meta property="og:description" content={description} />
                {manuscript.url_kover && <meta property="og:image" content={manuscript.url_kover} />}
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={manuscript.judul_dari_tim} />
                <meta name="twitter:description" content={description} />
                {manuscript.url_kover && <meta name="twitter:image" content={manuscript.url_kover} />}
            </Helmet>

            <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-900 dark:text-white mb-2">{manuscript.judul_dari_tim}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">{manuscript.kode_inventarisasi}</p>

            <ShareButtons url={currentUrl} title={manuscript.judul_dari_tim} className="mb-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2">
                    <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden border dark:border-gray-700 mb-4 bg-gray-100 dark:bg-gray-900">
                        {mainImage ? (
                            <img
                                src={mainImage}
                                alt="Kover utama"
                                className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                                // Memanggil openLightbox
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
                    <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                        <nav className="-mb-px flex space-x-2 sm:space-x-4" aria-label="Tabs">
                            {/* Memanggil TabButton */}
                            <TabButton tabId="infoUmum" label="Info Umum" />
                            <TabButton tabId="fisik" label="Atribut Fisik" />
                            <TabButton tabId="produksi" label="Produksi" />
                            <TabButton tabId="catatan" label="Catatan" />
                            <TabButton tabId="relasi" label="Relasi & Ref." />
                        </nav>
                    </div>
                    {/* Memanggil renderTabContent */}
                    <div className="mt-6">{renderTabContent()}</div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold font-serif mb-4 text-gray-900 dark:text-white">Komentar dan Diskusi</h2>
                {/* Menggunakan 'role' dan merender 'CommentForm' serta 'Link' */}
                {role === 'verified_user' || role === 'admin' ? (
                    <CommentForm targetId={manuscript.kode_inventarisasi} type="manuskrip" />
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                        Silakan <Link to="/login" className="text-primary-600 hover:underline">login</Link> untuk berkomentar.
                    </p>
                )}
                {/* Merender 'CommentList' */}
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