// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon, SearchIcon } from './icons';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { saveSearchHistory } from '../services/searchHistoryService';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, role, signOut, loading: authLoading } = useAuth();
    
    const [searchParams] = useSearchParams();
    const [localSearchTerm, setLocalSearchTerm] = useState(searchParams.get('q') || '');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Menutup menu mobile secara otomatis saat berpindah halaman
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname, searchParams]);

    // Menyimpan riwayat pencarian
    useEffect(() => {
        const query = searchParams.get('q');
        const handler = setTimeout(() => {
            if (user && role === 'verified_user' && query) {
                saveSearchHistory(user.id, query);
            }
        }, 1000);
        return () => clearTimeout(handler);
    }, [searchParams, user, role]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/katalog?q=${encodeURIComponent(localSearchTerm)}`);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    
    const primaryNavLinks = [
        { name: 'Beranda', path: '/' },
        { name: 'Katalog', path: '/katalog' },
        { name: 'Blog', path: '/blog' },
        { name: 'Buku Tamu', path: '/buku-tamu' },
        { name: 'Profil Lembaga', path: '/profil' },
    ];
    
    const activeLinkClass = "text-primary-600 dark:text-accent-400 font-semibold";
    const inactiveLinkClass = "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-accent-400";

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2 font-bold font-serif text-primary-800 dark:text-white">
                        <BookOpenIcon className="h-8 w-8 text-primary-600 dark:text-accent-400" />
                        <div><span className="text-sm">Galeri Manuskrip</span></div>
                    </Link>
                    
                    {/* NAVIGASI DESKTOP */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {primaryNavLinks.map(link => (
                            <NavLink key={link.path} to={link.path} className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors text-sm`}>
                                {link.name}
                            </NavLink>
                        ))}
                        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
                        {authLoading ? <div className="text-sm">Memuat...</div> : user ? (
                            <>
                                <NavLink to={role === 'admin' ? "/admin" : "/user"} className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} text-sm`}>
                                    {role === 'admin' ? "Dashboard" : "Profil Saya"}
                                </NavLink>
                                <button onClick={signOut} className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} text-sm`}>Login</NavLink>
                                <NavLink to="/daftar" className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-sm hover:bg-primary-700">Daftar</NavLink>
                            </>
                        )}
                    </nav>

                    <div className="flex items-center space-x-2">
                        <ThemeToggle />
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 md:hidden">
                            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* NAVIGASI MOBILE */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <form onSubmit={handleSearchSubmit} className="relative mb-4">
                           <input type="search" placeholder="Cari manuskrip..." value={localSearchTerm} onChange={e => setLocalSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-full text-sm dark:bg-gray-800 dark:border-gray-600" />
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon className="h-5 w-5 text-gray-400" /></div>
                        </form>
                        <nav className="flex flex-col items-start space-y-1">
                            {primaryNavLinks.map(link => (
                                <NavLink key={link.path} to={link.path} className={({ isActive }) => `w-full py-2 px-3 rounded-md ${isActive ? "bg-gray-100 dark:bg-gray-700 " + activeLinkClass : inactiveLinkClass}`}>
                                    {link.name}
                                </NavLink>
                            ))}
                             <div className="w-full border-t border-gray-200 dark:border-gray-700 my-2"></div>
                            {authLoading ? <div className="px-3 py-2">Memuat...</div> : user ? (
                                <>
                                    <NavLink to={role === 'admin' ? "/admin" : "/user"} className={({ isActive }) => `w-full py-2 px-3 rounded-md ${isActive ? "bg-gray-100 dark:bg-gray-700 " + activeLinkClass : inactiveLinkClass}`}>
                                        {role === 'admin' ? "Dashboard" : "Profil Saya"}
                                    </NavLink>
                                    <button onClick={signOut} className="w-full text-left py-2 px-3 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink to="/login" className={({ isActive }) => `w-full py-2 px-3 rounded-md ${isActive ? "bg-gray-100 dark:bg-gray-700 " + activeLinkClass : inactiveClass}`}>Login</NavLink>
                                    <NavLink to="/daftar" className="w-full text-center py-2 px-3 rounded-md bg-primary-600 text-white mt-2 hover:bg-primary-700">Daftar Akun Baru</NavLink>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
export default Header;