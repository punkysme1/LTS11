import React, { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // <-- 1. Impor AuthProvider
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

// --- Lazy Loading Components ---
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ManuscriptDetail = lazy(() => import('./pages/ManuscriptDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const Guestbook = lazy(() => import('./pages/Guestbook'));
const Profile = lazy(() => import('./pages/Profile'));
const Contact = lazy(() => import('./pages/Contact'));
const Donation = lazy(() => import('./pages/Donation'));
const AdminPage = lazy(() => import('./pages/AdminPage')); // <-- Rute admin utama

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Komponen ini tetap sama, tapi rute admin disederhanakan
const AppContent: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            {!isAdminRoute && <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
            <main className="flex-grow">
                <Suspense fallback={<div className="flex justify-center items-center h-screen">Memuat...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/katalog" element={<Catalog searchTerm={searchTerm} />} />
                        <Route path="/manuskrip/:id" element={<ManuscriptDetail />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPostDetail />} />
                        <Route path="/buku-tamu" element={<Guestbook />} />
                        <Route path="/profil" element={<Profile />} />
                        <Route path="/kontak" element={<Contact />} />
                        <Route path="/donasi" element={<Donation />} />
                        {/* 3. Rute admin disederhanakan */}
                        <Route path="/admin/*" element={<AdminPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    // 2. Bungkus semua komponen dengan AuthProvider
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </ThemeContext.Provider>
    </AuthProvider>
  );
};

export default App;
