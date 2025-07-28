// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon, SearchIcon } from './icons';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { saveSearchHistory } from '../services/searchHistoryService';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, userProfile, role, signOut, loading: authLoading } = useAuth(); // Ambil juga authLoading

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (user && role === 'verified_user' && searchTerm.trim() !== '' && location.pathname === '/katalog') {
                saveSearchHistory(user.id, searchTerm);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, user, role, location.pathname]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (location.pathname !== '/katalog') {
            navigate('/katalog');
        }
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
                    {/* Logo Web */}
                    <Link to="/" className="flex items-center space-x-2 font-bold font-serif text-primary-800 dark:text-white">
                        <BookOpenIcon className="h-8 w-8 text-primary-600 dark:text-accent-400 flex-shrink-0" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-sm md:text-sm">Galeri Manuskrip</span>
                            <span className="text-xs md:text-xs text-gray-500 dark:text-gray-400">Sampurnan</span>
                        </div>
                    </Link>

                    {/* Navigasi Desktop */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {primaryNavLinks.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200 text-sm`}
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* Tampilkan link/tombol berdasarkan role */}
                        {authLoading ? ( // Tampilkan loading state jika AuthContext sedang memuat
                            <div className="text-gray-500 dark:text-gray-400 text-sm">Memuat...</div>
                        ) : (
                            user ? (
                                <>
                                    {role === 'pending' && (
                                        <NavLink to="/user" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200 text-sm`}>Profil Saya (Menunggu Verifikasi)</NavLink>
                                    )}
                                    {(role === 'verified_user' || role === 'admin') && (
                                        <NavLink to="/user" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200 text-sm`}>Profil Saya</NavLink>
                                    )}
                                    {role === 'admin' && (
                                        <NavLink to="/admin" className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200 text-sm`}>Admin Dashboard</NavLink>
                                    )}
                                    <button
                                        onClick={signOut}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Link ke halaman login universal */}
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200 text-sm`}
                                    >
                                        Login
                                    </NavLink>
                                </>
                            )
                        )}
                    </nav>

                    {/* Desktop Search & Dark Mode Toggle */}
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Cari manuskrip..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-32 sm:w-48 pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-400 text-sm"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <ThemeToggle />
                        {/* Tombol menu mobile/hamburger hanya terlihat di mobile */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 md:hidden"
                            aria-label="Toggle navigation menu"
                        >
                            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Input */}
                <div className="md:hidden px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari manuskrip..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-sm"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Navigasi Mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <nav className="flex flex-col items-start px-4 py-4 space-y-2">
                            {primaryNavLinks.map(link => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => `w-full text-base font-medium py-2 px-3 rounded-md transition-colors duration-300 ease-in-out ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-accent-400'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            {authLoading ? (
                                <div className="text-gray-500 dark:text-gray-400 text-sm py-2 px-3">Memuat...</div>
                            ) : (
                                user ? (
                                    <>
                                        {role === 'pending' && (
                                            <NavLink to="/user" className={({ isActive }) => `w-full text-base font-medium py-2 px-3 rounded-md transition-colors duration-300 ease-in-out ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-accent-400'}`} onClick={() => setIsMobileMenuOpen(false)}>Profil Saya (Menunggu Verifikasi)</NavLink>
                                        )}
                                        {(role === 'verified_user' || role === 'admin') && (
                                            <NavLink to="/user" className={({ isActive }) => `w-full text-base font-medium py-2 px-3 rounded-md transition-colors duration-300 ease-in-out ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-accent-400'}`} onClick={() => setIsMobileMenuOpen(false)}>Profil Saya</NavLink>
                                        )}
                                        {role === 'admin' && (
                                            <NavLink to="/admin" className={({ isActive }) => `w-full text-base font-medium py-2 px-3 rounded-md transition-colors duration-300 ease-in-out ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-accent-400'}`} onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</NavLink>
                                        )}
                                        <button
                                            onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                                            className="w-full text-left text-base font-medium py-2 px-3 rounded-md transition-colors duration-300 ease-in-out text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* Daftar Pengguna dan Login Pengguna sebagai NavLink (Mobile) */}
                                        <NavLink
                                            to="/login"
                                            className={({ isActive }) => `w-full text-base font-medium py-2 px-3 rounded-md transition-colors duration-300 ease-in-out ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-accent-400'}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Login
                                        </NavLink>
                                    </>
                                )
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;