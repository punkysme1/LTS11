// src/App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import { UserProfileStatus } from '../types'; 

// Import AdminRoute yang baru
import AdminRoute from './pages/AdminRoute'; 

// --- Lazy Loading Components ---
const Home = lazy(() => import('./pages/HomePage'));
const Catalog = lazy(() => import('./pages/CatalogPage'));
const ManuscriptDetail = lazy(() => import('./pages/ManuscriptDetailPage'));
const Blog = lazy(() => import('./pages/BlogListPage'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetailPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage')); // Profil Lembaga
const UserPage = lazy(() => import('./pages/ProfileUserPage')); // Profil Pengguna
const Register = lazy(() => import('./pages/RegisterPage'));
const Guestbook = lazy(() => import('./pages/GuestBookPage'));
const Contact = lazy(() => import('./pages/ContactPage'));
const Donation = lazy(() => import('./pages/DonationPage'));
const AdminPage = lazy(() => import('../src/pages/AdminPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));

// Definisikan ThemeContext di sini
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const AppContent: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin-login';
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            {!isAdminRoute && <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat konten...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/katalog" element={<Catalog searchTerm={searchTerm} />} />
                        <Route path="/manuskrip/:id" element={<ManuscriptDetail />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPostDetail />} />
                        <Route path="/buku-tamu" element={<Guestbook />} />
                        <Route path="/profil" element={<ProfilePage />} />
                        <Route path="/kontak" element={<Contact />} />
                        <Route path="/donasi" element={<Donation />} />
                        
                        <Route path="/daftar" element={<Register />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin-login" element={<AdminLoginPage />} />
                        
                        {/* Rute yang dilindungi untuk Admin */}
                        <Route path="/admin" element={<AdminRoute allowedRoles={['admin']} />}>
                            <Route path="*" element={<AdminPage />} />
                        </Route>

                        {/* Rute yang dilindungi untuk Pengguna Terautentikasi (Verified/Pending) */}
                        {/* Contoh penggunaan AdminRoute untuk melindungi rute pengguna biasa */}
                        <Route path="/user" element={<AdminRoute allowedRoles={['verified_user', 'pending', 'admin']} />}>
                            <Route path="" element={<UserPage />} /> 
                        </Route>
                        
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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppContent />
    </ThemeContext.Provider>
  );
};

export default App;