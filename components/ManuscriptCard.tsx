// src/components/ManuscriptCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Manuskrip } from '../types';

interface ManuscriptCardProps {
  manuscript: Manuskrip;
}

const ManuscriptCard: React.FC<ManuscriptCardProps> = ({ manuscript }) => {
  return (
    <Link
      to={`/manuskrip/${manuscript.kode_inventarisasi}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-[5/4] overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center"> {/* PERUBAHAN DI SINI: aspect-[5/4] */}
        {manuscript.url_kover ? (
          <img
            src={manuscript.url_kover}
            alt={`Kover ${manuscript.judul_dari_tim}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400 dark:text-gray-500 text-sm">Tidak ada gambar</span>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{manuscript.kode_inventarisasi}</p>
        <h3 className="font-semibold mt-1 text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-accent-400 truncate">
          {manuscript.judul_dari_tim}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{manuscript.pengarang}</p>
      </div>
    </Link>
  );
};

export default ManuscriptCard;