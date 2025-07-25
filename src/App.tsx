// src/App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
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

    if (loading && showLoadingScreen) { // Hanya tampilkan loading screen jika loading dan sudah melewati penundaan
        return <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat otentikasi...</div>;
    }

    if (role === 'admin') {
        return <>{children}</>;
    } else {
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

    if (loading && showLoadingScreen) { // Hanya tampilkan loading screen jika loading dan sudah melewati penundaan
        return <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat pengguna...</div>;
    }

    if (user && (role === 'verified_user' || role === 'admin')) {
        return <>{children}</>;
    } else if (user && role === 'pending') {
        return <Navigate to="/user" replace />;
    } else {
        return <Navigate to="/login" replace />;
    }
};


const AppContent: React.FC = () => {
    const location = useLocation();
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
        return <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat aplikasi...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
            {!isAdminRoute && <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat...</div>}>
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
                        
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<LoginPage />} />
                        
                        <Route path="/user" element={<UserProtectedRoute><UserPage /></UserProtectedRoute>} />
                        
                        <Route path="/admin/*" element={<AdminProtectedRoute><AdminPage /></AdminProtectedRoute>} />
                        <Route path="/admin/users" element={<AdminProtectedRoute><ManageUsers /></AdminProtectedRoute>} />
                        
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
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;