import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardLayout from './DashboardLayout';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
    const { user, loading } = useAuth(); // role tidak perlu karena kita cek user.id langsung
    const navigate = useNavigate();
    const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

    useEffect(() => {
        // Logika pengalihan hanya setelah AuthContext selesai loading
        if (!loading) {
            if (!user) {
                console.log("ADMIN_PAGE_LOG: No user logged in, redirecting to /admin-login.");
                navigate('/admin-login', { replace: true });
            } else if (user.id !== ADMIN_USER_ID) { // Cek ID pengguna langsung
                console.log(`ADMIN_PAGE_LOG: User (${user.id}) is logged in but not admin, redirecting to /user.`);
                navigate('/user', { replace: true }); // Arahkan ke /user jika bukan admin
            }
        }
    }, [user, loading, navigate, ADMIN_USER_ID]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat sesi admin...</div>
            </div>
        );
    }

    // Tampilkan DashboardLayout hanya jika user ada DAN ID-nya cocok dengan Admin ID
    if (user && user.id === ADMIN_USER_ID) {
        return <DashboardLayout />;
    }

    // Ini akan terjangkau jika user tidak ada atau ID bukan admin, dan useEffect akan mengarahkan
    return null;
};

export default AdminPage;