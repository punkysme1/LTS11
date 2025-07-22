// src/services/userService.ts
import { supabase } from '../supabaseClient';
import { SignUpFormData, UserProfileData } from '../../types';

export const registerUserAndProfile = async (formData: SignUpFormData) => {
    const { email, password, ...profileData } = formData;

    // 1. Daftar pengguna dengan email dan password menggunakan Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        console.error('Error saat pendaftaran pengguna:', authError.message);
        return { user: null, profile: null, error: authError.message };
    }

    if (!authData.user) {
        return { user: null, profile: null, error: 'Pendaftaran berhasil, tetapi data pengguna kosong.' };
    }

    // 2. Masukkan data profil tambahan ke tabel user_profiles
    const { data: profileResult, error: profileError } = await supabase
        .from('user_profiles')
        .insert({
            id: authData.user.id, // Tautkan ke ID pengguna di auth.users
            full_name: profileData.full_name,
            domicile_address: profileData.domicile_address,
            institution_affiliation: profileData.institution_affiliation,
            is_alumni: profileData.is_alumni,
            alumni_unit: profileData.is_alumni ? profileData.alumni_unit : null,
            alumni_grad_year: profileData.is_alumni ? profileData.alumni_grad_year : null,
            occupation: profileData.occupation,
            phone_number: profileData.phone_number,
        });

    if (profileError) {
        console.error('Error saat membuat profil pengguna:', profileError.message);
        // Penting: Jika pembuatan profil gagal, Anda mungkin ingin menghapus pengguna yang baru terdaftar di auth.users
        // Namun, fitur ini membutuhkan service_role key di sisi server untuk keamanan.
        // Untuk klien-side, Anda bisa menyarankan pengguna menghubungi admin atau mencoba lagi.
        // await supabase.auth.admin.deleteUser(authData.user.id); // Jangan pakai ini di frontend
        return { user: null, profile: null, error: profileError.message };
    }

    // Mengembalikan user dan profil yang berhasil dibuat
    return { user: authData.user, profile: profileResult ? profileResult[0] : null, error: null };
};

export const getUserProfile = async (userId: string): Promise<UserProfileData | null> => {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error.message);
        return null;
    }
    return data as UserProfileData;
};

// Anda bisa menambahkan fungsi updateProfile di sini jika diperlukan