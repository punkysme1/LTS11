// src/pages/RegisterPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../hooks/useAuth';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { user, isInitialized } = useAuth();
    const navigate = useNavigate();

    // Jika pengguna sudah login, arahkan pergi dari halaman ini
    useEffect(() => {
        if (isInitialized && user) {
            navigate('/user', { replace: true });
        }
    }, [user, isInitialized, navigate]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            setError(signUpError.message);
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="max-w-md mx-auto text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Pendaftaran Berhasil!</h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Kami telah mengirimkan tautan konfirmasi ke email Anda di <strong>{email}</strong>.
                    Silakan periksa kotak masuk (dan folder spam) Anda untuk melanjutkan.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Buat Akun Baru
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                        Sudah punya akun? <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">Masuk di sini</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500"
                            placeholder="Alamat Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={6}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500"
                            placeholder="Kata Sandi (minimal 6 karakter)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                            disabled={loading}
                        >
                            {loading ? 'Memproses...' : 'Daftar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;