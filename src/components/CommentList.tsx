// src/components/CommentList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { Comment, UserRole, UserProfileStatus } from '../../types'; // Import UserProfileStatus untuk badge status

interface CommentListProps {
    targetId: string | number; // ID dari manuskrip (string) atau blog (number)
    type: 'manuskrip' | 'blog'; // Untuk membedakan target
    userRole: UserRole; // Peran pengguna yang sedang login
}

const CommentList: React.FC<CommentListProps> = ({ targetId, type, userRole }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError(null);

        let query = supabase.from('comments').select(`
            *,
            user_profiles(full_name) -- Ini akan berfungsi setelah FK diperbaiki
        `);

        if (type === 'manuskrip') {
            query = query.eq('manuscript_id', targetId);
        } else if (type === 'blog') {
            query = query.eq('blog_id', targetId);
        }

        // Hanya tampilkan komentar yang disetujui untuk non-admin
        if (userRole !== 'admin') {
            query = query.eq('status', 'approved');
        }

        query = query.order('created_at', { ascending: false });

        const { data, error: dbError } = await query;

        if (dbError) {
            console.error("Error fetching comments:", dbError);
            setError('Gagal memuat komentar.');
        } else {
            setComments(data as Comment[]);
        }
        setLoading(false);
    }, [targetId, type, userRole]);

    useEffect(() => {
        fetchComments();

        // Realtime listener untuk komentar (opsional tapi disarankan)
        const subscription = supabase
            .channel(`comments_channel_${type}_${targetId}`) // Beri nama channel unik
            .on('postgres_changes', { 
                event: '*', 
                schema: 'public', 
                table: 'comments',
                filter: type === 'manuskrip' ? `manuscript_id=eq.${targetId}` : `blog_id=eq.${targetId}`
            }, (payload) => {
                console.log('Realtime change detected:', payload);
                // Hanya refresh jika ada data, untuk menghindari fetch kosong
                if (payload.new || payload.old) {
                    fetchComments();
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
            console.log(`Unsubscribed from comments_channel_${type}_${targetId}`);
        };
    }, [fetchComments, targetId, type]);

    if (loading) {
        return <p className="text-gray-600 dark:text-gray-400 mt-4">Memuat komentar...</p>;
    }

    if (error) {
        return <p className="text-red-600 dark:text-red-400 mt-4">{error}</p>;
    }

    if (comments.length === 0) {
        return <p className="text-gray-600 dark:text-gray-400 mt-4">Belum ada komentar. Jadilah yang pertama berkomentar!</p>;
    }

    return (
        <div className="mt-8 space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {/* Tampilkan full_name dari user_profiles, jika tidak ada, gunakan 'Pengguna Tidak Dikenal' */}
                            {(comment.user_profiles && typeof comment.user_profiles === 'object' && comment.user_profiles.full_name) ? comment.user_profiles.full_name : 'Pengguna Tidak Dikenal'}
                            {userRole === 'admin' && comment.status === 'pending' && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium text-yellow-800 bg-yellow-200 rounded-full dark:bg-yellow-800 dark:text-yellow-100">
                                    Pending
                                </span>
                            )}
                            {userRole === 'admin' && comment.status === 'rejected' && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium text-red-800 bg-red-200 rounded-full dark:bg-red-800 dark:text-red-100">
                                    Ditolak
                                </span>
                            )}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap">
                        {comment.content}
                    </p>
                    {/* Admin bisa melihat tombol moderasi (setujui/tolak/hapus) di sini */}
                    {userRole === 'admin' && (
                        <div className="mt-3 flex space-x-2">
                            {comment.status === 'pending' && (
                                <button
                                    onClick={async () => {
                                        const { error: updateError } = await supabase.from('comments').update({ status: 'approved' }).eq('id', comment.id);
                                        if (updateError) alert('Gagal menyetujui komentar: ' + updateError.message);
                                        else fetchComments(); // Refresh list
                                    }}
                                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 text-sm"
                                >
                                    Setujui
                                </button>
                            )}
                            {comment.status !== 'rejected' && ( // Admin bisa menolak komentar yang pending atau sudah approved
                                <button
                                    onClick={async () => {
                                        const { error: updateError } = await supabase.from('comments').update({ status: 'rejected' }).eq('id', comment.id);
                                        if (updateError) alert('Gagal menolak komentar: ' + updateError.message);
                                        else fetchComments(); // Refresh list
                                    }}
                                    className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-200 text-sm"
                                >
                                    Tolak
                                </button>
                            )}
                            <button
                                onClick={async () => {
                                    if (window.confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
                                        const { error: deleteError } = await supabase.from('comments').delete().eq('id', comment.id);
                                        if (deleteError) alert('Gagal menghapus komentar: ' + deleteError.message);
                                        else fetchComments(); // Refresh list
                                    }
                                }}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 text-sm"
                            >
                                Hapus
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;