// pages/admin/ManageUsers.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { UserProfileData, UserProfileStatus } from '../../../types';
import { getUserProfile, updateUserProfileStatus } from '../../services/userService';
import { CheckCircleIcon, XCircleIcon } from '../../components/icons';

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<UserProfileData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<UserProfileStatus | 'all'>('all');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // PERUBAHAN DI SINI: Lakukan JOIN dengan auth.users untuk mendapatkan email
            let query = supabase.from('user_profiles').select('*, auth_users:auth.users(email)');

            if (selectedStatusFilter !== 'all') {
                query = query.eq('status', selectedStatusFilter);
            }

            const { data: profiles, error: profilesError } = await query;

            if (profilesError) throw profilesError;

            // Data sekarang sudah berisi email dari join
            // Tidak perlu lagi memanggil supabase.auth.admin.getUserById
            setUsers(profiles as UserProfileData[]);
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
                    fetchUsers();
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
                fetchUsers();
            } else {
                alert('Gagal menolak pengguna: ' + (updateError || 'Kesalahan tidak diketahui.'));
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Manajemen Pengguna</h2>
            
            {/* Filter Status */}
            <div className="mb-4 flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300 text-sm">Filter Status:</span>
                <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value as UserProfileStatus | 'all')}
                    className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm"
                >
                    <option value="all">Semua</option>
                    <option value={UserProfileStatus.PENDING}>Menunggu Verifikasi</option>
                    <option value={UserProfileStatus.VERIFIED}>Terverifikasi</option>
                    <option value={UserProfileStatus.REJECTED}>Ditolak</option>
                </select>
            </div>

            {users.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">Tidak ada pengguna yang cocok dengan filter ini.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Nama Lengkap</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Lembaga/Afiliasi</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{user.full_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.auth_users?.email || 'N/A'}</td> {/* PERUBAHAN: Akses email dari objek join */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.institution_affiliation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === UserProfileStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : user.status === UserProfileStatus.VERIFIED ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {user.status === UserProfileStatus.PENDING && ( // Hanya tampilkan verifikasi jika status pending
                                            <button onClick={() => handleVerifyUser(user.id)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-4">
                                                <CheckCircleIcon className="h-5 w-5 inline-block mr-1" /> Verifikasi
                                            </button>
                                        )}
                                        {user.status !== UserProfileStatus.REJECTED && ( // Hanya tampilkan tolak jika belum ditolak
                                            <button onClick={() => handleRejectUser(user.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                <XCircleIcon className="h-5 w-5 inline-block mr-1" /> Tolak
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;