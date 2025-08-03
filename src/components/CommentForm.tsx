// src/components/CommentForm.tsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { Comment, UserProfileStatus } from '../../types';
import { Link } from 'react-router-dom';

interface CommentFormProps {
    targetId: string | number;
    type: 'manuskrip' | 'blog';
    parentId?: number | null; // PROPERTI BARU: Untuk ID komentar induk
    onCommentPosted?: (newComment: Comment) => void;
    onCancelReply?: () => void; // PROPERTI BARU: Untuk membatalkan balasan
}

const CommentForm: React.FC<CommentFormProps> = ({ targetId, type, parentId = null, onCommentPosted, onCancelReply }) => {
    const { user, userProfile } = useAuth();
    const [commentContent, setCommentContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || userProfile?.status !== UserProfileStatus.VERIFIED) {
            setError('Anda harus login dan terverifikasi untuk berkomentar.');
            return;
        }
        if (commentContent.trim() === '') {
            setError('Komentar tidak boleh kosong.');
            return;
        }

        setLoading(true);
        setError(null);

        const insertData: any = {
            user_id: user.id,
            content: commentContent,
            status: 'pending',
            parent_id: parentId, // Menyertakan parent_id saat insert
        };

        if (type === 'manuskrip') insertData.manuscript_id = targetId;
        else if (type === 'blog') insertData.blog_id = targetId;

        const { data, error: dbError } = await supabase
            .from('comments')
            .insert(insertData)
            .select('*, user_profiles!comments_user_id_fkey(full_name)')
            .single();

        setLoading(false);
        if (dbError) {
            setError('Gagal mengirim komentar: ' + dbError.message);
        } else {
            setCommentContent('');
            if (onCommentPosted && data) onCommentPosted(data as any);
            if (onCancelReply) onCancelReply(); // Tutup form balasan setelah sukses
        }
    };

    const isReplyForm = parentId !== null;

    return (
        <div className={`mt-4 ${isReplyForm ? 'ml-4 md:ml-8 border-l-2 pl-4' : 'p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner'}`}>
            {!isReplyForm && <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Tulis Komentar</h3>}
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-600 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                    rows={isReplyForm ? 2 : 4}
                    placeholder={isReplyForm ? 'Tulis balasan...' : 'Sampaikan komentar, pertanyaan, atau masukan Anda...'}
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    disabled={loading || !user || userProfile?.status !== UserProfileStatus.VERIFIED}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                
                <div className="flex items-center mt-3 space-x-2">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 disabled:opacity-50"
                        disabled={loading || !user || userProfile?.status !== UserProfileStatus.VERIFIED}
                    >
                        {loading ? 'Mengirim...' : 'Kirim'}
                    </button>
                    {isReplyForm && (
                        <button type="button" onClick={onCancelReply} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                            Batal
                        </button>
                    )}
                </div>

                {!user && !isReplyForm && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Silakan <Link to="/login" className="text-primary-600 hover:underline">login</Link> untuk berkomentar.</p>
                )}
            </form>
        </div>
    );
};

export default CommentForm;