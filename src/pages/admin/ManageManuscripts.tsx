import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../../supabaseClient';
import { Manuskrip } from '../../../types';
import * as XLSX from 'xlsx';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '../../components/icons';

// Komponen FormField tetap sama
const MemoizedFormField: React.FC<{ name: keyof Manuskrip, label: string, type?: string, disabled?: boolean, rows?: number, value: string | number | undefined, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }> = React.memo(({ name, label, type = 'text', disabled = false, rows, value, onChange }) => {
    const displayValue = (type === 'number' && (value === 0 || value === null || value === undefined)) ? '' : (value || '');
    // ... (implementasi komponen tidak berubah)
    return (
        <div>
            <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            {type === 'textarea' ? (
                <textarea 
                    id={name as string}
                    name={name as string} 
                    value={displayValue as string} 
                    onChange={onChange} 
                    disabled={disabled} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                    rows={rows || 3}
                ></textarea>
            ) : (
                <input 
                    id={name as string}
                    type={type} 
                    name={name as string} 
                    value={displayValue as string} 
                    onChange={onChange} 
                    disabled={disabled} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                />
            )}
        </div>
    );
});

const MAX_URL_FIELDS = 15;
const MAX_REFERENCE_FIELDS = 10;
const ITEMS_PER_PAGE_ADMIN = 10;

const ManageManuscripts: React.FC = () => {
    const [manuscripts, setManuscripts] = useState<Manuskrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingManuscript, setEditingManuscript] = useState<Manuskrip | null>(null);
    const [formData, setFormData] = useState<Partial<Manuskrip>>({});
    const [isUploading, setIsUploading] = useState(false);
    const [urlContentFields, setUrlContentFields] = useState<string[]>([]);
    const [referenceFields, setReferenceFields] = useState<Array<{ judul: string; penulis: string; tahun: string; link: string }>>([]);
    const [searchTermAdmin, setSearchTermAdmin] = useState('');
    const [currentPageAdmin, setCurrentPageAdmin] = useState(1);

    const fetchManuscripts = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('manuskrip')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setManuscripts(data as Manuskrip[]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchManuscripts();
    }, [fetchManuscripts]);

    const filteredManuscripts = useMemo(() => {
        if (!searchTermAdmin) {
            return manuscripts;
        }
        const lowerCaseSearchTerm = searchTermAdmin.toLowerCase();
        return manuscripts.filter(ms => 
            (ms.judul_dari_tim && ms.judul_dari_tim.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (ms.pengarang && ms.pengarang.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (ms.kode_inventarisasi && ms.kode_inventarisasi.toLowerCase().includes(lowerCaseSearchTerm))
        );
    }, [manuscripts, searchTermAdmin]);

    const totalPagesAdmin = useMemo(() => {
        return Math.ceil(filteredManuscripts.length / ITEMS_PER_PAGE_ADMIN);
    }, [filteredManuscripts]);

    const paginatedManuscripts = useMemo(() => {
        const startIndex = (currentPageAdmin - 1) * ITEMS_PER_PAGE_ADMIN;
        const endIndex = startIndex + ITEMS_PER_PAGE_ADMIN;
        return filteredManuscripts.slice(startIndex, endIndex);
    }, [filteredManuscripts, currentPageAdmin]);

    const goToPageAdmin = useCallback((page: number) => {
        if (page >= 1 && page <= totalPagesAdmin) {
            setCurrentPageAdmin(page);
        }
    }, [totalPagesAdmin]);

    const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermAdmin(e.target.value);
        setCurrentPageAdmin(1);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? (value === '' ? null : Number(value)) : value 
        }));
    }, []);

    const handleReferenceFieldChange = useCallback((index: number, field: keyof (typeof referenceFields)[0], value: string) => {
        setReferenceFields(prevRefs => {
            const newRefs = [...prevRefs];
            newRefs[index] = { ...newRefs[index], [field]: value };
            return newRefs;
        });
    }, []);

    const handleAddReferenceField = useCallback(() => {
        if (referenceFields.length < MAX_REFERENCE_FIELDS) {
            setReferenceFields(prevRefs => [...prevRefs, { judul: '', penulis: '', tahun: '', link: '' }]);
        } else {
            alert(`Maksimal ${MAX_REFERENCE_FIELDS} referensi.`);
        }
    }, [referenceFields]);

    const handleRemoveReferenceField = useCallback((indexToRemove: number) => {
        setReferenceFields(prevRefs => {
            const newRefs = prevRefs.filter((_, index) => index !== indexToRemove);
            return newRefs.length > 0 ? newRefs : [{ judul: '', penulis: '', tahun: '', link: '' }];
        });
    }, []);


    const handleUrlFieldChange = useCallback((index: number, value: string) => {
        setUrlContentFields(prevUrls => {
            const newUrls = [...prevUrls];
            newUrls[index] = value;
            return newUrls;
        });
    }, []);

    const handleAddUrlField = useCallback(() => {
        if (urlContentFields.length < MAX_URL_FIELDS) {
            setUrlContentFields(prevUrls => [...prevUrls, '']);
        } else {
            alert(`Maksimal ${MAX_URL_FIELDS} URL gambar.`);
        }
    }, [urlContentFields]);

    const handleRemoveUrlField = useCallback((indexToRemove: number) => {
        setUrlContentFields(prevUrls => {
            const newUrls = prevUrls.filter((_, index) => index !== indexToRemove);
            return newUrls.length > 0 ? newUrls : [''];
        });
    }, []);

    const handleAdd = () => {
        setEditingManuscript(null);
        setFormData({});
        setUrlContentFields(['']);
        setReferenceFields([{ judul: '', penulis: '', tahun: '', link: '' }]);
        setShowModal(true);
    };

    const handleEdit = async (manuscript: Manuskrip) => {
        const { data, error } = await supabase
            .from('manuskrip')
            .select('*')
            .eq('kode_inventarisasi', manuscript.kode_inventarisasi)
            .single();

        if (error) {
            alert('Gagal memuat data detail: ' + error.message);
            return;
        }
        
        setEditingManuscript(data);
        setFormData(data);
        
        // --- PERBAIKAN 1: Menambahkan tipe 'string' eksplisit pada parameter 'url' ---
        const parsedUrls = (data.url_konten || '')
                            .split('\n')
                            .map((url: string) => url.trim())
                            .filter(url => url !== '');
        setUrlContentFields(parsedUrls.length > 0 ? parsedUrls : ['']);

        const parsedReferences = (data.referensi || []) as Array<{ judul: string; penulis: string; tahun: number; link: string }>;
        setReferenceFields(parsedReferences.length > 0 ? parsedReferences.map(ref => ({
            ...ref,
            tahun: ref.tahun ? String(ref.tahun) : ''
        })) : [{ judul: '', penulis: '', tahun: '', link: '' }]);

        setShowModal(true);
    };
    
    const handleDelete = async (kode_inventarisasi: string) => {
        if (window.confirm(`Yakin ingin menghapus manuskrip ${kode_inventarisasi}?`)) {
            const { error } = await supabase.from('manuskrip').delete().eq('kode_inventarisasi', kode_inventarisasi);
            if (error) alert('Gagal menghapus: ' + error.message);
            else {
                alert('Berhasil dihapus.');
                fetchManuscripts();
            }
        }
    };

    const handleSave = async () => {
        if (!formData.kode_inventarisasi || !formData.judul_dari_tim) {
            alert('Kode Inventarisasi dan Judul Tim wajib diisi.');
            return;
        }

        const finalUrlKonten = urlContentFields.filter(url => url.trim() !== '').join('\n');

        const finalReferences = referenceFields
            .filter(ref => ref.judul.trim() !== '')
            .map(ref => ({
                judul: ref.judul.trim(),
                penulis: ref.penulis.trim(),
                tahun: ref.tahun ? Number(ref.tahun) : null,
                link: ref.link.trim()
            }));
        
        const dataToSave = {
            ...formData,
            url_konten: finalUrlKonten,
            referensi: finalReferences.length > 0 ? finalReferences : null,
        };
        
        let supabaseCall;
        if (editingManuscript) {
            supabaseCall = supabase.from('manuskrip').update(dataToSave).eq('kode_inventarisasi', editingManuscript.kode_inventarisasi);
        } else {
            supabaseCall = supabase.from('manuskrip').insert([dataToSave]);
        }
        
        // --- PERBAIKAN 2: Menghapus variabel 'data' yang tidak pernah digunakan ---
        const { error } = await supabaseCall;

        if (error) {
            console.error('Error dari Supabase:', error);
            alert('Gagal menyimpan: ' + (error.message || 'Terjadi kesalahan tidak dikenal.'));
        } else {
            alert('Artikel berhasil disimpan.');
            setShowModal(false);
            fetchManuscripts();
        }
    };


    const excelHeaders = [
        "kode_inventarisasi", "judul_dari_tim", "afiliasi", "nama_koleksi", 
        "nomor_koleksi", "judul_dari_afiliasi", "nomor_digitalisasi", 
        "link_digital_afiliasi", "link_digital_tppkp_qomaruddin", "url_kover", 
        "url_konten", "klasifikasi_kailani", "kategori_ilmu_pesantren", 
        "deskripsi_umum", "hlm_pemisah", "pengarang", "penyalin", 
        "tahun_penulisan_di_teks", "konversi_masehi", "lokasi_penyalina", 
        "asal_usul_naskah", "bahasa", "aksara", "kover", "ukuran_kover", 
        "jilid", "ukuran_kertas", "jenis_kertas", "ukuran_dimensi", "watermark", 
        "countermark", "tinta", "jumlah_halaman", "halaman_kosong", 
        "jumlah_baris_per_halaman", "rubrikasi", "iluminasi", 
        "ilustrasi", "catatan_pinggir", "catatan_makna", "kolofon", 
        "catatan_marginal", "kondisi_fisik_naskah", "keterbacaan", 
        "kelengkapan_naskah", "catatan_catatan", "kata_kunci", "glosarium", 
        "referensi", "manuskrip_terkait", "tokoh_terkait"
    ];

    const handleDownloadTemplate = () => {
        const ws = XLSX.utils.aoa_to_sheet([excelHeaders]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Manuskrip");
        XLSX.writeFile(wb, "template_manuskrip_lengkap.xlsx");
    };
    
    const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            setError('Tidak ada file yang dipilih.');
            return;
        }

        setIsUploading(true);
        setError(null);

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = XLSX.utils.sheet_to_json(worksheet);

                const cleanData = json.filter(row => row.kode_inventarisasi);
                if (cleanData.length === 0) {
                    setError('File Excel kosong atau tidak memiliki kolom "kode_inventarisasi".');
                    setIsUploading(false);
                    return;
                }

                const formattedData = cleanData.map(row => {
                    const newRow: Partial<Manuskrip> = {};
                    for (const key in row) {
                        if (excelHeaders.includes(key)) {
                            let value = row[key];
                            if (key === "konversi_masehi" || key === "jumlah_halaman") {
                                value = value === null || value === undefined || value === '' ? null : Number(value);
                                if (isNaN(value)) value = null;
                            } else if (key === "referensi") {
                                try {
                                    value = JSON.parse(value);
                                } catch (e) {
                                    console.error("Gagal parsing JSON referensi dari Excel:", value, e);
                                    value = null;
                                }
                            }
                            newRow[key as keyof Manuskrip] = value;
                        }
                    }
                    return newRow;
                });

                const { error: uploadError } = await supabase.from('manuskrip').upsert(formattedData, { onConflict: 'kode_inventarisasi' });
                setIsUploading(false);

                if (uploadError) alert(`Gagal upload massal: ${uploadError.message}`);
                else {
                    alert(`${formattedData.length} data berhasil diunggah/diperbarui.`);
                    fetchManuscripts();
                }

            } catch (err: any) {
                setError(`Gagal membaca atau memproses file Excel: ${err.message}`);
                setIsUploading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };


    return (
        <div className="p-6">
             {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200" role="alert">{error}</div>}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-y-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Manajemen Manuskrip</h2>
                    <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={searchTermAdmin}
                                onChange={handleSearchInputChange}
                                className="pl-9 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-accent-400 text-sm dark:text-white"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <button onClick={handleDownloadTemplate} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-gray-600 hover:bg-gray-700 text-white">
                            Download Template (.xlsx)
                        </button>
                        <label className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${isUploading ? 'bg-gray-400 cursor-not-allowed opacity-75' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                            {isUploading ? 'Mengunggah...' : 'Upload Massal (.xlsx/.xls)'}
                            <input type="file" accept=".xlsx,.xls" onChange={handleBulkUpload} disabled={isUploading} className="hidden" />
                        </label>
                        <button onClick={handleAdd} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 text-white">Tambah Baru</button>
                    </div>
                </div>
                {loading ? <p className="text-gray-600 dark:text-gray-300">Memuat...</p> : (
                    <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                           <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Kode Inventarisasi</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Judul Tim</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Pengarang</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Aksi</th>
                                </tr>
                           </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {paginatedManuscripts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                            {searchTermAdmin ? "Tidak ada hasil untuk pencarian Anda." : "Tidak ada manuskrip untuk ditampilkan."}
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedManuscripts.map(ms => (
                                        <tr key={ms.kode_inventarisasi}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{ms.kode_inventarisasi}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ms.judul_dari_tim}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ms.pengarang || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleEdit(ms)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4">Edit</button>
                                                <button onClick={() => handleDelete(ms.kode_inventarisasi)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {totalPagesAdmin > 1 && (
                        <div className="mt-4 flex justify-center items-center space-x-2">
                            <button
                                onClick={() => goToPageAdmin(currentPageAdmin - 1)}
                                disabled={currentPageAdmin === 1}
                                className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            {Array.from({ length: totalPagesAdmin }, (_, i) => i + 1).map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    onClick={() => goToPageAdmin(pageNumber)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${currentPageAdmin === pageNumber ? 'bg-primary-600 text-white dark:bg-accent-500' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} hover:bg-primary-500 dark:hover:bg-accent-400 transition-colors`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            <button
                                onClick={() => goToPageAdmin(currentPageAdmin + 1)}
                                disabled={currentPageAdmin === totalPagesAdmin}
                                className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            >
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                    </>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <h3 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                            {editingManuscript ? 'Edit Manuskrip' : 'Tambah Manuskrip'}
                        </h3>
                        <div className="p-4 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">Info Utama & Klasifikasi</h4>
                                <MemoizedFormField name="kode_inventarisasi" label="Kode Inventarisasi (Wajib)" disabled={!!editingManuscript} value={formData.kode_inventarisasi} onChange={handleInputChange} />
                                <MemoizedFormField name="judul_dari_tim" label="Judul Tim (Wajib)" value={formData.judul_dari_tim} onChange={handleInputChange} />
                                <MemoizedFormField name="judul_dari_afiliasi" label="Judul dari Afiliasi" value={formData.judul_dari_afiliasi} onChange={handleInputChange} />
                                <MemoizedFormField name="klasifikasi_kailani" label="Klasifikasi Kailani" value={formData.klasifikasi_kailani} onChange={handleInputChange} />
                                <MemoizedFormField name="kategori_ilmu_pesantren" label="Kategori Ilmu Pesantren" value={formData.kategori_ilmu_pesantren} onChange={handleInputChange} />
                                <MemoizedFormField name="afiliasi" label="Afiliasi" value={formData.afiliasi} onChange={handleInputChange} />
                                <MemoizedFormField name="nama_koleksi" label="Nama Koleksi" value={formData.nama_koleksi} onChange={handleInputChange} />
                                <MemoizedFormField name="nomor_koleksi" label="Nomor Koleksi" value={formData.nomor_koleksi} onChange={handleInputChange} />
                                <MemoizedFormField name="nomor_digitalisasi" label="Nomor Digitalisasi" value={formData.nomor_digitalisasi} onChange={handleInputChange} />
                                <MemoizedFormField name="link_digital_afiliasi" label="Link Digital Afiliasi" value={formData.link_digital_afiliasi} onChange={handleInputChange} />
                                <MemoizedFormField name="link_digital_tppkp_qomaruddin" label="Link Digital TPPKP Qomaruddin" value={formData.link_digital_tppkp_qomaruddin} onChange={handleInputChange} />

                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">URL Gambar</h4>
                                <MemoizedFormField name="url_kover" label="URL Kover" value={formData.url_kover} onChange={handleInputChange} />
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Konten (maks. {MAX_URL_FIELDS} link)</label>
                                    <div className="space-y-2">
                                        {urlContentFields.map((url, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={url}
                                                    onChange={(e) => handleUrlFieldChange(index, e.target.value)}
                                                    placeholder={`URL Konten ${index + 1}`}
                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                                />
                                                {urlContentFields.length > 1 && (
                                                    <button type="button" onClick={() => handleRemoveUrlField(index)} className="p-2 text-red-600 hover:text-red-800" title="Hapus URL">X</button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {urlContentFields.length < MAX_URL_FIELDS && (
                                        <button type="button" onClick={handleAddUrlField} className="mt-2 text-sm text-primary-600 hover:text-primary-800">+ Tambah URL</button>
                                    )}
                                </div>
                                
                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">Atribut Fisik</h4>
                                <MemoizedFormField name="kondisi_fisik_naskah" label="Kondisi Fisik" value={formData.kondisi_fisik_naskah} onChange={handleInputChange} />
                                <MemoizedFormField name="ukuran_dimensi" label="Ukuran Dimensi" value={formData.ukuran_dimensi} onChange={handleInputChange} />
                                <MemoizedFormField name="jenis_kertas" label="Jenis Kertas" value={formData.jenis_kertas} onChange={handleInputChange} />
                                <MemoizedFormField name="ukuran_kertas" label="Ukuran Kertas" value={formData.ukuran_kertas} onChange={handleInputChange} />
                                <MemoizedFormField name="kover" label="Kover" value={formData.kover} onChange={handleInputChange} />
                                <MemoizedFormField name="ukuran_kover" label="Ukuran Kover" value={formData.ukuran_kover} onChange={handleInputChange} />
                                <MemoizedFormField name="jilid" label="Jilid" value={formData.jilid} onChange={handleInputChange} />
                                <MemoizedFormField name="watermark" label="Watermark" value={formData.watermark} onChange={handleInputChange} />
                                <MemoizedFormField name="countermark" label="Countermark" value={formData.countermark} onChange={handleInputChange} />
                                <MemoizedFormField name="tinta" label="Tinta" value={formData.tinta} onChange={handleInputChange} />
                                <MemoizedFormField name="jumlah_halaman" label="Jumlah Halaman" type="number" value={formData.jumlah_halaman} onChange={handleInputChange} />
                                <MemoizedFormField name="halaman_kosong" label="Halaman Kosong" value={formData.halaman_kosong} onChange={handleInputChange} />
                                <MemoizedFormField name="jumlah_baris_per_halaman" label="Jumlah Baris per Halaman" value={formData.jumlah_baris_per_halaman} onChange={handleInputChange} />
                                <MemoizedFormField name="keterbacaan" label="Keterbacaan" value={formData.keterbacaan} onChange={handleInputChange} />
                                <MemoizedFormField name="kelengkapan_naskah" label="Kelengkapan Naskah" value={formData.kelengkapan_naskah} onChange={handleInputChange} />

                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">Konten & Produksi</h4>
                                <MemoizedFormField name="pengarang" label="Pengarang" value={formData.pengarang} onChange={handleInputChange} />
                                <MemoizedFormField name="penyalin" label="Penyalin" value={formData.penyalin} onChange={handleInputChange} />
                                <MemoizedFormField name="tahun_penulisan_di_teks" label="Tahun Penulisan (Teks)" value={formData.tahun_penulisan_di_teks} onChange={handleInputChange} />
                                <MemoizedFormField name="konversi_masehi" label="Konversi Masehi" type="number" value={formData.konversi_masehi} onChange={handleInputChange} />
                                <MemoizedFormField name="lokasi_penyalina" label="Lokasi Penyalinan" value={formData.lokasi_penyalina} onChange={handleInputChange} />
                                <MemoizedFormField name="asal_usul_naskah" label="Asal-usul Naskah" value={formData.asal_usul_naskah} onChange={handleInputChange} />
                                <MemoizedFormField name="bahasa" label="Bahasa" value={formData.bahasa} onChange={handleInputChange} />
                                <MemoizedFormField name="aksara" label="Aksara" value={formData.aksara} onChange={handleInputChange} />
                                <MemoizedFormField name="rubrikasi" label="Rubrikasi" value={formData.rubrikasi} onChange={handleInputChange} />
                                <MemoizedFormField name="iluminasi" label="Iluminasi" value={formData.iluminasi} onChange={handleInputChange} />
                                <MemoizedFormField name="ilustrasi" label="Ilustrasi" value={formData.ilustrasi} onChange={handleInputChange} />
                                <MemoizedFormField name="catatan_pinggir" label="Catatan Pinggir" value={formData.catatan_pinggir} onChange={handleInputChange} />
                                <MemoizedFormField name="catatan_makna" label="Catatan Makna" value={formData.catatan_makna} onChange={handleInputChange} />
                                <MemoizedFormField name="hlm_pemisah" label="Halaman Pemisah" value={formData.hlm_pemisah} onChange={handleInputChange} />
                                <MemoizedFormField name="kolofon" label="Kolofon" type="textarea" rows={5} value={formData.kolofon} onChange={handleInputChange} />
                                <MemoizedFormField name="catatan_marginal" label="Catatan Marginal" type="textarea" rows={5} value={formData.catatan_marginal} onChange={handleInputChange} />
                                <MemoizedFormField name="deskripsi_umum" label="Deskripsi Umum" type="textarea" rows={5} value={formData.deskripsi_umum} onChange={handleInputChange} />
                                <MemoizedFormField name="catatan_catatan" label="Catatan Tambahan" type="textarea" rows={5} value={formData.catatan_catatan} onChange={handleInputChange} />

                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">Referensi & Metadata Tambahan</h4>
                                <MemoizedFormField name="kata_kunci" label="Kata Kunci (pisahkan koma)" value={formData.kata_kunci} onChange={handleInputChange} />
                                <MemoizedFormField name="glosarium" label="Glosarium" type="textarea" rows={3} value={formData.glosarium} onChange={handleInputChange} />
                                <MemoizedFormField name="manuskrip_terkait" label="Manuskrip Terkait (Kode, pisahkan koma)" value={formData.manuskrip_terkait} onChange={handleInputChange} />
                                <MemoizedFormField name="tokoh_terkait" label="Tokoh Terkait (Nama, pisahkan koma)" value={formData.tokoh_terkait} onChange={handleInputChange} />
                                <div className="col-span-full">
                                    <label className="block text-sm font-medium">Daftar Referensi</label>
                                     <div className="space-y-4 rounded-md p-3 border border-gray-200 dark:border-gray-700">
                                        {referenceFields.map((ref, index) => (
                                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        value={ref.judul}
                                                        onChange={(e) => handleReferenceFieldChange(index, 'judul', e.target.value)}
                                                        placeholder={`Referensi ${index + 1}: Judul`}
                                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={ref.penulis}
                                                        onChange={(e) => handleReferenceFieldChange(index, 'penulis', e.target.value)}
                                                        placeholder="Penulis"
                                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                                    />
                                                    <input
                                                        type="text" 
                                                        value={ref.tahun}
                                                        onChange={(e) => handleReferenceFieldChange(index, 'tahun', e.target.value)}
                                                        placeholder="Tahun"
                                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                                    />
                                                    <input
                                                        type="url"
                                                        value={ref.link}
                                                        onChange={(e) => handleReferenceFieldChange(index, 'link', e.target.value)}
                                                        placeholder="Link Publikasi"
                                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                                    />
                                                </div>
                                                {referenceFields.length > 1 && (
                                                    <button type="button" onClick={() => handleRemoveReferenceField(index)} className="mt-2 text-red-600 hover:text-red-800 text-sm">Hapus</button>
                                                )}
                                            </div>
                                        ))}
                                        {referenceFields.length < MAX_REFERENCE_FIELDS && (
                                            <button type="button" onClick={handleAddReferenceField} className="mt-2 text-sm text-primary-600 hover:text-primary-800">+ Tambah Referensi</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-md">Batal</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-primary-600 text-white rounded-md">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageManuscripts;