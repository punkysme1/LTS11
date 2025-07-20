import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '../src/supabaseClient';
import { Manuskrip } from '../types';
import ManuscriptCard from '../components/ManuscriptCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/icons';

interface CatalogPageProps {
  searchTerm: string;
}

const ITEMS_PER_PAGE = 20;

const CatalogPage: React.FC<CatalogPageProps> = ({ searchTerm }) => {
  const [manuscripts, setManuscripts] = useState<Manuskrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    kategori: 'all',
    bahasa: 'all',
    aksara: 'all',
  });

  useEffect(() => {
    const fetchManuscripts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('manuskrip')
        .select('*'); // Mengambil semua kolom
      if (error) {
        console.error('Error fetching manuscripts:', error);
      } else {
        setManuscripts(data as Manuskrip[]);
      }
      setLoading(false);
    };
    fetchManuscripts();
  }, []);

  const categoryCounts = useMemo(() => {
    return manuscripts.reduce((acc, ms) => {
      const category = ms.kategori_ilmu_pesantren;
      if (category) { // Pastikan kategori tidak null/undefined
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [manuscripts]);

  const uniqueKategori = useMemo(() => [...new Set(manuscripts.map(m => m.kategori_ilmu_pesantren).filter(Boolean))], [manuscripts]); // Filter Boolean untuk menghapus null/undefined
  const uniqueBahasa = useMemo(() => [...new Set(manuscripts.flatMap(m => m.bahasa ? m.bahasa.split(',').map(b => b.trim()) : []).filter(Boolean))], [manuscripts]); // Handle null/undefined bahasa
  const uniqueAksara = useMemo(() => [...new Set(manuscripts.flatMap(m => m.aksara ? m.aksara.split(',').map(a => a.trim()) : []).filter(Boolean))], [manuscripts]); // Handle null/undefined aksara

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const filteredManuscripts = useMemo(() => {
    return manuscripts.filter(ms => {
      const searchTermLower = searchTerm.toLowerCase();
      const searchMatch = !searchTerm ||
        (ms.judul_dari_tim && ms.judul_dari_tim.toLowerCase().includes(searchTermLower)) ||
        (ms.pengarang && ms.pengarang.toLowerCase().includes(searchTermLower)) ||
        (ms.deskripsi_umum && ms.deskripsi_umum.toLowerCase().includes(searchTermLower));

      const kategoriMatch = filters.kategori === 'all' || ms.kategori_ilmu_pesantren === filters.kategori;
      const bahasaMatch = filters.bahasa === 'all' || (ms.bahasa && ms.bahasa.split(',').map(b => b.trim()).includes(filters.bahasa));
      const aksaraMatch = filters.aksara === 'all' || (ms.aksara && ms.aksara.split(',').map(a => a.trim()).includes(filters.aksara));

      return searchMatch && kategoriMatch && bahasaMatch && aksaraMatch;
    });
  }, [searchTerm, filters, manuscripts]);

  const totalPages = Math.ceil(filteredManuscripts.length / ITEMS_PER_PAGE);
  const paginatedManuscripts = filteredManuscripts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-gray-700 dark:text-gray-300">Memuat katalog...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold font-serif mb-8 text-center text-gray-900 dark:text-white">Katalog Manuskrip</h1>

      {/* Category Counts */}
      <div className="mb-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Jumlah per Kategori:</span>
        {Object.entries(categoryCounts).length > 0 ? (
            Object.entries(categoryCounts).map(([category, count]) => (
            <span key={category} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">
                {category} <strong className="ml-1.5 text-gray-900 dark:text-gray-100">{count}</strong>
            </span>
            ))
        ) : (
            <span className="text-gray-500 dark:text-gray-400">Tidak ada kategori.</span>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <span className="font-semibold text-gray-700 dark:text-gray-200">Filter:</span>
        <select name="kategori" onChange={handleFilterChange} value={filters.kategori} className="flex-1 w-full sm:w-auto p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100">
          <option value="all">Semua Kategori</option>
          {uniqueKategori.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
        <select name="bahasa" onChange={handleFilterChange} value={filters.bahasa} className="flex-1 w-full sm:w-auto p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100">
          <option value="all">Semua Bahasa</option>
          {uniqueBahasa.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select name="aksara" onChange={handleFilterChange} value={filters.aksara} className="flex-1 w-full sm:w-auto p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-100">
          <option value="all">Semua Aksara</option>
          {uniqueAksara.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* Grid */}
      {paginatedManuscripts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {paginatedManuscripts.map(ms => (
            <ManuscriptCard key={ms.kode_inventarisasi} manuscript={ms} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 dark:text-gray-400">Tidak ada manuskrip yang cocok dengan kriteria pencarian Anda.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-4">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="text-gray-700 dark:text-gray-300">Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong></span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;