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

    // --- Logika Pengalihan Utama untuk Halaman Pengguna ---
    useEffect(() => {
        // Hanya jalankan logika pengalihan setelah AuthContext selesai menginisialisasi
        if (!isInitialized || authLoading) { // Tunggu hingga authStore diinisialisasi penuh dan tidak loading
            console.log("PROFILE_USER_PAGE_LOG: Menunggu otentikasi selesai...");
            return;
        }

        if (!user) {
            // Jika tidak ada pengguna, arahkan ke halaman login pengguna
            console.log("PROFILE_USER_PAGE_LOG: Tidak ada pengguna yang login, mengarahkan ke /login.");
            navigate('/login', { replace: true });
        } else if (user.id === ADMIN_USER_ID) {
            // Jika pengguna adalah admin, arahkan ke dashboard admin
            console.log("PROFILE_USER_PAGE_LOG: Pengguna adalah admin, mengarahkan ke /admin.");
            navigate('/admin', { replace: true });
        }
        // Jika user ada dan ID bukan admin, biarkan komponen ini menampilkan kontennya.
    }, [user, authLoading, isInitialized, navigate, ADMIN_USER_ID]);

    // --- Fetch histori pencarian (hanya jika pengguna sudah diautentikasi dan bukan admin) ---
    const fetchHistory = useCallback(async () => {
        // Memastikan AuthContext selesai memuat dan diinisialisasi penuh
        if (!isInitialized || authLoading) {
            setLoadingHistory(true);
            return;
        }

        if (user && user.id !== ADMIN_USER_ID && role === 'verified_user') {
            setLoadingHistory(true);
            setErrorHistory(null);
            try {
                const history = await getSearchHistory(user.id);
                setSearchHistory(history);
            } catch (err: any) {
                console.error("PROFILE_USER_PAGE_ERROR: Gagal memuat histori pencarian:", err);
                setErrorHistory("Gagal memuat histori pencarian.");
            } finally {
                setLoadingHistory(false);
            }
        } else { // Non-verified user, admin, atau tidak ada user, kosongkan histori
            setSearchHistory([]);
            setLoadingHistory(false);
        }
    }, [user, role, authLoading, isInitialized, ADMIN_USER_ID]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    // FUNGSI UNTUK MENGHAPUS ENTRI HISTORI PENCARIAN
    const handleDeleteEntry = useCallback(async (id: number) => {
        if (window.confirm('Yakin ingin menghapus entri ini dari histori pencarian?')) {
            try {
                const success = await deleteSearchHistoryEntry(id);
                if (success) {
                    setSearchHistory(prev => prev.filter(entry => entry.id !== id));
                    alert('Entri histori berhasil dihapus.');
                } else {
                    alert('Gagal menghapus entri histori.');
                }
            } catch (err) {
                console.error("PROFILE_USER_PAGE_ERROR: Error menghapus entri histori:", err);
                alert('Terjadi kesalahan saat menghapus entri histori.');
            }
        }
    }, []);

    // --- Render Loading State ---
    // Tampilkan loading screen di sini sampai authStore benar-benar selesai inisialisasi DAN tidak ada proses loading aktif
    if (!isInitialized || authLoading) {
        return (
            <div className="text-center py-20 text-gray-700 dark:text-gray-300">
                Memuat profil pengguna...
            </div>
        );
    }

    // Ini akan terjangkau jika user tidak ada atau ID adalah admin, dan useEffect akan mengarahkan
    if (!user || user.id === ADMIN_USER_ID) {
        return null; 
    }

    // --- Render Halaman Notifikasi Profil Belum Lengkap/Terverifikasi ---
    // Jika user ada, tapi userProfile belum ada, atau role adalah 'pending'
    if (!userProfile || role === UserProfileStatus.PENDING) { 
        return (
            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-6">Profil Pengguna Anda</h1>
                <p className="text-yellow-600 dark:text-yellow-400 text-lg mb-4">
                    Akun Anda telah terdaftar (Email: {user.email}).
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Profil Anda sedang dalam proses pembuatan atau aktivasi oleh admin. Harap tunggu atau hubungi admin.
                </p>
                <p className="text-gray-700 dark:text-gray-300">ID Pengguna Anda: {user.id}</p>
                <button
                    onClick={signOut}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        );
    }

    // --- Render Halaman Profil Lengkap untuk verified_user ---
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold font-serif text-center text-gray-900 dark:text-white mb-8">Profil Pengguna Anda</h1>

            <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Informasi Akun</h2>
                <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>ID Pengguna:</strong> {user.id}</p>
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Status Profil:</strong>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${userProfile.status === UserProfileStatus.VERIFIED ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {userProfile.status}
                    </span>
                </p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Peran Anda:</strong> {role}</p>
            </div>

            <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Detail Profil</h2>
                <p className="text-gray-700 dark:text-gray-300"><strong>Nama Lengkap:</strong> {userProfile.full_name}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Alamat Domisili:</strong> {userProfile.domicile_address || '-'}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Lembaga/Afiliasi:</strong> {userProfile.institution_affiliation || '-'}</p>
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Alumni Qomaruddin:</strong> {userProfile.is_alumni ? 'Ya' : 'Tidak'}
                    {userProfile.is_alumni && userProfile.alumni_unit && ` (${userProfile.alumni_unit}`}
                    {userProfile.is_alumni && userProfile.alumni_grad_year && ` Lulus ${userProfile.alumni_grad_year})`}
                </p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Pekerjaan:</strong> {userProfile.occupation || '-'}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>No. HP:</strong> {userProfile.phone_number || '-'}</p>
                <button
                    onClick={signOut}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* Histori Pencarian hanya untuk verified_user (bukan admin) */}
            {user.id !== ADMIN_USER_ID && role === 'verified_user' && ( 
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
            )}
        </div>
    );
};

export default ProfileUserPage;