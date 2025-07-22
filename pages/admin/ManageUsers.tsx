// pages/admin/ManageUsers.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../src/supabaseClient';
import { UserProfileData, UserProfileStatus } from '../../types';
import { getUserProfile, updateUserProfileStatus } from '../../src/services/userService';
import { CheckCircleIcon, XCircleIcon } from '../../components/icons';

const ManageUsers: React.FC = () => {
    const [pendingUsers, setPendingUsers] = useState<UserProfileData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPendingUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch user_profiles yang statusnya 'pending'
            const { data: profiles, error: profilesError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('status', UserProfileStatus.PENDING);

            if (profilesError) throw profilesError;

            // Jika Anda ingin menampilkan email, Anda perlu menggabungkan data dari auth.users
            // Ini membutuhkan RLS SELECT untuk auth.users.
            // Untuk saat ini, kita akan menampilkan 'N/A' jika email tidak ada di user_profiles.
            // Jika Anda ingin join email di tabel, query select di atas perlu diubah menjadi:
            // .select('*, auth_users:auth.users(email)') dan tambahkan policy RLS untuk auth.users
            // Contoh sederhana fetch email secara terpisah jika diperlukan:
            const usersWithEmail = await Promise.all(
                (profiles || []).map(async (profile) => {
                    const { data: authUser, error: authUserError } = await supabase.auth.admin.getUserById(profile.id);
                    if (authUserError) {
                        console.warn(`Could not fetch email for user ${profile.id}:`, authUserError.message);
                        return { ...profile, email: 'N/A' };
                    }
                    return { ...profile, email: authUser.user?.email || 'N/A' };
                })
            );
            setPendingUsers(usersWithEmail as UserProfileData[]);

        } catch (err: any) {
            console.error('Error fetching pending users:', err.message);
            setError('Gagal memuat daftar pengguna: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPendingUsers();
    }, [fetchPendingUsers]);

    const handleVerifyUser = async (userId: string) => {
        if (window.confirm('Yakin ingin memverifikasi pengguna ini?')) {
            const { success, error: updateError } = await updateUserProfileStatus(userId, UserProfileStatus.VERIFIED);
            if (success) {
                // Panggil Edge Function untuk mengirim email
                try {
                    const { data, error: edgeFunctionError } = await supabase.functions.invoke('send-verification-email', {
                        body: { user_id: userId },
                        // Pastikan Edge Function dideploy dan dikonfigurasi dengan benar
                    });

                    if (edgeFunctionError) throw edgeFunctionError;
                    
                    alert('Pengguna berhasil diverifikasi dan email notifikasi telah dikirim!');
                    console.log('Edge Function Response:', data);

                } catch (edgeError: any) {
                    console.error('Error memanggil Edge Function:', edgeError);
                    alert('Pengguna berhasil diverifikasi, tetapi gagal mengirim email notifikasi: ' + (edgeError.message || 'Kesalahan tidak diketahui.'));
                } finally {
                    fetchPendingUsers(); // Refresh daftar setelah operasi
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
                fetchPendingUsers();
            } else {
                alert('Gagal menolak pengguna: ' + (updateError || 'Kesalahan tidak diketahui.'));
            }
        }
    };

    if (loading) {
        return <div className="text-center py-8 text-gray-700 dark:text-gray-300">Memuat daftar pengguna...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600 dark:text-red-400">Error: {error}</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Manajemen Pengguna (Menunggu Verifikasi)</h2>
            
            {pendingUsers.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">Tidak ada pengguna baru yang menunggu verifikasi.</p>
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
                            {pendingUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{user.full_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.email || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.institution_affiliation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === UserProfileStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : user.status === UserProfileStatus.VERIFIED ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleVerifyUser(user.id)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-4">
                                            <CheckCircleIcon className="h-5 w-5 inline-block mr-1" /> Verifikasi
                                        </button>
                                        <button onClick={() => handleRejectUser(user.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                            <XCircleIcon className="h-5 w-5 inline-block mr-1" /> Tolak
                                        </button>
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