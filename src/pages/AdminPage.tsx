import React from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
// Hapus import useNavigate karena pengalihan ditangani AdminRoute

const AdminPage: React.FC = () => {
    // AdminRoute sudah memastikan user adalah admin dan loading sudah false
    const { user, loading, role } = useAuth();
    const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

    // Ini adalah fallback rendering, AdminRoute seharusnya sudah menangani loading dan redirect
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat sesi admin...</div>
            </div>
        );
    }

    // Hanya render DashboardLayout jika user benar-benar ada dan role-nya admin
    // Ini harus selalu true jika AdminRoute bekerja dengan benar
    if (user && role === 'admin' && user.id === ADMIN_USER_ID) {
        return <DashboardLayout />;
    }

    // Jika sampai sini, berarti ada kondisi yang tidak terduga,
    // atau AdminRoute gagal mengarahkan. Bisa juga terjadi sesaat sebelum redirect.
    return null;
};

export default AdminPage;