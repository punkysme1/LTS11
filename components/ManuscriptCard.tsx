
import React from 'react';
import { Link } from 'react-router-dom';
import { Manuskrip } from '../types';

interface ManuscriptCardProps {
  manuscript: Manuskrip;
}

const ManuscriptCard: React.FC<ManuscriptCardProps> = ({ manuscript }) => {
  return (
    <Link 
      to={`/katalog/${manuscript.kode_inventarisasi}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={manuscript.url_kover}
          alt={`Kover ${manuscript.judul_dari_tim}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
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
