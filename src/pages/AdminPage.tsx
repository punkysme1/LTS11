// src/pages/AdminPage.tsx
import React from 'react';
import DashboardLayout from './DashboardLayout';

const AdminPage: React.FC = () => {
    // Tidak perlu lagi memeriksa `loading` atau `user` di sini.
    // Jika komponen ini dirender, berarti `AdminRoute` sudah memvalidasi pengguna.
    // Cukup render layout dashboard.
    console.log("ADMIN_PAGE: Rendering DashboardLayout as access was granted by AdminRoute.");
    return <DashboardLayout />;
};

export default AdminPage;