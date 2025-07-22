// pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../src/contexts/AuthContext'; // Import useAuth
import { getSearchHistory, deleteSearchHistoryEntry } from '../src/services/searchHistoryService'; // Import service
import { SearchHistoryEntry } from '../types'; // Import interface

const ProfilePage: React.FC = () => {
    const { user, signOut } = useAuth(); // Dapatkan user dan fungsi signOut
    const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [errorHistory, setErrorHistory] = useState<string | null>(null);

    const fetchHistory = async () => {
        if (user) {
            setLoadingHistory(true);
            setErrorHistory(null);
            try {
                const history = await getSearchHistory(user.id);
                setSearchHistory(history);
            } catch (err: any) {
                console.error("Error fetching search history:", err);
                setErrorHistory("Gagal memuat histori pencarian.");
            } finally {
                setLoadingHistory(false);
            }
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [user]); // Ambil histori saat user berubah

    const handleDeleteEntry = async (id: number) => {
        if (window.confirm('Yakin ingin menghapus entri ini dari histori pencarian?')) {
            const success = await deleteSearchHistoryEntry(id);
            if (success) {
                // Perbarui state setelah penghapusan
                setSearchHistory(prev => prev.filter(entry => entry.id !== id));
            } else {
                alert('Gagal menghapus entri histori.');
            }
        }
    };

    if (!user) {
        return (
            <div className="text-center py-20 text-gray-700 dark:text-gray-300">
                Anda perlu login untuk melihat halaman profil.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold font-serif text-center text-gray-900 dark:text-white mb-8">Profil Pengguna</h1>

            <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Informasi Akun</h2>
                <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>ID Pengguna:</strong> {user.id}</p>
                <button
                    onClick={signOut}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Histori Pencarian Manuskrip</h2>
                {loadingHistory ? (
                    <p className="text-gray-600 dark:text-gray-400">Memuat histori pencarian...</p>
                ) : errorHistory ? (
                    <p className="text-red-600 dark:text-red-400">{errorHistory}</p>
                ) : searchHistory.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">Belum ada histori pencarian.</p>
                ) : (
                    <ul className="space-y-3">
                        {searchHistory.map(entry => (
                            <li 
                                key={entry.id} 
                                className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
                            >
                                <span className="text-gray-800 dark:text-gray-200">
                                    "{entry.query}" pada {new Date(entry.timestamp).toLocaleString('id-ID')}
                                </span>
                                <button
                                    onClick={() => handleDeleteEntry(entry.id)}
                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                                    title="Hapus entri ini"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.166L15.97 2.398a1.5 1.5 0 00-1.022-.166M15.97 2.398l-3.344 9.356m-9.135 1.066L7.5 20.25H4.875c-.621 0-1.125-.504-1.125-1.125V11.25m11.166 2.625c.806-.096 1.574-.17 2.366-.254m-1.06-1.06l1.175-1.175m-7.158-6.19l-2.075 2.075M9.53 10.795l-5.06-5.06M3 7.5c.032.09.064.18.096.27m-.096-.27l-2.075-2.075M9.53 10.795l-5.06-5.06M3 7.5c.032.09.064.18.096.27m-.096-.27l-2.075-2.075M9.53 10.795l-5.06-5.06M3 7.5c.032.09.064.18.096.27m-.096-.27l-2.075-2.075M9.53 10.795l-5.06-5.06" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;