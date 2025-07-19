import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../src/supabaseClient';
import { BlogPost, BlogStatus } from '../types';
import { CalendarIcon } from '../components/icons';

const BlogListPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublishedPosts = async () => {
            const { data, error } = await supabase
                .from('blog')
                .select('*')
                .eq('status', BlogStatus.PUBLISHED)
                .order('tanggal_publikasi', { ascending: false });

            if (error) console.error('Error fetching blog posts:', error);
            else setPosts(data || []);
            setLoading(false);
        };

        fetchPublishedPosts();
    }, []);

    if (loading) return <div className="text-center p-8">Memuat artikel...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-serif text-center mb-10">Blog & Artikel</h1>
            <div className="space-y-10">
                {posts.map(post => (
                    <div key={post.id} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                        {/* ... sisa JSX sama seperti sebelumnya ... */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogListPage;