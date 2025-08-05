// src/pages/admin/ManageGuestbook.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { GuestBookEntry, GuestBookStatus } from '../../../types';

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

    // --- FIX START: Change parameter 'id' to type 'number' ---
    const handleApprove = async (id: number) => {
    // --- FIX END ---
        const { error } = await supabase
            .from('buku_tamu')
            // Use the enum value which is now correctly 'approved'
            .update({ status: GuestBookStatus.APPROVED, is_approved: true }) 
            .eq('id', id);
        
        if (error) alert('Gagal menyetujui: ' + error.message);
        else fetchEntries();
    };

    // --- FIX START: Change parameter 'id' to type 'number' ---
    const handleDelete = async (id: number) => {
    // --- FIX END ---
        if (window.confirm('Yakin ingin menghapus pesan ini?')) {
            const { error } = await supabase.from('buku_tamu').delete().eq('id', id);
            if (error) alert('Gagal menghapus: ' + error.message);
            else fetchEntries();
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Manajemen Buku Tamu</h2>
            {loading ? <p className="text-gray-600 dark:text-gray-300">Memuat...</p> : (
                <div className="space-y-4">
                    {entries.map(entry => (
                        <div key={entry.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                            {/* ... content ... */}
                            <p className="text-gray-800 dark:text-gray-200">
                                <strong>{entry.nama_pengunjung}</strong> dari <em>{entry.asal_institusi}</em>
                            </p>
                            <p className="my-2 text-gray-700 dark:text-gray-300">"{entry.pesan}"</p>
                            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>
                                    {new Date(entry.created_at).toLocaleString('id-ID')} - 
                                    {/* The status from the DB is now compared to the correct enum type */}
                                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.status === GuestBookStatus.APPROVED ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'}`}>
                                        {entry.status}
                                    </span>
                                </span>
                                <div className="flex items-center space-x-4">
                                    {/* --- FIX START: This comparison is now valid --- */}
                                    {entry.status !== GuestBookStatus.APPROVED && (
                                    // --- FIX END ---
                                        <button onClick={() => handleApprove(entry.id)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 font-medium">Setujui</button>
                                    )}
                                    <button onClick={() => handleDelete(entry.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium">Hapus</button>
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