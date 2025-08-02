// src/pages/ProfileUserPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getSearchHistory, deleteSearchHistoryEntry } from '../services/searchHistoryService';
import { SearchHistoryEntry, UserProfileStatus } from '../../types';
import { Link, useNavigate, Navigate } from 'react-router-dom';

const ProfileUserPage: React.FC = () => {
    const { user, userProfile, role, signOut, loading: authLoading, isInitialized } = useAuth();
    const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const navigate = useNavigate();
    const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

    useEffect(() => {
        if (isInitialized && !authLoading) {
            if (!user) {
                navigate('/login', { replace: true });
            } else if (user.id === ADMIN_USER_ID) {
                navigate('/admin', { replace: true });
            }
        }
    }, [user, isInitialized, authLoading, navigate, ADMIN_USER_ID]);

    useEffect(() => {
        let isMounted = true;
        const fetchHistory = async () => {
            if (user && role === 'verified_user') {
                setLoadingHistory(true);
                try {
                    const historyData = await getSearchHistory(user.id);
                    if (isMounted) setSearchHistory(historyData);
                } finally {
                    if (isMounted) setLoadingHistory(false);
                }
            } else {
                setLoadingHistory(false);
                setSearchHistory([]);
            }
        };

        if (isInitialized && !authLoading) {
            fetchHistory();
        }

        return () => { isMounted = false; };
    }, [user, role, isInitialized, authLoading]);

    // FIX: Melengkapi logika di dalam fungsi handleDeleteEntry
    const handleDeleteEntry = useCallback(async (id: number) => {
        if (window.confirm('Yakin ingin menghapus entri riwayat ini?')) {
            const success = await deleteSearchHistoryEntry(id);
            if (success) {
                // Hapus entri dari state agar UI langsung terupdate
                setSearchHistory(prev => prev.filter(entry => entry.id !== id));
            } else {
                alert('Gagal menghapus entri riwayat.');
            }
        }
    }, []);

    if (!isInitialized || authLoading) {
        return <div className="text-center py-20">Memuat profil pengguna...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!userProfile || role === 'pending') { 
        return (
            <div className="max-w-2xl mx-auto py-8 px-4 text-center">
                <h1 className="text-3xl font-bold font-serif mb-6">Profil Pengguna Anda</h1>
                <p className="text-yellow-600 dark:text-yellow-400 text-lg mb-4">
                    Akun Anda terdaftar: {user.email}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Profil Anda sedang menunggu <Link to="/user" className="text-primary-600 hover:underline">verifikasi admin</Link>.
                </p>
                <button onClick={signOut} className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md">Logout</button>
            </div>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold font-serif text-center mb-8">Profil Pengguna Anda</h1>
            <div className="mb-8 p-6 border rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Informasi Akun</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${userProfile.status === UserProfileStatus.VERIFIED ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {userProfile.status}
                    </span>
                </p>
            </div>
            
            <div className="p-6 border rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Riwayat Pencarian</h2>
                {loadingHistory ? (
                    <p>Memuat riwayat...</p>
                ) : searchHistory.length === 0 ? (
                    <p>Belum ada riwayat pencarian.</p>
                ) : (
                    <ul className="space-y-3">
                        {searchHistory.map(entry => (
                            <li key={entry.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                                <span className="italic">"{entry.query}"</span>
                                <button onClick={() => handleDeleteEntry(entry.id)} className="text-sm text-red-500 hover:underline">Hapus</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-8 text-center">
                <button onClick={signOut} className="px-6 py-2 bg-red-600 text-white rounded-md">Logout</button>
            </div>
        </div>
    );
};
export default ProfileUserPage;