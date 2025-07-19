import React, { useState } from 'react';
import { supabase } from '../src/supabaseClient';
import { guestBookEntries } from '../data/mockData';
import { GuestBookStatus } from '../types';

const GuestBookPage: React.FC = () => {
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('buku_tamu').insert([
            { nama_pengunjung: name, asal_institusi: institution, pesan: message }
        ]);

        if (error) {
            alert('Gagal mengirim pesan: ' + error.message);
        } else {
            setSubmitted(true);
            setName('');
            setInstitution('');
            setMessage('');
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    const approvedEntries = guestBookEntries.filter(entry => entry.status === GuestBookStatus.APPROVED)
                                           .sort((a,b) => new Date(b.tanggal_kirim).getTime() - new Date(a.tanggal_kirim).getTime());

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-serif text-center mb-8">Buku Tamu</h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Kami senang Anda berkunjung. Silakan tinggalkan pesan, kesan, atau masukan Anda di bawah ini.
            </p>
            {/* ...existing code... */}
        </div>
    );
};
export default GuestBookPage;