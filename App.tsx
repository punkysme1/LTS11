
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ManuscriptDetailPage from './pages/ManuscriptDetailPage';
import GuestBookPage from './pages/GuestBookPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import DonationPage from './pages/DonationPage';
import BlogListPage from './pages/BlogListPage';
import AdminPage from './pages/AdminPage';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/katalog" element={<CatalogPage searchTerm={searchTerm} />} />
              <Route path="/katalog/:id" element={<ManuscriptDetailPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/buku-tamu" element={<GuestBookPage />} />
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/kontak" element={<ContactPage />} />
              <Route path="/donasi" element={<DonationPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeContext.Provider>
  );
}

export default App;
