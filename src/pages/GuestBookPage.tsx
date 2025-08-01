// src/pages/GuestBookPage.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { GuestBookEntry } from '../../types';

const GuestBookPage: React.FC = () => {
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [approvedEntries, setApprovedEntries] = useState<GuestBookEntry[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchApprovedEntries = async () => {
            setLoadingData(true);
            const { data, error } = await supabase
                .from('buku_tamu')
                .select('*')
                .eq('is_approved', true)
                .order('created_at', { ascending: false });
            
            if (isMounted) {
                if (error) {
                    console.error('GUESTBOOK_PAGE_ERROR: Error fetching approved entries:', error);
                } else {
                    setApprovedEntries(data || []);
                }
                setLoadingData(false);
            }
        };
        fetchApprovedEntries();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() === '' || institution.trim() === '' || message.trim() === '') {
            alert('Semua field harus diisi.');
            return;
        }
        
        try {
            const { error } = await supabase.from('buku_tamu').insert({
                nama_pengunjung: name,
                asal_institusi: institution,
                pesan: message,
                is_approved: false,
            });

            if (error) {
                throw error;
            }
            setName('');
            setInstitution('');
            setMessage('');
            setSubmitted(true);
            alert('Pesan Anda berhasil dikirim dan menunggu persetujuan admin.');
        } catch (err: any) {
            console.error('GUESTBOOK_PAGE_ERROR: Exception submitting guestbook entry:', err);
            alert('Gagal mengirim pesan buku tamu: ' + err.message);
            setSubmitted(false);
        }
    };

    if (loadingData) {
        return <p className="text-center py-10 text-gray-700 dark:text-gray-300">Memuat pesan...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-serif text-center mb-8 text-gray-900 dark:text-white">Buku Tamu</h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Tulis Pesan Anda</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asal Instansi/Lembaga</label>
                        <input
                            type="text"
                            id="institution"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pesan Anda</label>
                        <textarea
                            id="message"
                            rows={5}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors duration-200"
                    >
                        Kirim Pesan
                    </button>
                    {submitted && <p className="text-green-600 dark:text-green-400 mt-4">Pesan Anda telah berhasil dikirim dan menunggu persetujuan admin.</p>}
                </form>
            </div>

            <div className="mt-16">
                <h2 className="text-3xl font-serif text-center mb-8 text-gray-900 dark:text-white">Pesan dari Pengunjung Lain</h2>
                {approvedEntries.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">Belum ada pesan yang disetujui untuk ditampilkan.</p>
                ) : (
                    <div className="space-y-6">
                        {approvedEntries.map(entry => (
                            <div key={entry.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-800 dark:text-gray-200">"{entry.pesan}"</p>
                                <p className="text-right text-sm text-gray-600 dark:text-gray-400 mt-2">- <strong>{entry.nama_pengunjung}</strong>, <em>{entry.asal_institusi}</em></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default GuestBookPage;