import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { manuscripts } from '../data/mockData';
import { Manuskrip } from '../types';
import { askAboutManuscript } from '../services/geminiService';
import { SparklesIcon } from '../components/icons';

const ManuscriptDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [manuscript, setManuscript] = useState<Manuskrip | null>(null);
    const [activeTab, setActiveTab] = useState('info');
    const [mainImage, setMainImage] = useState('');
    const [contentImages, setContentImages] = useState<string[]>([]);
    
    const [aiQuestion, setAiQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    useEffect(() => {
        const foundManuscript = manuscripts.find(ms => ms.kode_inventarisasi === id) || null;
        setManuscript(foundManuscript);
        if (foundManuscript) {
            setMainImage(foundManuscript.url_kover);
            const urls = foundManuscript.url_konten.split('\n').filter(url => url.trim() !== '');
            setContentImages(urls);
        }
    }, [id]);

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

    if (!manuscript) {
        return <div className="text-center py-16">Manuskrip tidak ditemukan.</div>;
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
                        <DetailItem label="Link Digital" value={<a href={manuscript.link_digital_afiliasi} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">{manuscript.link_digital_afiliasi}</a>} />
                    </dl>
                );
            case 'fisik':
                return (
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DetailItem label="Kondisi Fisik" value={manuscript.kondisi_fisik_naskah} />
                        <DetailItem label="Ukuran Dimensi" value={manuscript.ukuran_dimensi} />
                        <DetailItem label="Kover" value={manuscript.kover} />
                        <DetailItem label="Jilid" value={manuscript.jilid} />
                        <DetailItem label="Jumlah Halaman" value={manuscript.jumlah_halaman} />
                        <DetailItem label="Halaman Kosong" value={manuscript.halaman_kosong} />
                        <DetailItem label="Tinta" value={manuscript.tinta} />
                        <DetailItem label="Watermark" value={manuscript.watermark} />
                        <DetailItem label="Keterbacaan" value={manuscript.keterbacaan} />
                        <DetailItem label="Kelengkapan Naskah" value={manuscript.kelengkapan_naskah} />
                    </dl>
                );
            case 'produksi':
                return (
                     <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DetailItem label="Pengarang" value={manuscript.pengarang} />
                        <DetailItem label="Penyalin" value={manuscript.penyalin} />
                        <DetailItem label="Tahun Penulisan" value={`${manuscript.tahun_penulisan_di_teks} (${manuscript.konversi_masehi} M)`} />
                        <DetailItem label="Lokasi Penyalina" value={manuscript.lokasi_penyalina} />
                        <DetailItem label="Asal Usul Naskah" value={manuscript.asal_usul_naskah} />
                        <DetailItem label="Bahasa" value={manuscript.bahasa} />
                        <DetailItem label="Aksara" value={manuscript.aksara} />
                        <DetailItem label="Kolofon" value={manuscript.kolofon} />
                        <DetailItem label="Catatan Tambahan" value={manuscript.catatan_catatan} />
                    </dl>
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
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border dark:border-gray-700 mb-4">
                        <img src={mainImage} alt="Kover utama" className="w-full h-full object-contain"/>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                         <img src={manuscript.url_kover} onClick={() => setMainImage(manuscript.url_kover)} alt="thumbnail kover" className={`cursor-pointer rounded-md border-2 ${mainImage === manuscript.url_kover ? 'border-primary-500' : 'border-transparent'} hover:border-primary-500`}/>
                        {contentImages.slice(0, 4).map((img, index) => (
                           <img key={index} src={img} onClick={() => setMainImage(img)} alt={`thumbnail ${index + 1}`} className={`cursor-pointer rounded-md border-2 ${mainImage === img ? 'border-primary-500' : 'border-transparent'} hover:border-primary-500`}/>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-3">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setActiveTab('info')} className={`${activeTab === 'info' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Informasi Utama</button>
                            <button onClick={() => setActiveTab('fisik')} className={`${activeTab === 'fisik' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Atribut Fisik</button>
                            <button onClick={() => setActiveTab('produksi')} className={`${activeTab === 'produksi' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Konten & Produksi</button>
                        </nav>
                    </div>
                    <div className="mt-6">{renderTabContent()}</div>
                </div>
            </div>

            {/* Ask AI Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold font-serif flex items-center gap-2">
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
                        className="flex-grow p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500"
                        disabled={isAiLoading}
                    />
                    <button type="submit" className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 disabled:bg-gray-400 flex items-center justify-center" disabled={isAiLoading}>
                        {isAiLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Tanya'}
                    </button>
                </form>
                {aiResponse && (
                    <div className="mt-4 p-4 bg-primary-50 dark:bg-gray-900 rounded-md">
                        <p className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200">{aiResponse}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManuscriptDetailPage;