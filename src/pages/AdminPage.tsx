// src/pages/AdminPage.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';

const AdminPage: React.FC = () => {
    // Ambil semua state yang relevan dari useAuth
    const { user, loading, role, isInitialized } = useAuth();
    const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

    // Tampilkan loading screen jika authStore belum diinisialisasi atau masih dalam proses loading
    // Ini penting agar tidak ada konten kosong sebelum keputusan redirect/render.
    if (!isInitialized || loading) {
        console.log("ADMIN_PAGE: Rendering loading screen. isInitialized:", isInitialized, "loading:", loading);
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat sesi admin...</div>
            </div>
        );
    }

    // Setelah loading selesai dan authStore diinisialisasi:
    // Periksa apakah user ada, role adalah admin, DAN user ID cocok dengan ADMIN_USER_ID.
    // Jika semua kondisi terpenuhi, render DashboardLayout.
    if (user && role === 'admin' && user.id === ADMIN_USER_ID) {
        console.log("ADMIN_PAGE: User is authenticated as admin. Rendering DashboardLayout.");
        return <DashboardLayout />;
    }

    // Jika sampai di sini, berarti user tidak valid untuk halaman admin (setelah loading selesai).
    // AdminRoute seharusnya sudah menangani pengalihan, jadi AdminPage tidak perlu melakukan redirect lagi.
    // Mengembalikan null untuk mencegah rendering yang tidak diinginkan sesaat sebelum redirect oleh AdminRoute.
    console.log("ADMIN_PAGE: User is NOT authenticated as admin. Returning null, AdminRoute should handle redirect. User:", user?.id, "Role:", role);
    return null;
};

export default AdminPage;