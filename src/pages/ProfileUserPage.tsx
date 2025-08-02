// src/pages/ProfileUserPage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import { CompleteProfileFormData, UserProfileStatus } from '../../types';
import { createUserProfile } from '../services/userService';
import { authStore } from '../authStore'; // <-- PERUBAHAN 1: Impor authStore

// Komponen Form internal untuk melengkapi profil
const CompleteProfileForm: React.FC<{ userEmail: string, userId: string }> = ({ userEmail, userId }) => {
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
        } else {
            // PERUBAHAN 2: Jika berhasil, panggil refresh dari authStore.
            // Ini akan memicu render ulang komponen induk dengan state terbaru.
            await authStore.refreshUserProfile();
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2">Selamat Datang!</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
                Email Anda <span className="font-medium">{userEmail}</span> telah terkonfirmasi. Silakan lengkapi profil untuk melanjutkan.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="full_name" className="block text-sm font-medium">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input type="text" name="full_name" id="full_name" value={formData.full_name} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="domicile_address" className="block text-sm font-medium">Alamat Domisili</label>
                    <input type="text" name="domicile_address" id="domicile_address" value={formData.domicile_address || ''} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="institution_affiliation" className="block text-sm font-medium">Afiliasi Institusi</label>
                    <input type="text" name="institution_affiliation" id="institution_affiliation" value={formData.institution_affiliation || ''} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50">
                    {loading ? 'Menyimpan...' : 'Simpan & Lanjutkan'}
                </button>
            </form>
        </div>
    );
};

// Komponen Halaman Profil Utama (tidak ada perubahan di sini)
const ProfileUserPage: React.FC = () => {
    const { user, userProfile, role, signOut, loading: authLoading, isInitialized } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialized && role === 'admin') {
            navigate('/admin', { replace: true });
        }
    }, [role, isInitialized, navigate]);

    if (!isInitialized || authLoading) {
        return <div className="text-center py-20">Memuat sesi pengguna...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const renderContent = () => {
        // Kasus 1: Pengguna baru yang perlu melengkapi profil
        if (role === 'authenticated' || !userProfile) {
            return <CompleteProfileForm userId={user.id} userEmail={user.email || ''} />;
        }
        
        // Kasus 2 & 3: Pengguna sudah memiliki profil
        switch (userProfile.status) {
            case UserProfileStatus.PENDING:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Profil Anda Sedang Ditinjau</h2>
                        <p>Terima kasih, <span className="font-semibold">{userProfile.full_name}</span>. Akun Anda sedang menunggu verifikasi dari admin.</p>
                    </div>
                );
            case UserProfileStatus.VERIFIED:
                return (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Profil Saya</h2>
                        <div className="space-y-3">
                            <p><strong>Nama Lengkap:</strong> {userProfile.full_name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Domisili:</strong> {userProfile.domicile_address || '-'}</p>
                            <p><strong>Institusi:</strong> {userProfile.institution_affiliation || '-'}</p>
                            <p><strong>Status Akun:</strong> <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">{userProfile.status}</span></p>
                        </div>
                    </div>
                );
            default:
                return <p>Status profil Anda tidak dikenali. Hubungi admin.</p>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
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