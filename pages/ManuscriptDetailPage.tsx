import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';
import { Manuskrip } from '../types';
import { askAboutManuscript } from '../services/geminiService';
import { SparklesIcon } from '../components/icons';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// HAPUS IMPORT LIBRARY SITASI INI
// import { Cite, plugins } from '@citation-js/core';
// import '@citation-js/plugin-csl';

const ManuscriptDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [manuscript, setManuscript] = useState<Manuskrip | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('info');

    const [mainImage, setMainImage] = useState('');

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [allImages, setAllImages] = useState<string[]>([]);

    const [aiQuestion, setAiQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    // HAPUS STATE UNTUK SITASI INI
    // const [selectedCitationStyle, setSelectedCitationStyle] = useState('apa');
    // const [generatedCitation, setGeneratedCitation] = useState('');

    useEffect(() => {
        const fetchManuscriptDetail = async () => {
            if (!id) {
                setError('ID manuskrip tidak ada di URL.');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase
                    .from('manuskrip')
                    .select('*')
                    .eq('kode_inventarisasi', id)
                    .single();

                if (error) {
                    throw error;
                }
                
                if (data) {
                    setManuscript(data as Manuskrip);
                    
                    const coverUrl = data.url_kover || '';
                    const contentUrls = (data.url_konten || '')
                                        .split('\n')
                                        .map(url => url.trim())
                                        .filter(url => url !== '');
                    
                    const combinedImages = [coverUrl, ...contentUrls].filter(url => url !== '');
                    setAllImages(combinedImages);
                    
                    setMainImage(coverUrl || (contentUrls.length > 0 ? contentUrls[0] : ''));

                } else {
                    setError('Manuskrip tidak ditemukan.');
                }
            } catch (err: any) {
                console.error('Error fetching manuscript detail:', err.message);
                setError('Gagal memuat detail manuskrip: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchManuscriptDetail();
        }
    }, [id]);

    // HAPUS useEffect UNTUK GENERASI SITASI INI
    // useEffect(() => {
    //     if (manuscript) {
    //         const cslData = {
    //             id: manuscript.kode_inventarisasi,
    //             type: 'book',
    //             title: manuscript.judul_dari_tim,
    //             author: manuscript.pengarang ? [{ "family": manuscript.pengarang.split(' ').pop() || '', "given": manuscript.pengarang.split(' ').slice(0, -1).join(' ') }] : [],
    //             issued: manuscript.konversi_masehi ? { 'date-parts': [[manuscript.konversi_masehi]] } : undefined,
    //             'publisher-place': manuscript.lokasi_penyalina,
    //             URL: manuscript.link_digital_afiliasi,
    //         };
    //         const cite = new Cite(cslData);
    //         try {
    //             const citationHtml = cite.format('bibliography', {
    //                 format: 'html',
    //                 template: selectedCitationStyle,
    //                 lang: 'id-ID'
    //             });
    //             setGeneratedCitation(citationHtml);
    //         } catch (e) {
    //             console.error('Error generating citation:', e);
    //             setGeneratedCitation(`Gagal membuat sitasi untuk gaya ${selectedCitationStyle}. Pastikan data manuskrip lengkap.`);
    //         }
    //     }
    // }, [manuscript, selectedCitationStyle]);


    const openLightbox = useCallback((index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    }, []);

    const handleAiSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiQuestion.trim() || !manuscript) return;

        setIsAiLoading(true);
        setAiResponse('');

        try {
            const stream = await askAboutManuscript(aiQuestion, manuscript);
            for await (const chunk of stream) {
                setAiResponse(prev => prev + chunk.text);
            }
        } catch (error) {
            console.error("Error asking AI:", error);
            setAiResponse("Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi nanti.");
        } finally {
            setIsAiLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-16 text-gray-700 dark:text-gray-300">Memuat detail manuskrip...</div>;
    }

    if (error || !manuscript) {
        return <div className="text-center py-16 text-red-600 dark:text-red-400">{error || 'Artikel tidak ditemukan.'}</div>;
    }
    
    const DetailItem: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
        value ? <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4"><dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt><dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{value}</dd></div> : null
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DetailItem label="Deskripsi Umum" value={manuscript.deskripsi_umum} />
                        <DetailItem label="Klasifikasi Kailani" value={manuscript.klasifikasi_kailani} />
                        <DetailItem label="Kategori Ilmu Pesantren" value={manuscript.kategori_ilmu_pesantren} />
                        <DetailItem label="Afiliasi" value={manuscript.afiliasi} />
                        <DetailItem label="Nama Koleksi" value={manuscript.nama_koleksi} />
                        <DetailItem label="Nomor Koleksi" value={manuscript.nomor_koleksi} />
                        <DetailItem label="Nomor Digitalisasi" value={manuscript.nomor_digitalisasi} />
                        <DetailItem label="Link Digital Afiliasi" value={manuscript.link_digital_afiliasi ? <a href={manuscript.link_digital_afiliasi} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">{manuscript.link_digital_afiliasi}</a> : null} />
                        <DetailItem label="Link Digital TPPKP Qomaruddin" value={manuscript.link_digital_tppkp_qomaruddin ? <a href={manuscript.link_digital_tppkp_qomaruddin} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">{manuscript.link_digital_tppkp_qomaruddin}</a> : null} />
                    </dl>
                );
            case 'fisik':
                return (
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DetailItem label="Kondisi Fisik" value={manuscript.kondisi_fisik_naskah} />
                        <DetailItem label="Ukuran Dimensi" value={manuscript.ukuran_dimensi} />
                        <DetailItem label="Kover" value={manuscript.kover} />
                        <DetailItem label="Ukuran Kover" value={manuscript.ukuran_kover} />
                        <DetailItem label="Jilid" value={manuscript.jilid} />
                        <DetailItem label="Ukuran Kertas" value={manuscript.ukuran_kertas} />
                        <DetailItem label="Tinta" value={manuscript.tinta} />
                        <DetailItem label="Watermark" value={manuscript.watermark} />
                        <DetailItem label="Countermark" value={manuscript.countermark} />
                        <DetailItem label="Jumlah Halaman" value={manuscript.jumlah_halaman} />
                        <DetailItem label="Halaman Kosong" value={manuscript.halaman_kosong} />
                        <DetailItem label="Jumlah Baris per Halaman" value={manuscript.jumlah_baris_per_halaman} />
                        <DetailItem label="Rubrikasi" value={manuscript.rubrikasi} />
                        <DetailItem label="Iluminasi" value={manuscript.iluminasi} />
                        <DetailItem label="Ilustrasi" value={manuscript.ilustrasi} />
                        <DetailItem label="Catatan Pinggir" value={manuscript.catatan_pinggir} />
                        <DetailItem label="Catatan Makna" value={manuscript.catatan_makna} />
                        <DetailItem label="Keterbacaan" value={manuscript.keterbacaan} />
                        <DetailItem label="Kelengkapan Naskah" value={manuscript.kelengkapan_naskah} />
                        <DetailItem label="Halaman Pemisah" value={manuscript.hlm_pemisah} />
                    </dl>
                );
            case 'produksi':
                return (
                     <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DetailItem label="Pengarang" value={manuscript.pengarang} />
                        <DetailItem label="Penyalin" value={manuscript.penyalin} />
                        <DetailItem label="Tahun Penulisan" value={`${manuscript.tahun_penulisan_di_teks || '-'} (${manuscript.konversi_masehi || '-'} M)`} />
                        <DetailItem label="Lokasi Penyalina" value={manuscript.lokasi_penyalina} />
                        <DetailItem label="Asal Usul Naskah" value={manuscript.asal_usul_naskah} />
                        <DetailItem label="Bahasa" value={manuscript.bahasa} />
                        <DetailItem label="Aksara" value={manuscript.aksara} />
                        <DetailItem label="Kolofon" value={manuscript.kolofon} />
                        <DetailItem label="Catatan Tambahan" value={manuscript.catatan_catatan} />
                        <DetailItem label="Catatan Marginal" value={manuscript.catatan_marginal} />
                    </dl>
                );
            case 'referensi': // Tab referensi tetap ada untuk field yang baru
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Detail Referensi</h3>
                        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                            <DetailItem label="Kata Kunci" value={manuscript.kata_kunci} />
                            <DetailItem label="Glosarium" value={manuscript.glosarium} />
                            <DetailItem label="Manuskrip Terkait" value={manuscript.manuskrip_terkait} />
                            <DetailItem label="Tokoh Terkait" value={manuscript.tokoh_terkait} />
                        </dl>

                        {manuscript.referensi && manuscript.referensi.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Daftar Referensi</h3>
                                <ul className="space-y-4">
                                    {manuscript.referensi.map((ref, index) => (
                                        <li key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                                            <p className="text-gray-800 dark:text-gray-200"><strong>Judul:</strong> {ref.judul}</p>
                                            <p className="text-gray-700 dark:text-gray-300"><strong>Penulis:</strong> {ref.penulis}</p>
                                            <p className="text-gray-700 dark:text-gray-300"><strong>Tahun:</strong> {ref.tahun}</p>
                                            {ref.link && <p className="text-gray-700 dark:text-gray-300"><strong>Link:</strong> <a href={ref.link} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">{ref.link}</a></p>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* HAPUS BAGIAN SITASI OTOMATIS INI */}
                        {/* <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Sitasi Otomatis</h3>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {['apa', 'mla', 'chicago', 'harvard', 'ieee', 'vancouver'].map(style => (
                                    <button
                                        key={style}
                                        onClick={() => setSelectedCitationStyle(style)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCitationStyle === style ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} hover:bg-primary-500 dark:hover:bg-gray-600 transition-colors`}
                                    >
                                        {style.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                                <code className="block whitespace-pre-wrap text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: generatedCitation }}></code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(generatedCitation.replace(/<[^>]*>?/gm, ''))}
                                    className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm"
                                >
                                    Salin Sitasi
                                </button>
                            </div>
                        </div> */}
                    </div>
                );
            default: return null;
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-900 dark:text-white mb-2">{manuscript.judul_dari_tim}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">{manuscript.kode_inventarisasi}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Image Gallery */}
                <div className="lg:col-span-2">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-4 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {mainImage ? (
                            <img
                                src={mainImage}
                                alt="Kover utama"
                                className="w-full h-full object-contain cursor-pointer"
                                onClick={() => openLightbox(allImages.indexOf(mainImage))}
                            />
                        ) : (
                            <span className="text-gray-500 dark:text-gray-400">Tidak ada gambar</span>
                        )}
                    </div>
                    {/* Thumbnails */}
                    <div className="grid grid-cols-5 gap-2">
                         {allImages.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                onClick={() => {
                                    setMainImage(imgUrl);
                                    openLightbox(index);
                                }}
                                alt={`thumbnail ${index + 1}`}
                                className={`cursor-pointer rounded-md border-2 ${mainImage === imgUrl ? 'border-primary-500' : 'border-transparent'} hover:border-primary-500 object-cover w-full h-16`}
                            />
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-3">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('info')} className={`${activeTab === 'info' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Informasi Utama</button>
                            <button onClick={() => setActiveTab('fisik')} className={`${activeTab === 'fisik' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Atribut Fisik</button>
                            <button onClick={() => setActiveTab('produksi')} className={`${activeTab === 'produksi' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Konten & Produksi</button>
                            <button onClick={() => setActiveTab('referensi')} className={`${activeTab === 'referensi' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}>Referensi</button>
                        </nav>
                    </div>
                    <div className="mt-6">{renderTabContent()}</div>
                </div>
            </div>

            {/* Ask AI Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold font-serif flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <SparklesIcon className="w-6 h-6 text-accent-500" />
                    Tanya AI tentang Naskah Ini
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Punya pertanyaan spesifik tentang naskah ini? Tanyakan pada asisten AI kami.</p>
                <form onSubmit={handleAiSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
                    <input 
                        type="text" 
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        placeholder="Contoh: Apa poin utama dari kitab ini?"
                        className="flex-grow p-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500"
                        disabled={isAiLoading}
                    />
                    <button type="submit" className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200" disabled={isAiLoading}>
                        {isAiLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Tanya'}
                    </button>
                </form>
                {aiResponse && (
                    <div className="mt-4 p-4 bg-primary-50 dark:bg-gray-900 rounded-md border border-primary-200 dark:border-gray-700">
                        <p className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200">{aiResponse}</p>
                    </div>
                )}
            </div>

            {/* Lightbox Component */}
            {lightboxOpen && allImages.length > 0 && (
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={allImages.map(url => ({ src: url }))}
                    index={currentImageIndex}
                    on={{
                        view: ({ index }) => setCurrentImageIndex(index),
                    }}
                />
            )}
        </div>
    );
};

export default ManuscriptDetailPage;