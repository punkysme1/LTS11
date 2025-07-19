
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Galeri Manuskrip Sampurnan. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="#/admin" className="text-sm hover:text-primary-600 dark:hover:text-accent-400 transition-colors">
            Halaman Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
