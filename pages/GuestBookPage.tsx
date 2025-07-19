
import React, { useState } from 'react';
import { guestBookEntries } from '../data/mockData';
import { GuestBookStatus } from '../types';

const GuestBookPage: React.FC = () => {
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit to a server.
        // Here we just simulate success.
        console.log({ name, institution, message });
        setSubmitted(true);
        setName('');
        setInstitution('');
        setMessage('');
        setTimeout(() => setSubmitted(false), 5000); // Reset form message after 5s
    };
    
    const approvedEntries = guestBookEntries.filter(entry => entry.status === GuestBookStatus.APPROVED)
                                           .sort((a,b) => new Date(b.tanggal_kirim).getTime() - new Date(a.tanggal_kirim).getTime());

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-serif text-center mb-8">Buku Tamu</h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                Kami senang Anda berkunjung. Silakan tinggalkan pesan, kesan, atau masukan Anda di bawah ini.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form Section */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Tinggalkan Pesan</h2>
                    {submitted ? (
                        <div className="text-center p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
                            <h3 className="font-semibold">Terima Kasih!</h3>
                            <p>Pesan Anda telah terkirim dan akan ditampilkan setelah disetujui oleh admin.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama Lengkap</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"/>
                            </div>
                            <div>
                                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Asal Institusi</label>
                                <input type="text" id="institution" value={institution} onChange={e => setInstitution(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"/>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Pesan Anda</label>
                                <textarea id="message" rows={4} value={message} onChange={e => setMessage(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    Kirim Pesan
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Entries List */}
                <div className="space-y-6">
                    {approvedEntries.map(entry => (
                        <div key={entry.id} className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-md">
                            <p className="text-gray-800 dark:text-gray-100">"{entry.pesan}"</p>
                            <div className="mt-4 text-right">
                                <p className="font-semibold text-primary-800 dark:text-accent-400">{entry.nama_pengunjung}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{entry.asal_institusi}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{new Date(entry.tanggal_kirim).toLocaleDateString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuestBookPage;
