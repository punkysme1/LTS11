// src/pages/ProfileUserPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../supabaseClient';
import { UserProfileData, UserProfileStatus } from '../../types'; 
import { Link, useNavigate } from 'react-router-dom';

// --- PERBAIKAN UTAMA ADA DI DALAM KOMPONEN INI ---
const MemoizedProfileFormField: React.FC<{
    name: keyof UserProfileData;
    label: string;
    type?: string;
    required?: boolean;
    value: string | number | boolean | null | undefined; // 1. Tipe diubah untuk menerima 'null'
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
}> = React.memo(({ name, label, type = 'text', required = true, value, onChange, disabled = false }) => {
    const isCheckbox = type === 'checkbox';
    
    // 2. Logika untuk menentukan nilai yang akan ditampilkan pada input
    let displayValue;
    if (isCheckbox) {
        displayValue = !!value; // Untuk checkbox, kita butuh boolean
    } else {
        // Untuk input lain, pastikan bukan boolean dan ubah null/undefined menjadi string kosong
        displayValue = (typeof value === 'boolean' || value === null || value === undefined) ? '' : value;
    }

    return (
        <div>
            <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label} {required && !isCheckbox && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-1">
                {isCheckbox ? (
                    <input
                        type="checkbox" id={name as string} name={name as string}
                        checked={displayValue as boolean} // Menggunakan 'checked'
                        onChange={onChange} disabled={disabled}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                ) : (
                    <input
                        type={type} id={name as string} name={name as string}
                        value={displayValue as string | number} // Menggunakan 'value'
                        onChange={onChange} required={required} disabled={disabled}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:disabled:bg-gray-800"
                    />
                )}
            </div>
        </div>
    );
});


const ProfileUserPage: React.FC = () => {
    const { user, userProfile, loading: authLoading, signOut } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Partial<UserProfileData>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (userProfile) {
            setFormData({
                full_name: userProfile.full_name || '',
                domicile_address: userProfile.domicile_address || '',
                institution_affiliation: userProfile.institution_affiliation || '',
                is_alumni: userProfile.is_alumni || false,
                alumni_unit: userProfile.alumni_unit || '',
                alumni_grad_year: userProfile.alumni_grad_year || undefined,
                occupation: userProfile.occupation || '',
                phone_number: userProfile.phone_number || '',
            });
        }
    }, [userProfile]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const checked = (e.target as HTMLInputElement).checked;
        
        setFormData((prev: Partial<UserProfileData>) => ({ 
            ...prev, 
            [name]: isCheckbox ? checked : value 
        }));
    }, []);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (!user) {
            setError("Pengguna tidak ditemukan. Silakan login kembali.");
            setLoading(false);
            return;
        }

        const dataToSubmit = {
            full_name: formData.full_name,
            domicile_address: formData.domicile_address,
            institution_affiliation: formData.institution_affiliation,
            is_alumni: formData.is_alumni,
            alumni_unit: formData.is_alumni ? formData.alumni_unit : null,
            alumni_grad_year: formData.is_alumni && formData.alumni_grad_year ? Number(formData.alumni_grad_year) : null,
            occupation: formData.occupation,
            phone_number: formData.phone_number,
        };

        let response;
        if (userProfile) {
            response = await supabase
                .from('user_profiles')
                .update(dataToSubmit)
                .eq('id', user.id);
        } else {
            response = await supabase
                .from('user_profiles')
                .insert({ ...dataToSubmit, id: user.id, status: UserProfileStatus.PENDING });
        }

        setLoading(false);

        if (response.error) {
            setError(response.error.message);
        } else {
            setSuccessMessage(userProfile ? 'Profil berhasil diperbarui!' : 'Profil berhasil dibuat! Data Anda akan diverifikasi oleh Admin.');
            setTimeout(() => window.location.reload(), 2000);
        }
    };

    if (authLoading) {
        return <div className="text-center py-10">Memuat data pengguna...</div>;
    }

    if (!user) {
        return (
            <div className="text-center py-10">
                <p>Silakan <Link to="/login" className="text-primary-600 hover:underline">login</Link> untuk melihat profil Anda.</p>
            </div>
        );
    }
    
    const pageTitle = userProfile ? 'Edit Profil Anda' : 'Lengkapi Profil Anda';
    const profileStatus = userProfile?.status || 'Belum ada profil';

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
                <button onClick={handleSignOut} className="text-sm text-red-500 hover:underline">Logout</button>
            </div>

            <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Status Profil:</strong> <span className="font-semibold capitalize">{profileStatus}</span></p>
                {userProfile?.status === 'pending' && <p className="text-yellow-600">Profil Anda sedang menunggu verifikasi oleh admin.</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <MemoizedProfileFormField name="full_name" label="Nama Lengkap" value={formData.full_name} onChange={handleInputChange} />
                <MemoizedProfileFormField name="domicile_address" label="Alamat Domisili" value={formData.domicile_address} onChange={handleInputChange} />
                <MemoizedProfileFormField name="institution_affiliation" label="Lembaga/Afiliasi Institusi" value={formData.institution_affiliation} onChange={handleInputChange} />
                <MemoizedProfileFormField name="occupation" label="Pekerjaan" value={formData.occupation} onChange={handleInputChange} />
                <MemoizedProfileFormField name="phone_number" label="Nomor HP" value={formData.phone_number} onChange={handleInputChange} />
                <MemoizedProfileFormField name="is_alumni" label="Apakah Anda Alumni PP. Qomaruddin?" type="checkbox" value={formData.is_alumni} onChange={handleInputChange} />
                
                {formData.is_alumni && (
                    <div className="pl-4 border-l-2 border-primary-500 space-y-4">
                        <MemoizedProfileFormField name="alumni_unit" label="Unit Alumni (contoh: MA, MTs, MI)" value={formData.alumni_unit} onChange={handleInputChange} required={false} />
                        <MemoizedProfileFormField name="alumni_grad_year" label="Tahun Lulus" type="number" value={formData.alumni_grad_year} onChange={handleInputChange} required={false} />
                    </div>
                )}
                
                {error && <p className="text-red-500 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                <div className="pt-4">
                    <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400">
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileUserPage;