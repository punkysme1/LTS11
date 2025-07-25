// src/App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header'; // Header akan dimodifikasi
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import { UserRole } from '../types';

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

// Komponen admin khusus untuk manage users (jika tidak di dashboard admin)
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));

// Definisikan ThemeContext di sini
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Komponen untuk melindungi rute Admin
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { role, loading } = useAuth();

    // Tambahkan state untuk penundaan loading screen
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => setShowLoadingScreen(true), 300); // Tunda 300ms
            return () => clearTimeout(timer);
        } else {
            setShowLoadingScreen(false);
        }
    }, [loading]);

    if (loading && showLoadingScreen) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat otentikasi admin...</div>
            </div>
        );
    }

    if (role === 'admin') {
        return <>{children}</>;
    } else {
        // Redirect ke halaman login biasa (atau halaman khusus admin jika ada)
        return <Navigate to="/login" replace />;
    }
};

// Komponen untuk melindungi rute yang hanya bisa diakses Pengguna Terdaftar/Pustakawan
const UserProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading, role } = useAuth();

    // Tambahkan state untuk penundaan loading screen
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => setShowLoadingScreen(true), 300); // Tunda 300ms
            return () => clearTimeout(timer);
        } else {
            setShowLoadingScreen(false);
        }
    }, [loading]);

    if (loading && showLoadingScreen) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat pengguna...</div>
            </div>
        );
    }

    if (user && (role === 'verified_user' || role === 'admin')) {
        return <>{children}</>;
    } else if (user && role === 'pending') {
        // Jika user login tapi profilnya pending, arahkan ke halaman profil user untuk dilengkapi/ditunggu
        return <Navigate to="/user" replace />;
    } else {
        // Jika belum login, redirect ke halaman login
        return <Navigate to="/login" replace />;
    }
};


const AppContent: React.FC = () => {
    const location = useLocation();
    // Menentukan apakah rute saat ini adalah rute admin (dimulai dengan /admin)
    const isAdminRoute = location.pathname.startsWith('/admin');
    const [searchTerm, setSearchTerm] = useState('');
    const { loading: authLoading } = useAuth();

    // Tambahkan state untuk penundaan loading screen global
    const [showGlobalLoadingScreen, setShowGlobalLoadingScreen] = useState(false);
    useEffect(() => {
        if (authLoading) {
            const timer = setTimeout(() => setShowGlobalLoadingScreen(true), 300); // Tunda 300ms
            return () => clearTimeout(timer);
        } else {
            setShowGlobalLoadingScreen(false);
        }
    }, [authLoading]);

    // Hanya tampilkan layar loading jika authLoading dan sudah melewati penundaan
    if (authLoading && showGlobalLoadingScreen) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-700 dark:text-gray-300">Memuat aplikasi...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            {/* Header tidak ditampilkan di halaman admin */}
            {!isAdminRoute && <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
            
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Suspense untuk menangani lazy loading komponen */}
                <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat...</div>}>
                    <Routes>
                        {/* Rute Umum (akses oleh siapa saja) */}
                        <Route path="/" element={<Home />} />
                        <Route path="/katalog" element={<Catalog searchTerm={searchTerm} />} />
                        <Route path="/manuskrip/:id" element={<ManuscriptDetail />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPostDetail />} />
                        <Route path="/buku-tamu" element={<Guestbook />} />
                        <Route path="/profil" element={<ProfilePage />} />
                        <Route path="/kontak" element={<Contact />} />
                        <Route path="/donasi" element={<Donation />} />
                        
                        {/* Rute Autentikasi Pengguna */}
                        <Route path="/daftar" element={<Register />} /> {/* Ubah path ke /daftar */}
                        <Route path="/login" element={<LoginPage />} /> {/* Login Pengguna Biasa */}
                        
                        {/* Rute yang Dilindungi untuk Pengguna Terdaftar / Pustakawan (verified_user atau admin) */}
                        <Route path="/user" element={<UserProtectedRoute><UserPage /></UserProtectedRoute>} />
                        
                        {/* Rute Admin yang Dilindungi */}
                        {/* AdminPage akan menangani apakah user itu admin atau tidak. */}
                        {/* Jika tidak admin, akan dialihkan ke /login (login pengguna biasa) */}
                        <Route path="/admin/*" element={<AdminProtectedRoute><AdminPage /></AdminProtectedRoute>} />
                        
                        {/* Catch-all route untuk halaman tidak ditemukan */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>

            {/* Footer tidak ditampilkan di halaman admin */}
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
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;