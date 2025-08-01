// src/pages/ProfileUserPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getSearchHistory, deleteSearchHistoryEntry } from '../services/searchHistoryService';
import { SearchHistoryEntry, UserProfileStatus } from '../../types';
import { Link, useNavigate } from 'react-router-dom';

const ProfileUserPage: React.FC = () => {
    const { user, userProfile, role, signOut, loading: authLoading, isInitialized } = useAuth();
    const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [errorHistory, setErrorHistory] = useState<string | null>(null);
    
    const navigate = useNavigate();
    const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

    useEffect(() => {
        if (!isInitialized || authLoading) {
            return;
        }
        if (!user) {
            navigate('/login', { replace: true });
        } else if (user.id === ADMIN_USER_ID) {
            navigate('/admin', { replace: true });
        }
    }, [user, authLoading, isInitialized, navigate, ADMIN_USER_ID]);

    const fetchHistory = useCallback(async () => {
        if (!isInitialized || authLoading || !user || user.id === ADMIN_USER_ID || role !== 'verified_user') {
            setLoadingHistory(false);
            setSearchHistory([]);
            return;
        }
        
        setLoadingHistory(true);
        setErrorHistory(null);
        try {
            const history = await getSearchHistory(user.id);
            setSearchHistory(history);
        } catch (err: any) {
            setErrorHistory("Gagal memuat histori pencarian.");
        } finally {
            setLoadingHistory(false);
        }
    }, [user, role, authLoading, isInitialized, ADMIN_USER_ID]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleDeleteEntry = useCallback(async (id: number) => {
        if (window.confirm('Yakin ingin menghapus entri ini?')) {
            const success = await deleteSearchHistoryEntry(id);
            if (success) {
                setSearchHistory(prev => prev.filter(entry => entry.id !== id));
            } else {
                alert('Gagal menghapus entri histori.');
            }
        }
    }, []);

    if (!isInitialized || authLoading) {
        return <div className="text-center py-20 text-gray-700 dark:text-gray-300">Memuat profil pengguna...</div>;
    }

    if (!user || user.id === ADMIN_USER_ID) {
        return null; 
    }

    if (!userProfile || role === 'pending') { 
        return (
            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-6">Profil Pengguna Anda</h1>
                <p className="text-yellow-600 dark:text-yellow-400 text-lg mb-4">
                    Akun Anda telah terdaftar (Email: {user.email}).
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {/* FIX: Menggunakan Link di sini */}
                    Profil Anda sedang dalam proses <Link to="/user" className="text-primary-600 hover:underline">verifikasi oleh admin</Link>. Harap tunggu atau hubungi admin jika proses verifikasi terlalu lama.
                </p>
                <button
                    onClick={signOut}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold font-serif text-center text-gray-900 dark:text-white mb-8">Profil Pengguna Anda</h1>
            <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Informasi Akun</h2>
                <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Peran Anda:</strong> {role}</p>
            </div>
            <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Detail Profil</h2>
                <p className="text-gray-700 dark:text-gray-300"><strong>Nama Lengkap:</strong> {userProfile.full_name}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Status Profil:</strong>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${userProfile.status === UserProfileStatus.VERIFIED ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {userProfile.status}
                    </span>
                </p>
                <button onClick={signOut} className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Logout
                </button>
            </div>
            {role === 'verified_user' && ( 
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-md">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Histori Pencarian</h2>
                    {loadingHistory ? (
                        <p className="text-gray-600 dark:text-gray-400">Memuat histori...</p>
                    ) : errorHistory ? (
                        <p className="text-red-500">{errorHistory}</p>
                    ) : searchHistory.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400">Belum ada histori pencarian.</p>
                    ) : (
                        <ul className="space-y-3">
                            {searchHistory.map(entry => (
                                <li key={entry.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                    <span className="text-gray-800 dark:text-gray-200">"{entry.query}"</span>
                                    <button onClick={() => handleDeleteEntry(entry.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">Hapus</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileUserPage;