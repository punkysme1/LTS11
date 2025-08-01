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
    const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

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
    };
    
    const primaryNavLinks = [
        { name: 'Beranda', path: '/' },
        { name: 'Katalog', path: '/katalog' },
        { name: 'Blog', path: '/blog' },
        { name: 'Buku Tamu', path: '/buku-tamu' },
        { name: 'Donasi', path: '/donasi' },
        { name: 'Kontak', path: '/kontak' },
        { name: 'Profil Lembaga', path: '/profil' },
    ];

    const activeLinkClass = "text-primary-500 dark:text-accent-400 font-semibold";
    const inactiveLinkClass = "text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-accent-400";

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2 font-bold font-serif text-primary-800 dark:text-white">
                        <BookOpenIcon className="h-8 w-8 text-primary-600 dark:text-accent-400" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-sm">Galeri Manuskrip</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Sampurnan</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        {primaryNavLinks.map(link => (
                            <NavLink key={link.name} to={link.path} className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors text-sm`}>
                                {link.name}
                            </NavLink>
                        ))}
                        {authLoading ? ( 
                            <div className="text-sm">Memuat...</div>
                        ) : user ? (
                            <>
                                {user.id !== ADMIN_USER_ID && (
                                    <NavLink to="/user" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} text-sm`}>Profil Saya</NavLink>
                                )}
                                {user.id === ADMIN_USER_ID && (
                                    <NavLink to="/admin" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} text-sm`}>Admin Dashboard</NavLink>
                                )}
                                <button onClick={signOut} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm">Logout</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} text-sm`}>Login Pengguna</NavLink>
                                <NavLink to="/admin-login" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} text-sm`}>Login Admin</NavLink>
                            </>
                        )}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
                            <input
                                type="search"
                                placeholder="Cari..."
                                value={localSearchTerm}
                                onChange={(e) => setLocalSearchTerm(e.target.value)}
                                className="w-48 pl-10 pr-4 py-2 rounded-full border dark:bg-gray-800 text-sm"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </form>
                        <ThemeToggle />
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 md:hidden">
                            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        {/* Mobile Nav Links Here */}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;