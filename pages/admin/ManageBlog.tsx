import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../src/supabaseClient';
import { BlogPost, BlogStatus } from '../../types';

// Membungkus FormField dengan React.memo untuk optimasi
const MemoizedFormField: React.FC<{ name: keyof BlogPost, label: string, type?: string, rows?: number, options?: { value: string, label: string }[], value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void }> = React.memo(({ name, label, type = 'text', rows, options, value, onChange }) => {
    return (
        <div>
            <label htmlFor={name as string} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    id={name as string}
                    name={name as string}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    rows={rows || 3}
                ></textarea>
            ) : type === 'select' && options ? (
                <select
                    id={name as string}
                    name={name as string}
                    value={value}
                    onChange={onChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    id={name as string}
                    type={type}
                    name={name as string}
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
            )}
        </div>
    );
});


const ManageBlog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState<Partial<BlogPost>>({});

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase.from('blog').select('id, judul_artikel, penulis, isi_artikel, status, tanggal_publikasi, url_thumbnail, created_at').order('created_at', { ascending: false });
        if (error) alert('Error fetching posts: ' + error.message);
        else setPosts(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleAdd = () => {
        setEditingPost(null);
        setFormData({ 
            status: BlogStatus.DRAFT, 
            tanggal_publikasi: new Date().toISOString().split('T')[0],
            url_thumbnail: ''
        }); 
        setShowModal(true);
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        const formattedDate = post.tanggal_publikasi ? new Date(post.tanggal_publikasi).toISOString().split('T')[0] : '';
        setFormData({ 
            ...post, 
            tanggal_publikasi: formattedDate,
            url_thumbnail: post.url_thumbnail || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
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
        if (!formData.judul_artikel || !formData.penulis || !formData.isi_artikel) {
            alert('Judul, Penulis, dan Isi Artikel wajib diisi.');
            return;
        }

        const dataToSave = {
            ...formData,
            status: formData.status as BlogStatus, 
            tanggal_publikasi: formData.status === BlogStatus.PUBLISHED && !formData.tanggal_publikasi
                                ? new Date().toISOString()
                                : formData.tanggal_publikasi
                                    ? new Date(formData.tanggal_publikasi).toISOString()
                                    : null
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Manajemen Blog</h2>
                <button onClick={handleAdd} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 text-white">Tulis Baru</button>
            </div>
            {loading ? <p className="text-gray-600 dark:text-gray-300">Memuat...</p> : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Gambar</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Judul Artikel</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Penulis</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Tanggal Publikasi</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {post.url_thumbnail ? (
                                            <img src={post.url_thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover rounded-md" />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                                                No Img
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{post.judul_artikel}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{post.penulis}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === BlogStatus.PUBLISHED ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {post.tanggal_publikasi ? new Date(post.tanggal_publikasi).toLocaleDateString('id-ID') : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(post)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4">Edit</button>
                                        <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                         {/* Judul modal ini yang menggunakan editingPost */}
                         <h3 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                             {editingPost ? 'Edit Artikel' : 'Tulis Artikel'}
                         </h3>
                         <div className="p-4 space-y-4 overflow-y-auto flex-1">
                            <MemoizedFormField name="judul_artikel" label="Judul Artikel" value={formData.judul_artikel || ''} onChange={handleInputChange} />
                            <MemoizedFormField name="penulis" label="Penulis" value={formData.penulis || ''} onChange={handleInputChange} />
                            <MemoizedFormField name="url_thumbnail" label="URL Thumbnail Gambar" value={formData.url_thumbnail || ''} onChange={handleInputChange} />
                            <MemoizedFormField name="isi_artikel" label="Isi Artikel" type="textarea" rows={10} value={formData.isi_artikel || ''} onChange={handleInputChange} />
                            <MemoizedFormField 
                                name="status" 
                                label="Status" 
                                type="select" 
                                options={[
                                    { value: BlogStatus.DRAFT, label: 'Draft' },
                                    { value: BlogStatus.PUBLISHED, label: 'Published' }
                                ]} 
                                value={formData.status || ''} 
                                onChange={handleInputChange}
                            />
                            {formData.status === BlogStatus.PUBLISHED && (
                                <MemoizedFormField name="tanggal_publikasi" label="Tanggal Publikasi" type="date" value={formData.tanggal_publikasi || ''} onChange={handleInputChange} />
                            )}
                         </div>
                         <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                            <button onClick={() => setShowModal(false)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200">Batal</button>
                            <button onClick={handleSave} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 text-white">Simpan</button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlog;