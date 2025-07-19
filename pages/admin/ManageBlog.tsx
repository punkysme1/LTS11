import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../src/supabaseClient';
import { BlogPost, BlogStatus } from '../../types';

const ManageBlog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState<Partial<BlogPost>>({});

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('blog').select('*').order('created_at', { ascending: false });
        if (error) alert('Error fetching posts: ' + error.message);
        else setPosts(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        setEditingPost(null);
        setFormData({ status: BlogStatus.DRAFT });
        setShowModal(true);
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData(post);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Yakin ingin menghapus artikel ini?')) {
            const { error } = await supabase.from('blog').delete().eq('id', id);
            if (error) alert('Gagal menghapus: ' + error.message);
            else {
                alert('Artikel berhasil dihapus.');
                fetchPosts();
            }
        }
    };

    const handleSave = async () => {
        if (!formData.judul_artikel || !formData.penulis) {
            alert('Judul dan Penulis wajib diisi.');
            return;
        }

        const dataToSave = {
            ...formData,
            tanggal_publikasi: formData.status === BlogStatus.PUBLISHED && !formData.tanggal_publikasi ? new Date().toISOString() : formData.tanggal_publikasi
        };

        const { error } = editingPost
            ? await supabase.from('blog').update(dataToSave).eq('id', editingPost.id)
            : await supabase.from('blog').insert([dataToSave]);

        if (error) alert('Gagal menyimpan: ' + error.message);
        else {
            alert('Artikel berhasil disimpan.');
            setShowModal(false);
            fetchPosts();
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Manajemen Blog</h2>
                <button onClick={handleAdd} className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white">Tulis Baru</button>
            </div>
            {loading ? <p>Memuat...</p> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        {/* Table Head */}
                        <tbody>
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.judul_artikel}</td>
                                    <td>{post.penulis}</td>
                                    <td><span className={`px-2 py-1 text-xs rounded-full ${post.status === BlogStatus.PUBLISHED ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{post.status}</span></td>
                                    <td>{new Date(post.tanggal_publikasi).toLocaleDateString('id-ID')}</td>
                                    <td>
                                        <button onClick={() => handleEdit(post)}>Edit</button>
                                        <button onClick={() => handleDelete(post.id)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg w-full max-w-2xl">
                         <h3>{editingPost ? 'Edit Artikel' : 'Tulis Artikel'}</h3>
                         <div className="p-4 space-y-4">
                            <input name="judul_artikel" value={formData.judul_artikel || ''} onChange={handleInputChange} placeholder="Judul Artikel"/>
                            <input name="penulis" value={formData.penulis || ''} onChange={handleInputChange} placeholder="Penulis"/>
                            <textarea name="isi_artikel" value={formData.isi_artikel || ''} onChange={handleInputChange} placeholder="Isi artikel..." rows={10}></textarea>
                            <select name="status" value={formData.status || ''} onChange={handleInputChange}>
                                <option value={BlogStatus.DRAFT}>Draft</option>
                                <option value={BlogStatus.PUBLISHED}>Published</option>
                            </select>
                         </div>
                         <div>
                            <button onClick={() => setShowModal(false)}>Batal</button>
                            <button onClick={handleSave}>Simpan</button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlog;