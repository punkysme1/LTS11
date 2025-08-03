// src/App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import AdminRoute from './pages/AdminRoute'; 
import { dataStore } from './dataStore'; // Import dataStore

const Home = lazy(() => import('./pages/HomePage'));
const Catalog = lazy(() => import('./pages/CatalogPage'));
const ManuscriptDetail = lazy(() => import('./pages/ManuscriptDetailPage'));
const Blog = lazy(() => import('./pages/BlogListPage'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetailPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const UserPage = lazy(() => import('./pages/ProfileUserPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const Guestbook = lazy(() => import('./pages/GuestBookPage'));
const Contact = lazy(() => import('./pages/ContactPage'));
const Donation = lazy(() => import('./pages/DonationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const DashboardLayout = lazy(() => import('./pages/DashboardLayout'));

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const AppContent: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    // --- PERBAIKAN KRUSIAL DI SINI ---
    // Memanggil dataStore.initialize() sekali saat aplikasi dimuat.
    // Ini akan memicu pengambilan data blog, manuskrip, dll.
    useEffect(() => {
        dataStore.initialize();
    }, []);
    // --- AKHIR PERBAIKAN ---

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            {!isAdminRoute && <Header />}
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <Suspense fallback={<div className="flex justify-center items-center h-screen">Memuat halaman...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/katalog" element={<Catalog />} />
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
                        
                        <Route path="/admin/*" element={
                            <AdminRoute allowedRoles={['admin']}>
                                <DashboardLayout />
                            </AdminRoute>
                        } />

                        <Route path="/user" element={
                            <AdminRoute allowedRoles={['verified_user', 'pending', 'admin', 'authenticated']}>
                                <UserPage />
                            </AdminRoute>
                        } />
                        
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