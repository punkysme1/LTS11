// App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './src/contexts/AuthContext'; // Import AuthProvider dan useAuth
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import { UserRole } from './types'; // Import UserRole

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
const AdminPage = lazy(() => import('./pages/AdminPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers')); 

// Definisikan ThemeContext di sini
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Komponen untuk melindungi rute Admin
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { role, loading } = useAuth(); // Dapatkan role dari AuthContext

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300">Memuat otentikasi...</div>;
    }

    if (role === 'admin') {
        return <>{children}</>;
    } else {
        // Redirect ke halaman login atau tampilkan pesan akses ditolak
        return <div className="text-center py-20 text-red-600 dark:text-red-400">Akses Ditolak. Anda tidak memiliki izin Admin.</div>;
        // Atau: <Navigate to="/login" replace />; // Jika ingin redirect ke login
    }
};

const AppContent: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const [searchTerm, setSearchTerm] = useState('');
    const { loading: authLoading } = useAuth(); // Dapatkan loading dari AuthContext

    if (authLoading) {
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
                        <Route path="/user" element={<UserPage />} /> 
                        <Route path="/kontak" element={<Contact />} />
                        <Route path="/donasi" element={<Donation />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        
                        {/* Rute Admin yang dilindungi */}
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
    <AuthProvider> {/* Pembungkus AuthProvider di sini */}
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeContext.Provider>
    </AuthProvider>
  );
};

export default App;