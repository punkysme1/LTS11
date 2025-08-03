// src/pages/BlogListPage.tsx
import React from 'react';
import { useData } from '../hooks/useData';
import BlogCard from '../components/BlogCard';

const BlogListPage: React.FC = () => {
    const { blogPosts, loading } = useData();

    if (loading) {
        return <div className="text-center p-8">Memuat artikel...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
            <h1 className="text-4xl font-bold font-serif text-center mb-10">Blog & Artikel</h1>
            <div className="space-y-10">
                {blogPosts.length === 0 ? (
                    <p className="text-center">Belum ada artikel yang dipublikasikan.</p>
                ) : (
                    blogPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogListPage;