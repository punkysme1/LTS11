// src/pages/RegisterPage.tsx
import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../services/userService';
import { SignUpFormData } from '../../types';

// MemoizedFormField tetap sama
const MemoizedFormField: React.FC<{
    name: keyof SignUpFormData | 'full_name';
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    min?: number;
    value: string | number | boolean | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}> = React.memo(({ name, label, type = 'text', required = true, placeholder, min, value, onChange }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value as string}
                onChange={onChange}
                required={required}
                placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
                min={min}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
        </div>
    );
});


const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignUpFormData & { full_name: string }>({
        email: '',
        password: '',
        full_name: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (!formData.email || !formData.password || !formData.full_name.trim()) {
            setError('Email, Password, dan Nama Lengkap wajib diisi.');
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError('Password minimal 6 karakter.');
            setLoading(false);
            return;
        }

        const { user, error: signUpError } = await signUpUser({
            email: formData.email,
            password: formData.password
        });

        if (signUpError) {
            setError(signUpError);
        } else if (user) {
            setSuccessMessage(`Pendaftaran akun berhasil! Silakan login. Admin akan membuatkan profil Anda dan mengaktifkannya.`);
            setFormData({ email: '', password: '', full_name: '' }); // Reset form
            navigate('/login'); // Arahkan ke halaman login
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold font-serif text-center text-gray-900 dark:text-white mb-6">Daftar Akun Pengguna</h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                Daftar akun Anda. Profil Anda akan dibuat dan diverifikasi oleh admin setelah pendaftaran berhasil.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <MemoizedFormField name="full_name" label="Nama Lengkap" placeholder="Nama Lengkap Anda" value={formData.full_name} onChange={handleInputChange} />
                <MemoizedFormField name="email" label="Email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} />
                <MemoizedFormField name="password" label="Password" type="password" placeholder="Minimal 6 karakter" value={formData.password} onChange={handleInputChange} />

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
                </button>
            </form>

            <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
                Sudah punya akun? <Link to="/login" className="text-primary-600 hover:underline">Login di sini</Link>
            </p>
        </div>
    );
};

export default RegisterPage;