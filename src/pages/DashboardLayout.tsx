import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Impor ikon yang mungkin Anda perlukan
import { BookOpenIcon, CalendarIcon, SearchIcon } from '../components/icons'; // Sesuaikan path jika perlu

// Komponen-komponen Dummy untuk Manajemen
const ManageManuscripts = () => <div className="p-4 bg-white rounded-lg shadow">Konten Manajemen Manuskrip di sini.</div>;
const ManageBlog = () => <div className="p-4 bg-white rounded-lg shadow">Konten Manajemen Blog di sini.</div>;
const ManageGuestbook = () => <div className="p-4 bg-white rounded-lg shadow">Konten Manajemen Buku Tamu di sini.</div>;

const DashboardHome = () => {
    // Di sini Anda bisa fetch data summary dari Supabase
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Manuskrip</h3>
                <p className="text-3xl font-bold mt-2">150</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Artikel</h3>
                <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Pesan Buku Tamu</h3>
                <p className="text-3xl font-bold mt-2">45</p>
            </div>
        </div>
    );
};


const DashboardLayout: React.FC = () => {
    const { user, signOut } = useAuth();
    const [activePage, setActivePage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const renderPage = () => {
        switch (activePage) {
            case 'manuskrip':
                return <ManageManuscripts />;
            case 'blog':
                return <ManageBlog />;
            case 'bukutamu':
                return <ManageGuestbook />;
            case 'dashboard':
            default:
                return <DashboardHome />;
        }
    };
    
    const navItems = [
        { id: 'dashboard', name: 'Dashboard', icon: <BookOpenIcon className="w-5 h-5" /> },
        { id: 'manuskrip', name: 'Manuskrip', icon: <CalendarIcon className="w-5 h-5" /> },
        { id: 'blog', name: 'Blog', icon: <SearchIcon className="w-5 h-5" /> },
        { id: 'bukutamu', name: 'Buku Tamu', icon: <BookOpenIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className={`bg-gray-800 text-gray-100 flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-4 flex items-center justify-between">
                     <span className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>Admin</span>
                     <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                     </button>
                </div>
                <nav>
                    <ul>
                        {navItems.map(item => (
                             <li key={item.id} className="px-4 py-2">
                                <button onClick={() => setActivePage(item.id)} className={`w-full flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 ${activePage === item.id ? 'bg-primary-600' : ''}`}>
                                    {item.icon}
                                    <span className={`${!isSidebarOpen && 'hidden'}`}>{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 capitalize">{activePage}</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm hidden md:block">{user?.email}</span>
                        <button onClick={signOut} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
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
