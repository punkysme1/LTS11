// pages/ProfileUserPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../src/contexts/AuthContext';
import { getUserProfile, createUserProfile } from '../src/services/userService';
import { getSearchHistory, deleteSearchHistoryEntry } from '../src/services/searchHistoryService';
import { UserProfileData, SearchHistoryEntry, CompleteProfileFormData, UserProfileStatus } from '../types';

// Membungkus FormField untuk melengkapi profil
const MemoizedProfileFormField: React.FC<{
    name: keyof CompleteProfileFormData;
    label: string;
    type?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    placeholder?: string;
    min?: number;
    value: string | number | boolean | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}> = React.memo(({ name, label, type = 'text', options, required = true, placeholder, min, value, onChange }) => {
    const isCheckbox = type === 'checkbox';

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label} {required && !isCheckbox && <span className="text-red-500">*</span>}
            </label>
            {type === 'select' && options ? (
                <select
                    id={name}
                    name={name}
                    value={value as string}
                    onChange={onChange}
                    required={required}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : isCheckbox ? (
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={value as boolean}
                    onChange={onChange}
                    className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={(type === 'number' && (value === undefined || value === null)) ? '' : value as string | number}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
                    min={min}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
            )}
        </div>
    );
});


const ProfileUserPage: React.FC = () => {
    const { user, signOut } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState<string | null>(null);

    const [profileFormData, setProfileFormData] = useState<CompleteProfileFormData>({
        full_name: '',
        domicile_address: '',
        institution_affiliation: '',
        is_alumni: false,
        alumni_unit: '',
        alumni_grad_year: '',
        occupation: '',
        phone_number: '',
    });
    const [loadingProfileSubmit, setLoadingProfileSubmit] = useState(false);
    const [profileSubmitError, setProfileSubmitError] = useState<string | null>(null);

    const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [errorHistory, setErrorHistory] = useState<string | null>(null);


    const fetchUserProfile = useCallback(async () => {
        if (user) {
            setLoadingProfile(true);
            setErrorProfile(null);
            const profile = await getUserProfile(user.id);
            if (profile) {
                setUserProfile(profile);
                setProfileFormData({ // Isi form jika profil sudah ada
                    full_name: profile.full_name,
                    domicile_address: profile.domicile_address,
                    institution_affiliation: profile.institution_affiliation,
                    is_alumni: profile.is_alumni,
                    alumni_unit: profile.alumni_unit || '',
                    alumni_grad_year: profile.alumni_grad_year || '',
                    occupation: profile.occupation,
                    phone_number: profile.phone_number,
                });
            } else {
                // Profil tidak ditemukan, biarkan form kosong untuk diisi
                setUserProfile(null);
            }
            setLoadingProfile(false);
        }
    }, [user]);

    const fetchHistory = useCallback(async () => {
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
    }, [user]);

    useEffect(() => {
        fetchUserProfile();
        fetchHistory();
    }, [user, fetchUserProfile, fetchHistory]);

    const handleProfileFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setProfileFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' && value === '') ? '' : value,
        }));
    }, []);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setProfileSubmitError('Anda harus login untuk melengkapi profil.');
            return;
        }

        setLoadingProfileSubmit(true);
        setProfileSubmitError(null);

        const dataToSubmit: CompleteProfileFormData = {
            ...profileFormData,
            alumni_grad_year: profileFormData.is_alumni ? (profileFormData.alumni_grad_year === '' ? undefined : Number(profileFormData.alumni_grad_year)) : undefined,
            alumni_unit: profileFormData.is_alumni ? (profileFormData.alumni_unit?.trim() || undefined) : undefined,
        };
        if (!dataToSubmit.is_alumni) {
            dataToSubmit.alumni_unit = undefined;
            dataToSubmit.alumni_grad_year = undefined;
        }

        const { profile, error: createError } = await createUserProfile(user.id, dataToSubmit);

        if (createError) {
            setProfileSubmitError(createError);
        } else if (profile) {
            setUserProfile(profile);
            setProfileSubmitError('Profil berhasil dilengkapi! Menunggu verifikasi admin.');
            // Opsional: Langsung tampilkan profil lengkap dan sembunyikan form
            // Anda bisa mengatur state lain di sini untuk menyembunyikan form dan menampilkan tampilan profil verified.
        }
        setLoadingProfileSubmit(false);
    };


    const handleDeleteEntry = async (id: number) => {
        if (window.confirm('Yakin ingin menghapus entri ini dari histori pencarian?')) {
            const success = await deleteSearchHistoryEntry(id);
            if (success) {
                setSearchHistory(prev => prev.filter(entry => entry.id !== id));
            } else {
                alert('Gagal menghapus entri histori.');
            }
        }
    };

    if (!user) {
        return (
            <div className="text-center py-20 text-gray-700 dark:text-gray-300">
                Anda perlu login untuk melihat halaman profil pengguna.
            </div>
        );
    }

    if (loadingProfile) {
        return <div className="text-center py-20 text-gray-700 dark:text-gray-300">Memuat profil pengguna...</div>;
    }

    // Tampilkan formulir lengkapi profil jika profil belum ada
    if (!userProfile) {
        return (
            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold font-serif text-center text-gray-900 dark:text-white mb-6">Lengkapi Profil Anda</h1>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Profil Anda belum lengkap. Mohon isi detail di bawah ini.</p>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <MemoizedProfileFormField name="full_name" label="Nama Lengkap" placeholder="Nama Lengkap Anda" value={profileFormData.full_name} onChange={handleProfileFormChange} />
                    <MemoizedProfileFormField name="domicile_address" label="Alamat Domisili" placeholder="Contoh: Jakarta" value={profileFormData.domicile_address} onChange={handleProfileFormChange} />
                    <MemoizedProfileFormField name="institution_affiliation" label="Lembaga/Afiliasi" placeholder="Nama Lembaga atau Afiliasi Anda" value={profileFormData.institution_affiliation} onChange={handleProfileFormChange} />

                    <MemoizedProfileFormField name="is_alumni" label="Alumni Qomaruddin" type="checkbox" required={false} value={profileFormData.is_alumni} onChange={handleProfileFormChange} />
                    {profileFormData.is_alumni && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <MemoizedProfileFormField name="alumni_unit" label="Unit Alumni" placeholder="Contoh: Madrasah Aliyah" value={profileFormData.alumni_unit} onChange={handleProfileFormChange} />
                            <MemoizedProfileFormField name="alumni_grad_year" label="Tahun Lulus" type="number" placeholder="Contoh: 2010" min={1900} value={profileFormData.alumni_grad_year} onChange={handleProfileFormChange} />
                        </div>
                    )}

                    <MemoizedProfileFormField name="occupation" label="Pekerjaan" placeholder="Pekerjaan Anda" value={profileFormData.occupation} onChange={handleProfileFormChange} />
                    <MemoizedProfileFormField name="phone_number" label="No. HP" type="tel" placeholder="Contoh: +6281234567890" value={profileFormData.phone_number} onChange={handleProfileFormChange} />
                    
                    {profileSubmitError && <p className="text-red-500 text-sm text-center">{profileSubmitError}</p>}
                    
                    <button
                        type="submit"
                        disabled={loadingProfileSubmit}
                        className="w-full py-3 px-4 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loadingProfileSubmit ? 'Menyimpan Profil...' : 'Lengkapi Profil'}
                    </button>
                </form>
            </div>
        );
    }

    // Tampilkan pesan menunggu verifikasi jika statusnya pending
    if (userProfile.status === UserProfileStatus.PENDING) {
        return (
            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-6">Profil Pengguna Anda</h1>
                <p className="text-yellow-600 dark:text-yellow-400 text-lg mb-4">
                    Profil Anda telah berhasil dilengkapi dan menunggu verifikasi oleh admin.
                </p>
                <p className="text-gray-700 dark:text-gray-300">Email: {user.email}</p>
                <button
                    onClick={signOut}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        );
    }

    // Tampilkan profil lengkap jika sudah verified
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
            </div>

            <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Detail Profil</h2>
                <p className="text-gray-700 dark:text-gray-300"><strong>Nama Lengkap:</strong> {userProfile.full_name}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Alamat Domisili:</strong> {userProfile.domicile_address}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Lembaga/Afiliasi:</strong> {userProfile.institution_affiliation}</p>
                <p className="text-gray-700 dark:text-gray-300">
                    <strong>Alumni Qomaruddin:</strong> {userProfile.is_alumni ? 'Ya' : 'Tidak'}
                    {userProfile.is_alumni && userProfile.alumni_unit && ` (${userProfile.alumni_unit}`}
                    {userProfile.is_alumni && userProfile.alumni_grad_year && ` Lulus ${userProfile.alumni_grad_year})`}
                </p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Pekerjaan:</strong> {userProfile.occupation}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>No. HP:</strong> {userProfile.phone_number}</p>
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

export default ProfileUserPage;