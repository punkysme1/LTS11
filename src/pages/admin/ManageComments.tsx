// src/pages/admin/ManageComments.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { Comment } from '../../../types'; // Pastikan Comment type diimpor
import { useAuth } from '../../hooks/useAuth'; // Pastikan useAuth diimpor

const ManageComments: React.FC = () => {
    const { user, role } = useAuth(); // Dapatkan user dan role dari useAuth
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Dapatkan Admin UUID dari environment variable
    const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

    const fetchComments = useCallback(async () => {
        if (!user || user.id !== ADMIN_USER_ID) {
            setError('Anda tidak memiliki izin untuk melihat halaman ini.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Ambil semua komentar, tanpa filter status
            const { data, error: dbError } = await supabase
                .from('comments')
                .select(`
                    *,
                    user_profiles(full_name)
                `)
                .order('created_at', { ascending: false });

            if (dbError) {
                console.error('Error fetching comments for moderation:', dbError);
                setError('Gagal memuat komentar untuk moderasi.');
            } else {
                setComments(data as Comment[]);
            }
        } catch (err: any) {
            console.error('Exception fetching comments for moderation:', err);
            setError('Terjadi kesalahan saat memuat komentar: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [user, ADMIN_USER_ID]);

    useEffect(() => {
        fetchComments();

        // Realtime listener untuk memastikan daftar komentar selalu terbaru
        const channel = supabase
            .channel('comments_admin_moderation_channel') // Nama channel unik
            .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, payload => {
                console.log('Realtime change for admin comments:', payload);
                fetchComments(); // Refresh daftar saat ada perubahan
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchComments]);

    const handleStatusChange = async (commentId: number, newStatus: 'approved' | 'pending' | 'rejected') => {
        if (!user || user.id !== ADMIN_USER_ID) {
            alert('Anda tidak memiliki izin untuk melakukan tindakan ini.');
            return;
        }

        const { error: updateError } = await supabase
            .from('comments')
            .update({ status: newStatus })
            .eq('id', commentId);

        if (updateError) {
            alert('Gagal memperbarui status komentar: ' + updateError.message);
            console.error('Error updating comment status:', updateError);
        } else {
            alert('Status komentar berhasil diperbarui.');
            fetchComments(); // Refresh daftar setelah perubahan
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (!user || user.id !== ADMIN_USER_ID) {
            alert('Anda tidak memiliki izin untuk melakukan tindakan ini.');
            return;
        }

        if (window.confirm('Apakah Anda yakin ingin menghapus komentar ini secara permanen?')) {
            const { error: deleteError } = await supabase
                .from('comments')
                .delete()
                .eq('id', commentId);

            if (deleteError) {
                alert('Gagal menghapus komentar: ' + deleteError.message);
                console.error('Error deleting comment:', deleteError);
            } else {
                alert('Komentar berhasil dihapus.');
                fetchComments(); // Refresh daftar setelah penghapusan
            }
        }
    };

    if (loading) {
        return <div className="text-center py-8 text-gray-700 dark:text-gray-300">Memuat komentar untuk moderasi...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600 dark:text-red-400">{error}</div>;
    }

    if (comments.length === 0) {
        return <div className="text-center py-8 text-gray-600 dark:text-gray-400">Tidak ada komentar yang tersedia untuk moderasi.</div>;
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Moderasi Komentar</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Konten
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Pengirim
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Target
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {comments.map(comment => (
                            <tr key={comment.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 max-w-xs overflow-hidden text-ellipsis">
                                    {comment.content}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    {comment.user_profiles && typeof comment.user_profiles === 'object' ? comment.user_profiles.full_name : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {comment.manuscript_id ? `Manuskrip: ${comment.manuscript_id}` : `Blog: ${comment.blog_id}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        comment.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                                        comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                    }`}>
                                        {comment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {comment.status !== 'approved' && (
                                        <button onClick={() => handleStatusChange(comment.id, 'approved')} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 mr-2">Setujui</button>
                                    )}
                                    {comment.status !== 'pending' && (
                                        <button onClick={() => handleStatusChange(comment.id, 'pending')} className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-200 mr-2">Pending</button>
                                    )}
                                    {comment.status !== 'rejected' && (
                                        <button onClick={() => handleStatusChange(comment.id, 'rejected')} className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-200 mr-2">Tolak</button>
                                    )}
                                    <button onClick={() => handleDeleteComment(comment.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageComments;