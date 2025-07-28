import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from './LoginPage'; // Import LoginPage
import DashboardLayout from './DashboardLayout';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
    const { user, loading, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Logika pengalihan jika AuthContext sudah selesai loading
        if (!loading) {
            if (!user) {
                console.log("ADMIN_PAGE_LOG: No user logged in, redirecting to /login.");
                navigate('/login', { replace: true });
            } else if (role !== 'admin') {
                console.log(`ADMIN_PAGE_LOG: User (${user.id}) is logged in but role is ${role}, redirecting to /user.`);
                navigate('/user', { replace: true }); // Arahkan ke /user jika bukan admin
            }
        }
    }, [user, loading, role, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat sesi admin...</div>
            </div>
        );
    }

    // Tampilkan DashboardLayout hanya jika user ada DAN role adalah admin
    // Jika tidak, biarkan useEffect di atas yang akan mengarahkan.
    // Jika tidak ada user atau role bukan admin, komponen ini akan render null,
    // dan pengalihan akan terjadi.
    if (user && role === 'admin') {
        return <DashboardLayout />;
    }

    // Ini akan terjangkau jika user tidak ada atau role bukan admin, dan useEffect akan mengarahkan
    return null;
};

export default AdminPage;