// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth'; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading untuk form login ini
  const [error, setError] = useState<string | null>(null);

  const { user: authUser, role, loading: authGlobalLoading } = useAuth();
  const navigate = useNavigate();

  const ADMIN_USER_ID = import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim();

  // Efek untuk mengarahkan pengguna yang sudah login dengan benar
  useEffect(() => {
    // Pengalihan hanya dilakukan jika AuthContext sudah selesai memuat (loading: false)
    // DAN ada user yang diautentikasi (authUser tidak null)
    // Serta role sudah ditentukan.
    if (!authGlobalLoading && authUser && role) {
      if (authUser.id === ADMIN_USER_ID && role === 'admin') {
        console.log('USER_LOGIN_PAGE_LOG: Admin user and role confirmed, redirecting to /admin');
        navigate('/admin', { replace: true });
      } else {
        console.log('USER_LOGIN_PAGE_LOG: Regular user detected or role not admin, redirecting to /user');
        navigate('/user', { replace: true });
      }
    }
  }, [authUser, role, authGlobalLoading, navigate, ADMIN_USER_ID]); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Mulai loading untuk form login
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        console.error('USER_LOGIN_ERROR:', authError.message);
      } else if (data.user) {
        console.log('USER_LOGIN_SUCCESS:', data.user.id);
        // Setelah Supabase.auth.signInWithPassword berhasil, AuthContext akan menerima event
        // dan memperbarui state-nya. useEffect di atas akan menangani pengalihan.
      } else {
        setError('Login berhasil, tetapi data pengguna kosong.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan tidak dikenal saat login.');
      console.error('USER_LOGIN_EXCEPTION:', err);
    } finally {
      setLoading(false); // Selesaikan loading form setelah percobaan login
    }
  };

  // Tampilkan layar "Memuat sesi pengguna..." jika AuthContext sedang memuat
  if (authGlobalLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-700 dark:text-gray-300">Memuat sesi pengguna...</div>
      </div>
    );
  }

  // Jika sudah ada user DAN role sudah terdefinisi, komponen ini tidak perlu dirender,
  // karena useEffect akan mengarahkan.
  if (authUser && role) {
    return null; 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Masuk ke Akun Anda
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Atau <Link to="/daftar" className="font-medium text-primary-600 hover:text-primary-500 dark:text-accent-400 dark:hover:text-accent-300">daftar akun baru</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email-address" className="sr-only">Alamat Email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Kata Sandi</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-accent-500 dark:hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-accent-400"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;