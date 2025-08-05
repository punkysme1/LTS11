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

const CommentItem: React.FC<{ comment: Comment; onCommentPosted: () => void; userRole: UserRole }> = ({ comment, onCommentPosted, userRole }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const fetchReplies = useCallback(async () => {
    if (!comment.id) return;
    setLoadingReplies(true);
    const { data, error } = await supabase
      .from('comments')
      .select('*, user_profiles!comments_user_id_fkey(full_name)')
      .eq('parent_id', comment.id)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching replies:', error);
    } else {
      setReplies(data || []);
    }
    setLoadingReplies(false);
  }, [comment.id]);

  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);
  
  // --- PERBAIKAN KUNCI: Fungsi ini HANYA menangani balasan ---
  const handleReplySuccess = (newComment: Comment) => {
    // 1. Tambahkan balasan baru ke daftar balasan lokal di bawah induknya.
    // Ini membuat balasan langsung muncul di tempat yang benar.
    setReplies(prevReplies => [...prevReplies, newComment]);

    // 2. Tutup form balasan.
    setShowReplyForm(false);
    
    // PENTING: Kita tidak memanggil onCommentPosted() di sini.
    // Ini mencegah komentar balasan muncul sebagai duplikat di daftar komentar utama.
  };
  
  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  const authorName = (comment.user_profiles as any)?.full_name || 'Pengguna';
  
  return (
    <div className="ml-0 md:ml-8 py-4 border-t border-gray-200 dark:border-gray-700 first:border-t-0">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-primary-700 dark:text-gray-200 font-semibold">{authorName.charAt(0)}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{authorName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(comment.created_at).toLocaleString('id-ID')}
            </p>
          </div>
          <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
          {(userRole === 'verified_user' || userRole === 'admin') && (
             <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-accent-400 dark:hover:text-accent-300"
             >
                {showReplyForm ? 'Batal' : 'Balas'}
             </button>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-2">
            <CommentForm
                targetId={comment.blog_id || comment.manuscript_id!}
                type={comment.blog_id ? 'blog' : 'manuskrip'}
                parentId={comment.id}
                onSuccess={handleReplySuccess}
                onCancelReply={handleCancelReply}
            />
        </div>
      )}

      {loadingReplies && <p className="ml-12 mt-2 text-sm">Memuat balasan...</p>}
      
      {replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} onCommentPosted={onCommentPosted} userRole={userRole} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentList: React.FC<CommentListProps> = ({ targetId, type, userRole }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('comments')
      .select('*, user_profiles!comments_user_id_fkey(full_name)')
      .eq(type === 'blog' ? 'blog_id' : 'manuscript_id', targetId)
      .eq('status', 'approved')
      .is('parent_id', null)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching comments:', fetchError);
      setError('Gagal memuat daftar komentar.');
    } else {
      setComments(data || []);
    }
    setLoading(false);
  }, [targetId, type]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (loading) {
    return <p className="py-4 text-center">Memuat komentar...</p>;
  }

  if (error) {
    return <p className="py-4 text-center text-red-600">{error}</p>;
  }
  
  // Fungsi ini dipanggil setelah komentar UTAMA berhasil dikirim
  const handleTopLevelCommentSuccess = () => {
      fetchComments();
  };

  return (
    <div className="mt-6">
       { (userRole === 'verified_user' || userRole === 'admin') &&
          <CommentForm targetId={targetId} type={type} onSuccess={handleTopLevelCommentSuccess} />
       }

      <div className="mt-8 space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 py-4">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} onCommentPosted={fetchComments} userRole={userRole} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;