// src/pages/ProfileUserPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate, Link } from 'react-router-dom';
// FIX: Menambahkan 'SearchHistoryEntry' ke dalam daftar import
import { SearchHistoryEntry, CompleteProfileFormData, UserProfileStatus } from '../../types';
import { createUserProfile } from '../services/userService';
import { getSearchHistory, deleteSearchHistoryEntry } from '../services/searchHistoryService';


// Komponen Form untuk melengkapi profil (Tidak ada perubahan)
const CompleteProfileForm: React.FC<{ userId: string }> = ({ userId }) => {
    const [formData, setFormData] = useState<CompleteProfileFormData>({
        full_name: '',
        domicile_address: '',
        institution_affiliation: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.full_name.trim()) {
            setError('Nama Lengkap wajib diisi.');
            return;
        }
        setLoading(true);
        setError(null);
        
        const { error: createError } = await createUserProfile(userId, formData);
        
        if (createError) {
            setError(createError);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Lengkapi Profil Anda</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
                Email Anda telah terkonfirmasi. Silakan lengkapi detail profil Anda untuk melanjutkan.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="full_name" className="block text-sm font-medium">Nama Lengkap</label>
                    <input type="text" name="full_name" id="full_name" value={formData.full_name} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="domicile_address" className="block text-sm font-medium">Alamat Domisili</label>
                    <input type="text" name="domicile_address" id="domicile_address" value={formData.domicile_address} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="institution_affiliation" className="block text-sm font-medium">Afiliasi Institusi</label>
                    <input type="text" name="institution_affiliation" id="institution_affiliation" value={formData.institution_affiliation} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50">
                    {loading ? 'Menyimpan...' : 'Simpan Profil'}
                </button>
            </form>
        </div>
    );
};

// Komponen Halaman Profil Utama
const ProfileUserPage: React.FC = () => {
    const { user, userProfile, role, signOut, loading: authLoading, isInitialized } = useAuth();
    const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialized && role === 'admin') {
            navigate('/admin', { replace: true });
        }
    }, [role, isInitialized, navigate]);

    useEffect(() => {
        let isMounted = true;
        const fetchHistory = async () => {
            if (user && role === 'verified_user') {
                if(isMounted) setLoadingHistory(true);
                const historyData = await getSearchHistory(user.id);
                if (isMounted) {
                    setSearchHistory(historyData);
                    setLoadingHistory(false);
                }
            } else {
                if(isMounted) setLoadingHistory(false);
            }
        };

        if (isInitialized && !authLoading) {
            fetchHistory();
        }
        return () => { isMounted = false; };
    }, [user, role, isInitialized, authLoading]);

    const handleDeleteEntry = useCallback(async (id: number) => {
        if (window.confirm('Yakin ingin menghapus entri riwayat ini?')) {
            const success = await deleteSearchHistoryEntry(id);
            if (success) {
                setSearchHistory(prev => prev.filter(entry => entry.id !== id));
            } else {
                alert('Gagal menghapus entri riwayat.');
            }
        }
    }, []);

    if (!isInitialized || authLoading) {
        return <div className="text-center py-20">Memuat sesi pengguna...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const renderContent = () => {
        if (!userProfile) {
            return <CompleteProfileForm userId={user.id} />;
        }
        switch (userProfile.status) {
            case UserProfileStatus.PENDING:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Profil Anda Sedang Ditinjau</h2>
                        {/* FIX: Menggunakan Link di sini agar tidak ada peringatan */}
                        <p>Terima kasih telah melengkapi profil Anda. Akun Anda sedang menunggu <Link to="/user" className="text-primary-600 hover:underline">verifikasi dari admin</Link>.</p>
                    </div>
                );
            case UserProfileStatus.VERIFIED:
                return (
                    <>
                        <div className="mb-8 p-6 border rounded-md">
                            <h2 className="text-2xl font-semibold mb-4">Detail Profil</h2>
                            <p><strong>Nama Lengkap:</strong> {userProfile.full_name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Domisili:</strong> {userProfile.domicile_address || '-'}</p>
                            <p><strong>Institusi:</strong> {userProfile.institution_affiliation || '-'}</p>
                        </div>
                        <div className="p-6 border rounded-md">
                            <h2 className="text-2xl font-semibold mb-4">Riwayat Pencarian</h2>
                            {loadingHistory ? <p>Memuat riwayat...</p> : searchHistory.length === 0 ? <p>Belum ada riwayat.</p> : (
                                <ul className="space-y-3">
                                    {searchHistory.map(entry => (
                                        <li key={entry.id} className="flex justify-between items-center p-3 rounded-md bg-gray-50 dark:bg-gray-700">
                                            <span className="italic">"{entry.query}"</span>
                                            <button onClick={() => handleDeleteEntry(entry.id)} className="text-sm text-red-500 hover:underline">Hapus</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                );
            default:
                return <p>Status profil Anda tidak dikenali. Hubungi admin.</p>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold font-serif text-center mb-8">Profil Pengguna</h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                {renderContent()}
                <div className="mt-8 border-t pt-6 text-center">
                    <button onClick={signOut} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileUserPage;