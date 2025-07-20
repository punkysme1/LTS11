import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../src/supabaseClient';
import { Manuskrip } from '../../types';

// Deklarasikan PapaParse karena dimuat dari CDN
declare const Papa: any;

// Membungkus FormField dengan React.memo untuk optimasi
const MemoizedFormField: React.FC<{ name: keyof Manuskrip, label: string, type?: string, disabled?: boolean, rows?: number, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }> = React.memo(({ name, label, type = 'text', disabled = false, rows, value, onChange }) => {
    return (
        <div>
            <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            {type === 'textarea' ? (
                <textarea 
                    id={name as string}
                    name={name as string} 
                    value={value} 
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
                    value={value} 
                    onChange={onChange} 
                    disabled={disabled} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                />
            )}
        </div>
    );
});


const ManageManuscripts: React.FC = () => {
    const [manuscripts, setManuscripts] = useState<Manuskrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingManuscript, setEditingManuscript] = useState<Manuskrip | null>(null);
    const [formData, setFormData] = useState<Partial<Manuskrip>>({});
    const [isUploading, setIsUploading] = useState(false); // <--- INI YANG HILANG DAN SUDAH DITAMBAHKAN KEMBALI

    const fetchManuscripts = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('manuskrip')
            .select('kode_inventarisasi, judul_dari_tim, pengarang')
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

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleAdd = () => {
        setEditingManuscript(null);
        setFormData({});
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

        const { error } = editingManuscript
            ? await supabase.from('manuskrip').update(formData).eq('kode_inventarisasi', editingManuscript.kode_inventarisasi)
            : await supabase.from('manuskrip').insert([formData]);

        if (error) alert('Gagal menyimpan: ' + error.message);
        else {
            alert('Data berhasil disimpan.');
            setShowModal(false);
            fetchManuscripts();
        }
    };
    
    const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results: { data: any[] }) => {
                const cleanData = results.data.filter(row => row.kode_inventarisasi);
                if (cleanData.length === 0) {
                    setError('File CSV kosong atau tidak memiliki kolom "kode_inventarisasi".');
                    setIsUploading(false);
                    return;
                }

                const { error: uploadError } = await supabase.from('manuskrip').upsert(cleanData, { onConflict: 'kode_inventarisasi' });
                setIsUploading(false);

                if (uploadError) alert(`Gagal upload massal: ${uploadError.message}`);
                else {
                    alert(`${cleanData.length} data berhasil diunggah/diperbarui.`);
                    fetchManuscripts();
                }
            },
            error: (err: Error) => {
                setError(`Gagal parsing CSV: ${err.message}`);
                setIsUploading(false);
            }
        });
    };

    return (
        <div className="p-6">
            {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200" role="alert">{error}</div>}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Manajemen Manuskrip</h2>
                    <div className="flex items-center space-x-2">
                        {/* Penggunaan isUploading */}
                        <label className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${isUploading ? 'bg-gray-400 cursor-not-allowed opacity-75' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                            {isUploading ? 'Mengunggah...' : 'Upload Massal (.csv)'}
                            <input type="file" accept=".csv" onChange={handleBulkUpload} disabled={isUploading} className="hidden" />
                        </label>
                        <button onClick={handleAdd} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 text-white">Tambah Baru</button>
                    </div>
                </div>
                {loading ? <p className="text-gray-600 dark:text-gray-300">Memuat...</p> : (
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
                                {manuscripts.map(ms => (
                                    <tr key={ms.kode_inventarisasi}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{ms.kode_inventarisasi}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ms.judul_dari_tim}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{ms.pengarang || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(ms)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4">Edit</button>
                                            <button onClick={() => handleDelete(ms.kode_inventarisasi)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <h3 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">{editingManuscript ? 'Edit Manuskrip' : 'Tambah Manuskrip'}</h3>
                        <div className="p-4 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">Info Utama & Klasifikasi</h4>
                                <MemoizedFormField name="kode_inventarisasi" label="Kode Inventarisasi (Wajib)" disabled={!!editingManuscript} value={formData.kode_inventarisasi || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="judul_dari_tim" label="Judul Tim (Wajib)" value={formData.judul_dari_tim || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="judul_asli_naskah" label="Judul Asli Naskah" value={formData.judul_asli_naskah || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="klasifikasi_kailani" label="Klasifikasi Kailani" value={formData.klasifikasi_kailani || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="kategori_ilmu_pesantren" label="Kategori Ilmu Pesantren" value={formData.kategori_ilmu_pesantren || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="afiliasi" label="Afiliasi" value={formData.afiliasi || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="nama_koleksi" label="Nama Koleksi" value={formData.nama_koleksi || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="nomor_koleksi" label="Nomor Koleksi" value={formData.nomor_koleksi || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="link_digital_afiliasi" label="Link Digital Afiliasi" value={formData.link_digital_afiliasi || ''} onChange={handleInputChange} />
                                
                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">URL Gambar</h4>
                                <MemoizedFormField name="url_kover" label="URL Kover" value={formData.url_kover || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="url_konten" label="URL Konten (pisahkan dengan baris baru)" type="textarea" rows={5} value={formData.url_konten || ''} onChange={handleInputChange} />

                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">Atribut Fisik</h4>
                                <MemoizedFormField name="kondisi_fisik_naskah" label="Kondisi Fisik" value={formData.kondisi_fisik_naskah || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="ukuran_dimensi" label="Ukuran Dimensi" value={formData.ukuran_dimensi || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="kover" label="Kover" value={formData.kover || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="jilid" label="Jilid" value={formData.jilid || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="jumlah_halaman" label="Jumlah Halaman" value={formData.jumlah_halaman || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="halaman_kosong" label="Halaman Kosong" value={formData.halaman_kosong || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="tinta" label="Tinta" value={formData.tinta || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="watermark" label="Watermark" value={formData.watermark || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="keterbacaan" label="Keterbacaan" value={formData.keterbacaan || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="kelengkapan_naskah" label="Kelengkapan Naskah" value={formData.kelengkapan_naskah || ''} onChange={handleInputChange} />

                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">Konten & Produksi</h4>
                                <MemoizedFormField name="pengarang" label="Pengarang" value={formData.pengarang || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="penyalin" label="Penyalin" value={formData.penyalin || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="tahun_penulisan_di_teks" label="Tahun Penulisan (Teks)" value={formData.tahun_penulisan_di_teks || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="konversi_masehi" label="Konversi Masehi" value={formData.konversi_masehi || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="lokasi_penyalina" label="Lokasi Penyalinan" value={formData.lokasi_penyalina || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="asal_usul_naskah" label="Asal-usul Naskah" value={formData.asal_usul_naskah || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="bahasa" label="Bahasa" value={formData.bahasa || ''} onChange={handleInputChange} />
                                <MemoizedFormField name="aksara" label="Aksara" value={formData.aksara || ''} onChange={handleInputChange} />
                                
                                <h4 className="col-span-full font-bold text-lg mt-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">Deskripsi & Catatan</h4>
                                <div className="col-span-full"><MemoizedFormField name="deskripsi_umum" label="Deskripsi Umum" type="textarea" rows={5} value={formData.deskripsi_umum || ''} onChange={handleInputChange} /></div>
                                <div className="col-span-full"><MemoizedFormField name="kolofon" label="Kolofon" type="textarea" rows={5} value={formData.kolofon || ''} onChange={handleInputChange} /></div>
                                <div className="col-span-full"><MemoizedFormField name="catatan_catatan" label="Catatan Tambahan" type="textarea" rows={5} value={formData.catatan_catatan || ''} onChange={handleInputChange} /></div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                            <button onClick={() => setShowModal(false)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200">Batal</button>
                            <button onClick={handleSave} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 text-white">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageManuscripts;