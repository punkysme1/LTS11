// src/components/CommentForm.tsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { Comment, UserProfileStatus } from '../../types'; // Import UserProfileStatus

interface CommentFormProps {
    targetId: string | number; // ID dari manuskrip (string) atau blog (number)
    type: 'manuskrip' | 'blog'; // Untuk membedakan target
    onCommentPosted?: (newComment: Comment) => void; // Callback opsional untuk refresh daftar komentar
}

const CommentForm: React.FC<CommentFormProps> = ({ targetId, type, onCommentPosted }) => {
    const { user, userProfile } = useAuth(); // Ambil user dan userProfile
    const [commentContent, setCommentContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Pengecekan status profil pengguna untuk izin berkomentar
        if (!user) {
            setError('Anda harus login untuk berkomentar.');
            return;
        }
        if (!userProfile) {
            setError('Profil Anda belum lengkap. Silakan lengkapi profil Anda.');
            return;
        }
        if (userProfile.status !== UserProfileStatus.VERIFIED) { // Hanya izinkan verified user
            setError('Akun Anda belum terverifikasi oleh admin. Silakan tunggu atau hubungi admin.');
            return;
        }
        
        if (commentContent.trim() === '') {
            setError('Komentar tidak boleh kosong.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        let insertData: any = {
            user_id: user.id,
            content: commentContent,
            status: 'pending', // Komentar defaultnya pending untuk moderasi
        };

        if (type === 'manuskrip') { // Perbaikan: Gunakan 'manuskrip' sesuai type prop
            insertData.manuscript_id = targetId;
        } else if (type === 'blog') {
            insertData.blog_id = targetId;
        }

        const { data, error: dbError } = await supabase
            .from('comments')
            .insert(insertData)
            .select('*, user_profiles(full_name)') // Ambil juga nama user dari user_profiles
            .single();

        if (dbError) {
            console.error("Error submitting comment:", dbError);
            setError('Gagal mengirim komentar: ' + dbError.message);
        } else {
            setSuccess('Komentar Anda berhasil dikirim dan menunggu moderasi.');
            setCommentContent('');
            if (onCommentPosted && data) {
                // Pastikan data yang dikirim ke callback sesuai dengan Comment type
                onCommentPosted(data as Comment);
            }
        }
        setLoading(false);
    };

    return (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Tulis Komentar</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                    placeholder="Sampaikan komentar, pertanyaan, atau masukan Anda..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    disabled={loading || !user || userProfile?.status !== UserProfileStatus.VERIFIED} // Disable jika tidak login/tidak terverifikasi
                ></textarea>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                <button
                    type="submit"
                    className="mt-3 px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    disabled={loading || !user || userProfile?.status !== UserProfileStatus.VERIFIED} // Disable juga pada tombol
                >
                    {loading ? 'Mengirim...' : 'Kirim Komentar'}
                </button>
                {!user ? (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Silakan <Link to="/login" className="text-primary-600 hover:underline">login</Link> untuk berkomentar.</p>
                ) : userProfile?.status !== UserProfileStatus.VERIFIED ? (
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-2">Akun Anda sedang <Link to="/user" className="text-primary-600 hover:underline">menunggu verifikasi</Link> oleh admin agar bisa berkomentar.</p>
                ) : null}
            </form>
        </div>
    );
};

export default CommentForm;