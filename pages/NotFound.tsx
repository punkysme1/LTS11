import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center h-full py-20">
            <h1 className="text-6xl font-bold text-primary-600 font-serif">404</h1>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Halaman Tidak Ditemukan
            </h2>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                Maaf, kami tidak dapat menemukan halaman yang Anda cari.
            </p>
            <Link
                to="/"
                className="mt-8 inline-block rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};

// Pastikan baris ini ada di akhir file dan sudah tersimpan.
export default NotFound;
