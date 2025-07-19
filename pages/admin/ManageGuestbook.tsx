import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../src/supabaseClient';
import { GuestBookEntry, GuestBookStatus } from '../../types';

const ManageGuestbook: React.FC = () => {
    const [entries, setEntries] = useState<GuestBookEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEntries = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('buku_tamu').select('*').order('created_at', { ascending: false });
        if (error) alert('Error fetching entries: ' + error.message);
        else setEntries(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

    const handleApprove = async (id: string) => {
        const { error } = await supabase.from('buku_tamu').update({ status: GuestBookStatus.APPROVED }).eq('id', id);
        if (error) alert('Gagal menyetujui: ' + error.message);
        else fetchEntries();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Yakin ingin menghapus pesan ini?')) {
            const { error } = await supabase.from('buku_tamu').delete().eq('id', id);
            if (error) alert('Gagal menghapus: ' + error.message);
            else fetchEntries();
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Manajemen Buku Tamu</h2>
            {loading ? <p>Memuat...</p> : (
                <div className="space-y-4">
                    {entries.map(entry => (
                        <div key={entry.id} className="border p-4 rounded-md">
                            <p><strong>{entry.nama_pengunjung}</strong> dari <em>{entry.asal_institusi}</em></p>
                            <p className="my-2">"{entry.pesan}"</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>{new Date(entry.tanggal_kirim).toLocaleString('id-ID')}</span>
                                <div className="flex items-center space-x-2">
                                    {entry.status !== GuestBookStatus.APPROVED && (
                                        <button onClick={() => handleApprove(entry.id)} className="text-green-600">Setujui</button>
                                    )}
                                    <button onClick={() => handleDelete(entry.id)} className="text-red-600">Hapus</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageGuestbook;