// src/pages/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, CalendarIcon, NewspaperIcon, PencilIcon, HomeIcon, CheckCircleIcon, ChatAlt2Icon } from '../components/icons';

import ManageManuscripts from './admin/ManageManuscripts';
import ManageBlog from './admin/ManageBlog';
import ManageGuestbook from './admin/ManageGuestbook';
import ManageUsers from './admin/ManageUsers';
import ManageComments from './admin/ManageComments';

const DashboardHome = () => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Selamat Datang di Dashboard Admin</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Pilih menu di samping untuk mulai mengelola konten.</p>
    </div>
);

const DashboardLayout: React.FC = () => {
    const { user, signOut, loading, role, isInitialized } = useAuth(); // Ambil isInitialized
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('dashboard'); 
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

    // Logika pengalihan ini masih relevan di DashboardLayout
    // sebagai lapisan keamanan tambahan, terutama jika pengguna mencoba mengakses
    // DashboardLayout secara langsung atau ada perubahan state yang tidak terduga.
    useEffect(() => {
        // Hanya jalankan logika pengalihan setelah AuthContext selesai menginisialisasi dan tidak loading
        if (!isInitialized || loading) {
            console.log("DASHBOARD_LAYOUT: Waiting for auth to initialize or finish loading for redirect check.");
            return;
        }

        // Jika user tidak ada, atau role bukan admin, atau user ID tidak cocok dengan ADMIN_USER_ID,
        // maka redirect ke halaman login admin.
        if (!user || role !== 'admin' || user.id !== ADMIN_USER_ID) {
            console.log("DASHBOARD_LAYOUT: User is not authorized for dashboard. Redirecting to /admin-login.");
            navigate('/admin-login', { replace: true });
        }
    }, [user, role, loading, isInitialized, navigate, ADMIN_USER_ID]);

    // Tampilkan loading screen di sini jika `authStore` masih memuat atau belum diinisialisasi.
    // Ini penting agar tidak ada konten kosong atau redirect yang aneh.
    if (!isInitialized || loading) {
        console.log("DASHBOARD_LAYOUT: Rendering loading screen. isInitialized:", isInitialized, "loading:", loading);
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat dashboard...</div>
            </div>
        );
    }

    // Jika sampai di sini, berarti `authStore` sudah selesai loading/inisialisasi,
    // dan user sudah diperiksa oleh useEffect di atas.
    // Jika user tidak valid, useEffect sudah mengarahkan, jadi ini tidak akan terjangkau.
    // Maka, kita bisa langsung yakin user adalah admin yang valid di sini.
    console.log("DASHBOARD_LAYOUT: User is authorized. Rendering dashboard content.");
    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardHome />;
            case 'manuskrip':
                return <ManageManuscripts />;
            case 'blog':
                return <ManageBlog />;
            case 'bukutamu':
                return <ManageGuestbook />;
            case 'users':
                return <ManageUsers />;
            case 'comments':
                return <ManageComments />;
            default:
                return <DashboardHome />;
        }
    };

    const navItems = [
        { id: 'dashboard', name: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
        { id: 'manuskrip', name: 'Manuskrip', icon: <PencilIcon className="w-5 h-5" /> },
        { id: 'blog', name: 'Blog', icon: <NewspaperIcon className="w-5 h-5" /> },
        { id: 'bukutamu', name: 'Buku Tamu', icon: <CalendarIcon className="w-5 h-5" /> },
        { id: 'users', name: 'Manajemen Pengguna', icon: <CheckCircleIcon className="w-5 h-5" /> },
        { id: 'comments', name: 'Moderasi Komentar', icon: <ChatAlt2Icon className="w-5 h-5" /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className={`bg-gray-800 text-gray-100 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} relative`}>
                <div className="p-4 flex items-center justify-between">
                     <span className={`font-bold text-xl text-white ${!isSidebarOpen && 'hidden'}`}>Admin</span>
                     <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                     </button>
                </div>
                <nav className="mt-5">
                    <ul>
                        {navItems.map(item => (
                             <li key={item.id} className="mb-2">
                                <button onClick={() => setActivePage(item.id)} className={`group w-full flex items-center p-2 space-x-3 rounded-md transition-colors duration-200 ease-in-out 
                                    ${activePage === item.id ? 'bg-primary-600' : ''}`}>
                                    {React.cloneElement(item.icon, { className: `w-5 h-5 ${activePage === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}` })}
                                    <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 capitalize">{activePage.replace('-', ' ')}</h1>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-sm">
                            <HomeIcon className="w-5 h-5 mr-2"/>
                            <span className="hidden sm:inline">Kembali ke Situs</span>
                        </Link>
                        <span className="text-sm hidden md:block text-gray-700 dark:text-gray-300">{user?.email}</span>
                        <button onClick={signOut} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                            Logout
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;