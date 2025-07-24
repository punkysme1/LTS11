import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from './LoginPage';
import DashboardLayout from './DashboardLayout';

const AdminPage: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Memuat sesi...</div>
            </div>
        );
    }

    // Jika ada user, tampilkan Dashboard. Jika tidak, tampilkan halaman Login.
    return user ? <DashboardLayout /> : <LoginPage />;
};

export default AdminPage;
