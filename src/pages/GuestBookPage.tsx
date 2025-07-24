import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { GuestBookEntry, GuestBookStatus } from '../../types';

const GuestBookPage: React.FC = () => {
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [approvedEntries, setApprovedEntries] = useState<GuestBookEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApprovedEntries = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('buku_tamu')
                .select('*')
                .eq('status', GuestBookStatus.APPROVED)
                .order('created_at', { ascending: false });
            
            if (error) console.error('Error fetching approved entries:', error);
            else setApprovedEntries(data || []);
            setLoading(false);
        };
        fetchApprovedEntries();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        // ... fungsi handleSubmit tetap sama ...
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* ... bagian atas JSX tetap sama ... */}
            <div className="mt-16">
                <h2 className="text-3xl font-serif text-center mb-8">Pesan dari Pengunjung Lain</h2>
                {loading ? <p className="text-center">Memuat pesan...</p> : (
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