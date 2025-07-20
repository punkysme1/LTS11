// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon, SearchIcon } from './icons';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [location.pathname]);

    const navItems = [
        { name: 'Beranda', path: '/' },
        { name: 'Katalog', path: '/katalog' },
        { name: 'Blog', path: '/blog' },
        { name: 'Buku Tamu', path: '/buku-tamu' },
        { name: 'Profil', path: '/profil' },
        { name: 'Kontak', path: '/kontak' },
        { name: 'Donasi', path: '/donasi' },
    ];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const toggleMobileSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo Web (ukuran font ini tidak berubah) */}
                <Link to="/" className="flex items-center space-x-2 font-bold font-serif text-primary-800 dark:text-white">
                    <BookOpenIcon className="h-8 w-8 text-primary-600 dark:text-accent-400 flex-shrink-0" />
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-sm md:text-sm">Galeri Manuskrip</span>
                        <span className="text-xs md:text-xs text-gray-500 dark:text-gray-400">Sampurnan</span>
                    </div>
                </Link>

                {/* Navigasi Desktop - PERUBAHAN UKURAN FONT DI SINI */}
                <nav className="hidden lg:flex flex-grow justify-center space-x-8">
                    {navItems.map(item => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`relative text-sm font-medium py-2 px-3 transition-colors duration-300 ease-in-out {/* text-lg diubah ke text-sm */}
                                ${location.pathname === item.path
                                    ? 'text-primary-600 dark:text-accent-400 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-primary-600 after:dark:bg-accent-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-accent-400'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Search & Dark Mode Toggle */}
                <div className="hidden lg:flex items-center space-x-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari manuskrip..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 w-56"
                        />
                    </div>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu & Search Toggle */}
                <div className="lg:hidden flex items-center space-x-2">
                    <button
                        onClick={toggleMobileSearch}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                        aria-label="Toggle search"
                    >
                        <SearchIcon className="h-6 w-6" />
                    </button>
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Search Input */}
            {isSearchOpen && (
                <div className="lg:hidden px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari manuskrip..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>
                </div>
            )}

            {/* Navigasi Mobile - PERUBAHAN UKURAN FONT DI SINI */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <nav className="flex flex-col items-start px-4 py-4 space-y-2">
                        {navItems.map(item => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`w-full text-sm font-medium py-2 px-3 rounded-md transition-colors duration-300 ease-in-out {/* text-lg diubah ke text-sm */}
                                    ${location.pathname === item.path
                                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-accent-400'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;