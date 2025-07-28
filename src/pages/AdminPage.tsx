// AdminPage.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from './LoginPage';
import DashboardLayout from './DashboardLayout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminPage: React.FC = () => {
    const { user, loading, role } = useAuth(); // Ambil role juga
    const navigate = useNavigate();

    // Logika untuk mengarahkan pengguna jika tidak memenuhi syarat
    useEffect(() => {
        if (!loading) { // Pastikan AuthContext sudah selesai loading
            if (!user || role !== 'admin') {
                console.log("ADMIN_PAGE_LOG: User not admin or not logged in. Redirecting to /login.");
                navigate('/login', { replace: true });
            }
        }
    }, [user, loading, role, navigate]); // Tambahkan semua dependensi

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl">Memuat sesi admin...</div> {/* Pesan lebih spesifik */}
            </div>
        );
    }

    // Hanya tampilkan DashboardLayout jika user ada DAN role adalah admin
    // Jika tidak, biarkan useEffect di atas yang mengarahkan
    return user && role === 'admin' ? <DashboardLayout /> : null;
};

export default AdminPage;