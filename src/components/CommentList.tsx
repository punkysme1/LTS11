// src/components/CommentList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { Comment, UserRole } from '../../types';

interface CommentListProps {
    targetId: string | number;
    type: 'manuskrip' | 'blog';
    userRole: UserRole;
}

const CommentList: React.FC<CommentListProps> = ({ targetId, type, userRole }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError(null);

        // Query ini sekarang akan berfungsi dengan benar setelah Foreign Key dibuat
        let query = supabase.from('comments').select(`
            id,
            content,
            created_at,
            status,
            user_id,
            user_profiles ( full_name )
        `);

        if (type === 'manuskrip') {
            query = query.eq('manuscript_id', targetId);
        } else {
            query = query.eq('blog_id', targetId);
        }

        if (userRole !== 'admin') {
            query = query.eq('status', 'approved');
        }

        query = query.order('created_at', { ascending: false });

        const { data, error: dbError } = await query;

        if (dbError) {
            console.error("Error fetching comments:", dbError);
            setError('Gagal memuat komentar.');
        } else {
            setComments(data as any[] as Comment[]);
        }
        setLoading(false);
    }, [targetId, type, userRole]);

    useEffect(() => {
        fetchComments();

        const subscription = supabase
            .channel(`comments_channel_${type}_${targetId}`)
            .on('postgres_changes', { 
                event: '*', 
                schema: 'public', 
                table: 'comments',
                filter: type === 'manuskrip' ? `manuscript_id=eq.${targetId}` : `blog_id=eq.${targetId}`
            }, () => {
                fetchComments();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
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
            {comments.map((comment) => {
                // --- PERBAIKAN LOGIKA TAMPIL NAMA ---
                // Lebih aman dalam mengakses properti yang mungkin tidak ada
                const authorName = (comment.user_profiles && comment.user_profiles.full_name) 
                                   ? comment.user_profiles.full_name 
                                   : 'Pengguna Tidak Dikenal';

                return (
                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                                {authorName}
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
                    </div>
                );
            })}
        </div>
    );
};

export default CommentList;