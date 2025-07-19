
import React from 'react';

const AdminPage: React.FC = () => {
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would handle authentication
        alert('Fungsi login belum diimplementasikan.');
    };
    
    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold font-serif text-center mb-2">Area Admin</h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                    Silakan login untuk mengelola konten.
                </p>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
                            defaultValue="admin"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"  className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600"
                            defaultValue="password"
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
                    Ini adalah halaman placeholder. Fungsionalitas CRUD, upload massal, dan moderasi belum diimplementasikan.
                </p>
            </div>
        </div>
    );
};

export default AdminPage;
