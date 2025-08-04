// src/components/CommentList.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { Comment, UserRole } from '../../types';
import CommentForm from './CommentForm';

interface CommentListProps {
    targetId: string | number;
    type: 'manuskrip' | 'blog';
    userRole: UserRole;
}

interface CommentWithReplies extends Comment {
    replies: CommentWithReplies[];
}

const CommentItem: React.FC<{ 
    comment: CommentWithReplies; 
    onCommentPosted: () => void; 
    userRole: UserRole; 
    targetId: string | number; 
    type: 'manuskrip' | 'blog' 
}> = ({ comment, onCommentPosted, userRole, targetId, type }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    
    const authorName = comment.user_profiles?.full_name || 'Pengguna Tidak Dikenal';
    const canReply = userRole === 'admin' || userRole === 'verified_user';

    const handleNewReply = () => {
        setShowReplyForm(false);
        onCommentPosted();
    };

    return (
        <div className="py-2">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{authorName}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{new Date(comment.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 break-words whitespace-pre-wrap mb-3">{comment.content}</p>
                
                {canReply && (
                    <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-sm font-semibold text-primary-600 hover:underline">
                        {showReplyForm ? 'Tutup' : 'Balas'}
                    </button>
                )}
            </div>

            {showReplyForm && (
                <CommentForm
                    targetId={targetId}
                    type={type}
                    parentId={comment.id}
                    onCommentPosted={handleNewReply}
                    onCancelReply={() => setShowReplyForm(false)}
                />
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 md:ml-8 border-l-2 border-gray-200 dark:border-gray-600 pl-4 mt-2">
                    {comment.replies.map(reply => (
                        <CommentItem 
                            key={reply.id} 
                            comment={reply} 
                            onCommentPosted={onCommentPosted}
                            userRole={userRole}
                            targetId={targetId}
                            type={type}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


const CommentList: React.FC<CommentListProps> = ({ targetId, type, userRole }) => {
    const [commentTree, setCommentTree] = useState<CommentWithReplies[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const buildCommentTree = useCallback((comments: Comment[]): CommentWithReplies[] => {
        const commentMap: { [key: number]: CommentWithReplies } = {};
        const tree: CommentWithReplies[] = [];

        comments.forEach(comment => {
            commentMap[comment.id] = { ...comment, replies: [] };
        });

        comments.forEach(comment => {
            if (comment.parent_id && commentMap[comment.parent_id]) {
                commentMap[comment.parent_id].replies.push(commentMap[comment.id]);
            } else {
                tree.push(commentMap[comment.id]);
            }
        });

        return tree;
    }, []);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError(null);
        let query = supabase.from('comments').select(`
            id, content, created_at, parent_id,
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

        query = query.order('created_at', { ascending: true });

        const { data, error: dbError } = await query;
        
        if (dbError) {
            console.error("Error fetching comments:", dbError);
            setError('Gagal memuat komentar.');
        } else {
            const tree = buildCommentTree(data as unknown as Comment[]);
            setCommentTree(tree);
        }
        setLoading(false);
    }, [targetId, type, userRole, buildCommentTree]);

    useEffect(() => {
        fetchComments();
        
        const channel = supabase.channel(`comments_channel_${type}_${targetId}`);
        
        // --- PERUBAHAN DI SINI ---
        const subscription = channel
            // Variabel 'payload' dihapus karena tidak digunakan
            .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, () => {
                fetchComments();
            })
            .subscribe();
    
        // Fungsi cleanup sekarang menggunakan variabel 'subscription'
        return () => {
            supabase.removeChannel(subscription);
        };
    }, [fetchComments, type, targetId]);
    
    const handleNewComment = () => {
        fetchComments();
    };


    if (loading) return <p className="text-gray-600 dark:text-gray-400 mt-4">Memuat komentar...</p>;
    if (error) return <p className="text-red-600 dark:text-red-400 mt-4">{error}</p>;
    if (commentTree.length === 0) return <p className="text-gray-600 dark:text-gray-400 mt-4">Belum ada komentar.</p>;

    return (
        <div className="mt-8 space-y-4">
            {commentTree.map((comment) => (
                <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    onCommentPosted={handleNewComment}
                    userRole={userRole}
                    targetId={targetId}
                    type={type}
                />
            ))}
        </div>
    );
};

export default CommentList;