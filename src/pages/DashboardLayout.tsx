// DashboardLayout.tsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { BookOpenIcon, CalendarIcon, NewspaperIcon, PencilIcon, HomeIcon, CheckCircleIcon } from '../components/icons'; 

import ManageManuscripts from './admin/ManageManuscripts';
import ManageBlog from './admin/ManageBlog';
import ManageGuestbook from './admin/ManageGuestbook';
import ManageUsers from './admin/ManageUsers'; 

// Komponen DashboardHome
const DashboardHome = () => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Selamat Datang di Dashboard Admin</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Pilih menu di samping untuk mulai mengelola konten.</p>
    </div>
);

const DashboardLayout: React.FC = () => {
    const { user, signOut, loading, role } = useAuth(); // Ambil loading dan role
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('dashboard'); 
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    // Efek untuk mengarahkan jika pengguna tidak valid untuk dashboard ini
    useEffect(() => {
        if (!loading && (!user || role !== 'admin')) {
            console.log("DASHBOARD_LAYOUT_LOG: User not authorized for admin dashboard. Redirecting.");
            navigate('/login', { replace: true }); // Arahkan kembali ke login jika tidak ada user atau bukan admin
        }
    }, [user, loading, role, navigate]);

    // Tampilkan loading screen jika AuthContext masih memuat
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat dashboard...</div>
            </div>
        );
    }

    // Jika user tidak ada atau role bukan admin, komponen akan mengarahkan via useEffect, jadi render null sementara
    if (!user || role !== 'admin') {
        return null;
    }

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