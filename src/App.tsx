// src/App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'; // Import Navigate
import { AuthProvider } from './contexts/AuthContext'; // AuthProvider dari src/contexts
import { useAuth } from './hooks/useAuth'; // useAuth dari src/hooks
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import { UserRole } from '../types'; // Pastikan types.ts ada di src/

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
const AdminPage = lazy(() => import('../src/pages/AdminPage')); // Path ke AdminPage
const LoginPage = lazy(() => import('./pages/LoginPage')); // Path ke LoginPage
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers')); // Path ke ManageUsers

// Definisikan ThemeContext di sini
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Komponen untuk melindungi rute Admin
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { role, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat otentikasi...</div>;
    }

    if (role === 'admin') {
        return <>{children}</>;
    } else {
        // Jika bukan admin, redirect ke halaman login atau tampilkan pesan
        return <Navigate to="/login" replace />; // Redirect ke halaman login
        // Atau: return <div className="text-center py-20 text-red-600 dark:text-red-400">Akses Ditolak. Anda tidak memiliki izin Admin.</div>;
    }
};

// Komponen untuk melindungi rute yang hanya bisa diakses Pengguna Terdaftar/Pustakawan
const UserProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading, role } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat pengguna...</div>;
    }

    // Izinkan jika sudah login DAN perannya verified_user atau admin
    if (user && (role === 'verified_user' || role === 'admin')) {
        return <>{children}</>;
    } else if (user && role === 'pending') {
        // Jika user login tapi profilnya pending, arahkan ke halaman profil user
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

    // Konsol log status loading autentikasi
    console.log('APP_CONTENT_LOG: AuthLoading status:', authLoading);

    // Tampilkan layar loading jika autentikasi masih dalam proses
    if (authLoading) {
        return <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat aplikasi...</div>;
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
                        
                        {/* Rute Autentikasi (Daftar & Login) */}
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<LoginPage />} />
                        
                        {/* Rute yang Dilindungi untuk Pengguna Terdaftar / Pustakawan (verified_user atau admin) */}
                        <Route path="/user" element={<UserProtectedRoute><UserPage /></UserProtectedRoute>} />
                        
                        {/* Rute Admin yang Dilindungi */}
                        <Route path="/admin/*" element={<AdminProtectedRoute><AdminPage /></AdminProtectedRoute>} />
                        {/* Contoh rute spesifik di dalam admin dashboard */}
                        <Route path="/admin/users" element={<AdminProtectedRoute><ManageUsers /></AdminProtectedRoute>} />
                        
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
    // Menambahkan atau menghapus kelas 'dark' pada elemen html berdasarkan tema
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    // AuthProvider membungkus seluruh aplikasi untuk menyediakan konteks autentikasi
    <AuthProvider>
      {/* ThemeContext.Provider membungkus aplikasi untuk menyediakan konteks tema */}
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {/* BrowserRouter menyediakan fungsionalitas routing */}
        <BrowserRouter>
          {/* AppContent adalah komponen utama yang berisi routing dan UI aplikasi */}
          <AppContent />
        </BrowserRouter>
      </ThemeContext.Provider>
    </AuthProvider>
  );
};

export default App;