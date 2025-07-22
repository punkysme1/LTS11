// pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUserAndProfile } from '../src/services/userService'; // Import service
import { SignUpFormData } from '../types'; // Import interface

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignUpFormData>({
        email: '',
        password: '',
        full_name: '',
        domicile_address: '',
        institution_affiliation: '',
        is_alumni: false,
        alumni_unit: '',
        alumni_grad_year: undefined,
        occupation: '',
        phone_number: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Validasi dasar (semua wajib diisi)
        for (const key in formData) {
            // Abaikan validasi alumni_unit dan alumni_grad_year jika is_alumni false
            if (!formData.is_alumni && (key === 'alumni_unit' || key === 'alumni_grad_year')) {
                continue;
            }
            if (formData[key as keyof SignUpFormData] === '' || formData[key as keyof SignUpFormData] === undefined) {
                setError(`Harap isi semua bidang wajib: ${key.replace(/_/g, ' ').toUpperCase()}`);
                setLoading(false);
                return;
            }
        }
        if (formData.password.length < 6) {
            setError('Password minimal 6 karakter.');
            setLoading(false);
            return;
        }

        const { user, profile, error: registerError } = await registerUserAndProfile(formData);

        if (registerError) {
            setError(registerError);
        } else if (user && profile) {
            setSuccessMessage('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi dan login.');
            // Opsional: Langsung arahkan ke halaman login
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
        setLoading(false);
    };

    const FormField: React.FC<{
        name: keyof SignUpFormData;
        label: string;
        type?: string;
        options?: { value: string; label: string }[];
        required?: boolean;
        placeholder?: string;
        min?: number;
    }> = ({ name, label, type = 'text', options, required = true, placeholder, min }) => {
        const value = formData[name];
        const isCheckbox = type === 'checkbox';

        return (
            <div>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                {type === 'select' && options ? (
                    <select
                        id={name}
                        name={name}
                        value={value as string}
                        onChange={handleInputChange}
                        required={required}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                        {options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                ) : isCheckbox ? (
                    <input
                        type="checkbox"
                        id={name}
                        name={name}
                        checked={value as boolean}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                ) : (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        value={value as string | number}
                        onChange={handleInputChange}
                        required={required}
                        placeholder={placeholder || `Masukkan ${label.toLowerCase()}`}
                        min={min}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold font-serif text-center text-gray-900 dark:text-white mb-6">Daftar Akun Pengguna</h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Silakan isi formulir di bawah untuk membuat akun baru.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField name="full_name" label="Nama Lengkap" placeholder="Nama Lengkap Anda" />
                <FormField name="domicile_address" label="Alamat Domisili" placeholder="Contoh: Jakarta" />
                <FormField name="institution_affiliation" label="Lembaga/Afiliasi" placeholder="Nama Lembaga atau Afiliasi Anda" />

                <FormField name="is_alumni" label="Alumni Qomaruddin" type="checkbox" required={false} />
                {formData.is_alumni && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name="alumni_unit" label="Unit Alumni" placeholder="Contoh: Madrasah Aliyah" />
                        <FormField name="alumni_grad_year" label="Tahun Lulus" type="number" placeholder="Contoh: 2010" min={1900} />
                    </div>
                )}

                <FormField name="occupation" label="Pekerjaan" placeholder="Pekerjaan Anda" />
                <FormField name="phone_number" label="No. HP" type="tel" placeholder="Contoh: +6281234567890" />
                <FormField name="email" label="Email" type="email" placeholder="email@example.com" />
                <FormField name="password" label="Password" type="password" placeholder="Minimal 6 karakter" />

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