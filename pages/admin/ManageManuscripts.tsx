import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../src/supabaseClient';
import { Manuskrip } from '../../types';

// Deklarasikan PapaParse karena dimuat dari CDN
declare const Papa: any;

const ManageManuscripts: React.FC = () => {
    const [manuscripts, setManuscripts] = useState<Manuskrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editingManuscript, setEditingManuscript] = useState<Manuskrip | null>(null);
    const [formData, setFormData] = useState<Partial<Manuskrip>>({});
    const [isUploading, setIsUploading] = useState(false);

    const fetchManuscripts = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('manuskrip')
            .select('kode_inventarisasi, judul_dari_tim, pengarang') // Hanya ambil data penting untuk list
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        setEditingManuscript(null);
        setFormData({});
        setShowModal(true);
    };

    const handleEdit = async (manuscript: Manuskrip) => {
        // Ambil data lengkap untuk manuskrip yang akan diedit
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

    const FormField: React.FC<{ name: keyof Manuskrip, label: string, type?: string, disabled?: boolean, rows?: number }> = ({ name, label, type = 'text', disabled = false, rows }) => (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            {type === 'textarea' ? (
                <textarea name={name} value={formData[name] as string || ''} onChange={handleInputChange} disabled={disabled} className="mt-1 block w-full input-field" rows={rows || 3}></textarea>
            ) : (
                <input type={type} name={name} value={formData[name] as string || ''} onChange={handleInputChange} disabled={disabled} className="mt-1 block w-full input-field" />
            )}
        </div>
    );
    
    return (
        <div>
            {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">{error}</div>}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Manajemen Manuskrip</h2>
                    <div className="flex items-center space-x-2">
                        <label className={`btn btn-sm bg-green-500 hover:bg-green-600 text-white ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}>
                            {isUploading ? 'Mengunggah...' : 'Upload Massal (.csv)'}
                            <input type="file" accept=".csv" onChange={handleBulkUpload} disabled={isUploading} className="hidden" />
                        </label>
                        <button onClick={handleAdd} className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white">Tambah Baru</button>
                    </div>
                </div>
                {loading ? <p>Memuat...</p> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                           {/* ... table head ... */}
                            <tbody>
                                {manuscripts.map(ms => (
                                    <tr key={ms.kode_inventarisasi} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium">{ms.kode_inventarisasi}</td>
                                        <td className="px-6 py-4">{ms.judul_dari_tim}</td>
                                        <td className="px-6 py-4">{ms.pengarang || '-'}</td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button onClick={() => handleEdit(ms)} className="font-medium text-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => handleDelete(ms.kode_inventarisasi)} className="font-medium text-red-600 hover:underline">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <h3 className="text-lg font-bold p-4 border-b">{editingManuscript ? 'Edit Manuskrip' : 'Tambah Manuskrip'}</h3>
                        <div className="p-4 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <h4 className="col-span-full font-bold text-lg mt-4 border-b">Info Utama & Klasifikasi</h4>
                                <FormField name="kode_inventarisasi" label="Kode Inventarisasi (Wajib)" disabled={!!editingManuscript} />
                                <FormField name="judul_dari_tim" label="Judul Tim (Wajib)" />
                                <FormField name="judul_asli_naskah" label="Judul Asli Naskah" />
                                <FormField name="klasifikasi_kailani" label="Klasifikasi Kailani" />
                                <FormField name="kategori_ilmu_pesantren" label="Kategori Ilmu Pesantren" />
                                <FormField name="afiliasi" label="Afiliasi" />
                                <FormField name="nama_koleksi" label="Nama Koleksi" />
                                <FormField name="nomor_koleksi" label="Nomor Koleksi" />
                                <FormField name="link_digital_afiliasi" label="Link Digital Afiliasi" />
                                
                                <h4 className="col-span-full font-bold text-lg mt-4 border-b">URL Gambar</h4>
                                <FormField name="url_kover" label="URL Kover" />
                                <FormField name="url_konten" label="URL Konten (pisahkan dengan baris baru)" type="textarea" />

                                <h4 className="col-span-full font-bold text-lg mt-4 border-b">Atribut Fisik</h4>
                                <FormField name="kondisi_fisik_naskah" label="Kondisi Fisik" />
                                <FormField name="ukuran_dimensi" label="Ukuran Dimensi" />
                                <FormField name="kover" label="Kover" />
                                <FormField name="jilid" label="Jilid" />
                                <FormField name="jumlah_halaman" label="Jumlah Halaman" />
                                <FormField name="halaman_kosong" label="Halaman Kosong" />
                                <FormField name="tinta" label="Tinta" />
                                <FormField name="watermark" label="Watermark" />
                                <FormField name="keterbacaan" label="Keterbacaan" />
                                <FormField name="kelengkapan_naskah" label="Kelengkapan Naskah" />

                                <h4 className="col-span-full font-bold text-lg mt-4 border-b">Konten & Produksi</h4>
                                <FormField name="pengarang" label="Pengarang" />
                                <FormField name="penyalin" label="Penyalin" />
                                <FormField name="tahun_penulisan_di_teks" label="Tahun Penulisan (Teks)" />
                                <FormField name="konversi_masehi" label="Konversi Masehi" />
                                <FormField name="lokasi_penyalina" label="Lokasi Penyalinan" />
                                <FormField name="asal_usul_naskah" label="Asal-usul Naskah" />
                                <FormField name="bahasa" label="Bahasa" />
                                <FormField name="aksara" label="Aksara" />
                                
                                <h4 className="col-span-full font-bold text-lg mt-4 border-b">Deskripsi & Catatan</h4>
                                <div className="col-span-full"><FormField name="deskripsi_umum" label="Deskripsi Umum" type="textarea" /></div>
                                <div className="col-span-full"><FormField name="kolofon" label="Kolofon" type="textarea" /></div>
                                <div className="col-span-full"><FormField name="catatan_catatan" label="Catatan Tambahan" type="textarea" /></div>
                            </div>
                        </div>
                        <div className="p-4 border-t flex justify-end space-x-2">
                            <button onClick={() => setShowModal(false)} className="btn bg-gray-300 hover:bg-gray-400">Batal</button>
                            <button onClick={handleSave} className="btn bg-blue-500 hover:bg-blue-600 text-white">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageManuscripts;