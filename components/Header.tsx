
import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { SearchIcon } from './icons';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (location.pathname !== '/katalog') {
            navigate('/katalog');
        }
    };
    
    const navLinks = [
        { name: 'Beranda', path: '/' },
        { name: 'Katalog', path: '/katalog' },
        { name: 'Blog', path: '/blog' },
        { name: 'Buku Tamu', path: '/buku-tamu' },
        { name: 'Profil', path: '/profil' },
        { name: 'Kontak', path: '/kontak' },
        { name: 'Donasi', path: '/donasi' }
    ];

    const activeLinkClass = "text-primary-500 dark:text-accent-400 font-semibold";
    const inactiveLinkClass = "text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-accent-400";

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-xl font-bold font-serif text-primary-800 dark:text-primary-200">
                            Galeri Manuskrip
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari manuskrip..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-32 sm:w-48 pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-accent-400"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
                {/* Mobile nav could be added here if needed */}
            </div>
        </header>
    );
};

export default Header;
