// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-8 px-4 mt-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Info */}
                <div className="text-center md:text-left">
                    <Link to="/" className="flex items-center justify-center md:justify-start space-x-2 text-2xl font-bold font-serif text-white mb-4">
                        <BookOpenIcon className="h-8 w-8 text-accent-400" />
                        <span>Manuskrip</span>
                    </Link>
                    <p className="text-sm">
                        Menjelajahi khazanah intelektual dan warisan budaya melalui koleksi naskah kuno Pondok Pesantren Qomaruddin.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-4">Tautan Cepat</h3>
                    <ul className="space-y-2">
                        <li><Link to="/katalog" className="hover:text-white transition-colors duration-200">Katalog</Link></li>
                        <li><Link to="/blog" className="hover:text-white transition-colors duration-200">Blog</Link></li>
                        <li><Link to="/buku-tamu" className="hover:text-white transition-colors duration-200">Buku Tamu</Link></li>
                        <li><Link to="/profil" className="hover:text-white transition-colors duration-200">Profil Lembaga</Link></li>
                        {/* Tautan Login Admin dan Login Pengguna yang jelas */}
                        <li><Link to="/login" className="hover:text-white transition-colors duration-200">Login</Link></li> {/* Link universal ke halaman Login */}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="text-center md:text-right">
                    <h3 className="text-xl font-semibold text-white mb-4">Hubungi Kami</h3>
                    <p className="text-sm">
                        Jl. Raya Qomaruddin No. 1, Sampurnan <br/>
                        Kec. Bungah, Kab. Gresik <br/>
                        Jawa Timur 61152 <br/>
                        Email: info@manuskripsampurnan.com
                    </p>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                &copy; {new Date().getFullYear()} Manuskrip Sampurnan. Hak Cipta Dilindungi.
            </div>
        </footer>
    );
};

export default Footer;