import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { UserProfileData, UserProfileStatus, CompleteProfileFormData } from '../../../types';
import { getUserProfile, createUserProfile, updateUserProfileStatus } from '../../services/userService'; // Import createUserProfile
import { CheckCircleIcon, XCircleIcon, PlusCircleIcon } from '../../components/icons'; // Import PlusCircleIcon

// Ini adalah antarmuka gabungan untuk melihat pengguna di admin
interface AdminUserView extends UserProfileData {
    email: string; // Email dari auth.users
    has_profile: boolean; // Apakah user_profiles ada untuk ID ini
}

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<AdminUserView[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<UserProfileStatus | 'all'>('all');

    const [showAddProfileModal, setShowAddProfileModal] = useState(false);
    const [newProfileData, setNewProfileData] = useState<CompleteProfileFormData & { userId: string }>({
        userId: '',
        full_name: '',
        domicile_address: '',
        institution_affiliation: '',
        is_alumni: false,
        alumni_unit: '',
        alumni_grad_year: '',
        occupation: '',
        phone_number: '',
        status: UserProfileStatus.PENDING, // Default status saat membuat
    });
    const [addProfileLoading, setAddProfileLoading] = useState(false);
    const [addProfileError, setAddProfileError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // PERUBAHAN KRUSIAL DI SINI:
            // Ambil semua user dari auth.users (hanya admin yang bisa membaca ini karena RLS auth.users default)
            const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
            if (authError) throw authError;

            // Ambil semua profil dari user_profiles (hanya admin yang bisa membaca ini)
            const { data: userProfiles, error: profilesError } = await supabase.from('user_profiles').select('*');
            if (profilesError) throw profilesError;

            // Buat map dari userProfiles untuk lookup cepat
            const profilesMap = new Map<string, UserProfileData>();
            userProfiles.forEach(p => profilesMap.set(p.id, p));

            // Gabungkan data auth.users dengan user_profiles
            const combinedUsers: AdminUserView[] = authUsers.users.map(authUser => {
                const profile = profilesMap.get(authUser.id);
                return {
                    id: authUser.id,
                    email: authUser.email || 'N/A',
                    has_profile: !!profile,
                    full_name: profile?.full_name || 'Tidak Ada Profil',
                    domicile_address: profile?.domicile_address || 'Tidak Ada Profil',
                    institution_affiliation: profile?.institution_affiliation || 'Tidak Ada Profil',
                    is_alumni: profile?.is_alumni || false,
                    alumni_unit: profile?.alumni_unit || null,
                    alumni_grad_year: profile?.alumni_grad_year || null,
                    occupation: profile?.occupation || 'Tidak Ada Profil',
                    phone_number: profile?.phone_number || 'Tidak Ada Profil',
                    status: profile?.status || UserProfileStatus.NO_PROFILE, // Set status khusus jika tidak ada profil
                    created_at: profile?.created_at || authUser.created_at, // Gunakan created_at dari auth jika tidak ada profil
                    updated_at: profile?.updated_at || authUser.updated_at, // Gunakan updated_at dari auth jika tidak ada profil
                };
            });

            // Terapkan filter status
            const filtered = combinedUsers.filter(user => {
                if (selectedStatusFilter === 'all') return true;
                if (selectedStatusFilter === UserProfileStatus.NO_PROFILE) { // Filter khusus untuk "Tidak Ada Profil"
                    return !user.has_profile;
                }
                return user.status === selectedStatusFilter;
            });

            setUsers(filtered);
        } catch (err: any) {
            console.error('Error fetching users:', err.message);
            setError('Gagal memuat daftar pengguna: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [selectedStatusFilter]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleVerifyUser = async (userId: string) => {
        if (window.confirm('Yakin ingin memverifikasi pengguna ini?')) {
            const { success, error: updateError } = await updateUserProfileStatus(userId, UserProfileStatus.VERIFIED);
            if (success) {
                try {
                    // Optional: panggil Edge Function untuk kirim email
                    const { data, error: edgeFunctionError } = await supabase.functions.invoke('send-verification-email', {
                        body: { user_id: userId },
                    });

                    if (edgeFunctionError) throw edgeFunctionError;
                    
                    alert('Pengguna berhasil diverifikasi dan email notifikasi telah dikirim!');
                    console.log('Edge Function Response:', data);

                } catch (edgeError: any) {
                    console.error('Error memanggil Edge Function:', edgeError);
                    alert('Pengguna berhasil diverifikasi, tetapi gagal mengirim email notifikasi: ' + (edgeError.message || 'Kesalahan tidak diketahui.'));
                } finally {
                    fetchUsers(); // Refresh daftar setelah update
                }
            } else {
                alert('Gagal memverifikasi pengguna: ' + (updateError || 'Kesalahan tidak diketahui.'));
            }
        }
    };

    const handleRejectUser = async (userId: string) => {
        if (window.confirm('Yakin ingin menolak pengguna ini? (Profil akan ditandai ditolak)')) {
            const { success, error: updateError } = await updateUserProfileStatus(userId, UserProfileStatus.REJECTED);
            if (success) {
                alert('Pengguna berhasil ditolak!');
                fetchUsers(); // Refresh daftar setelah update
            } else {
                alert('Gagal menolak pengguna: ' + (updateError || 'Kesalahan tidak diketahui.'));
            }
        }
    };

    const handleNewProfileFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setNewProfileData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' && value === '') ? '' : value,
        }));
    }, []);

    const handleCreateProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddProfileLoading(true);
        setAddProfileError(null);

        if (!newProfileData.userId || !newProfileData.full_name.trim()) {
            setAddProfileError('ID Pengguna dan Nama Lengkap wajib diisi.');
            setAddProfileLoading(false);
            return;
        }

        const dataToSubmit: CompleteProfileFormData = {
            ...newProfileData,
            alumni_grad_year: newProfileData.is_alumni && newProfileData.alumni_grad_year !== '' ? Number(newProfileData.alumni_grad_year) : undefined,
            alumni_unit: newProfileData.is_alumni ? (newProfileData.alumni_unit?.trim() || undefined) : undefined,
        };
        if (!dataToSubmit.is_alumni) {
            dataToSubmit.alumni_unit = undefined;
            dataToSubmit.alumni_grad_year = undefined;
        }

        const { profile, error: createError } = await createUserProfile(newProfileData.userId, dataToSubmit);

        if (createError) {
            console.error("Error creating profile from admin:", createError);
            setAddProfileError('Gagal membuat profil: ' + createError);
        } else if (profile) {
            alert('Profil berhasil dibuat!');
            setShowAddProfileModal(false);
            setNewProfileData({ // Reset form
                userId: '', full_name: '', domicile_address: '', institution_affiliation: '', is_alumni: false,
                alumni_unit: '', alumni_grad_year: '', occupation: '', phone_number: '', status: UserProfileStatus.PENDING
            });
            fetchUsers(); // Refresh daftar
        }
        setAddProfileLoading(false);
    };


    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Manajemen Pengguna</h2>
            
            <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                {/* Filter Status */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Filter Status:</span>
                    <select
                        value={selectedStatusFilter}
                        onChange={(e) => setSelectedStatusFilter(e.target.value as UserProfileStatus | 'all')}
                        className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm"
                    >
                        <option value="all">Semua</option>
                        <option value={UserProfileStatus.NO_PROFILE}>Tidak Ada Profil</option> {/* Opsi baru */}
                        <option value={UserProfileStatus.PENDING}>Menunggu Verifikasi</option>
                        <option value={UserProfileStatus.VERIFIED}>Terverifikasi</option>
                        <option value={UserProfileStatus.REJECTED}>Ditolak</option>
                    </select>
                </div>

                {/* Tombol Tambah Profil Baru */}
                <button
                    onClick={() => setShowAddProfileModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 text-white"
                >
                    <PlusCircleIcon className="w-5 h-5 mr-2" />
                    Tambah Profil Baru
                </button>
            </div>

            {loading ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">Memuat pengguna...</p>
            ) : error ? (
                <p className="text-red-600 dark:text-red-400 text-center py-4">{error}</p>
            ) : users.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">Tidak ada pengguna yang cocok dengan filter ini.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ID Pengguna (Auth)</th> {/* Kolom baru */}
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Nama Lengkap</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Email (Auth)</th> {/* Kolom baru */}
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Lembaga/Afiliasi</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status Profil</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{user.full_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.institution_affiliation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.status === UserProfileStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : 
                                            user.status === UserProfileStatus.VERIFIED ? 'bg-green-100 text-green-800' : 
                                            user.status === UserProfileStatus.REJECTED ? 'bg-red-100 text-red-800' : 
                                            'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200' // Untuk NO_PROFILE
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {!user.has_profile ? ( // Jika belum ada profil, admin bisa membuat
                                            <button onClick={() => {
                                                setNewProfileData(prev => ({ ...prev, userId: user.id, full_name: user.full_name === 'Tidak Ada Profil' ? '' : user.full_name }));
                                                setShowAddProfileModal(true);
                                            }} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4">
                                                <PlusCircleIcon className="h-5 w-5 inline-block mr-1" /> Buat Profil
                                            </button>
                                        ) : (
                                            <>
                                                {user.status === UserProfileStatus.PENDING && (
                                                    <button onClick={() => handleVerifyUser(user.id)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-4">
                                                        <CheckCircleIcon className="h-5 w-5 inline-block mr-1" /> Verifikasi
                                                    </button>
                                                )}
                                                {user.status !== UserProfileStatus.REJECTED && (
                                                    <button onClick={() => handleRejectUser(user.id)} className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300">
                                                        <XCircleIcon className="h-5 w-5 inline-block mr-1" /> Tolak
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Tambah Profil Baru */}
            {showAddProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                        <h3 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                            Buat Profil Pengguna Baru
                        </h3>
                        <form onSubmit={handleCreateProfileSubmit} className="p-4 overflow-y-auto flex-1 space-y-4">
                            <div>
                                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User ID (UUID dari Authentication)</label>
                                <input
                                    type="text"
                                    id="userId"
                                    name="userId"
                                    value={newProfileData.userId}
                                    onChange={handleNewProfileFormChange}
                                    disabled // ID tidak bisa diubah manual
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 disabled:bg-gray-200 dark:disabled:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    value={newProfileData.full_name}
                                    onChange={handleNewProfileFormChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="domicile_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat Domisili</label>
                                <input type="text" id="domicile_address" name="domicile_address" value={newProfileData.domicile_address} onChange={handleNewProfileFormChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                            </div>
                            <div>
                                <label htmlFor="institution_affiliation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lembaga/Afiliasi</label>
                                <input type="text" id="institution_affiliation" name="institution_affiliation" value={newProfileData.institution_affiliation} onChange={handleNewProfileFormChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                            </div>
                            <div>
                                <label htmlFor="is_alumni" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alumni Qomaruddin</label>
                                <input type="checkbox" id="is_alumni" name="is_alumni" checked={newProfileData.is_alumni} onChange={handleNewProfileFormChange} className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700" />
                            </div>
                            {newProfileData.is_alumni && (
                                <>
                                    <div>
                                        <label htmlFor="alumni_unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit Alumni</label>
                                        <input type="text" id="alumni_unit" name="alumni_unit" value={newProfileData.alumni_unit || ''} onChange={handleNewProfileFormChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                                    </div>
                                    <div>
                                        <label htmlFor="alumni_grad_year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tahun Lulus</label>
                                        <input type="number" id="alumni_grad_year" name="alumni_grad_year" value={newProfileData.alumni_grad_year || ''} onChange={handleNewProfileFormChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                                    </div>
                                </>
                            )}
                            <div>
                                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pekerjaan</label>
                                <input type="text" id="occupation" name="occupation" value={newProfileData.occupation} onChange={handleNewProfileFormChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                            </div>
                            <div>
                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No. HP</label>
                                <input type="tel" id="phone_number" name="phone_number" value={newProfileData.phone_number} onChange={handleNewProfileFormChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                            </div>
                            {/* Admin bisa mengatur status awal saat membuat profil */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status Awal Profil</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newProfileData.status}
                                    onChange={handleNewProfileFormChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                >
                                    <option value={UserProfileStatus.PENDING}>PENDING</option>
                                    <option value={UserProfileStatus.VERIFIED}>VERIFIED</option>
                                    <option value={UserProfileStatus.REJECTED}>REJECTED</option>
                                </select>
                            </div>

                            {addProfileError && <p className="text-red-500 text-sm mt-2">{addProfileError}</p>}
                            
                            <div className="flex justify-end space-x-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <button type="button" onClick={() => setShowAddProfileModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200">Batal</button>
                                <button type="submit" disabled={addProfileLoading} className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {addProfileLoading ? 'Membuat...' : 'Buat Profil'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;