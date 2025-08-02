// src/services/userService.ts
import { supabase } from '../supabaseClient';
import { CompleteProfileFormData, UserProfileData, UserProfileStatus } from '../../types';

// Fungsi ini dipanggil PENGGUNA setelah konfirmasi email
export const createUserProfile = async (userId: string, profileData: CompleteProfileFormData) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .insert({
            id: userId,
            full_name: profileData.full_name,
            domicile_address: profileData.domicile_address || '',
            institution_affiliation: profileData.institution_affiliation || '',
            status: UserProfileStatus.PENDING, // Status awal selalu PENDING
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating user profile:', error.message);
        return { profile: null, error: error.message };
    }
    return { profile: data, error: null };
};

// Fungsi ini dipanggil ADMIN dari dashboard
export const updateUserProfileStatus = async (userId: string, status: UserProfileStatus) => {
    // FIX: 'data' tidak lagi dideklarasikan karena tidak digunakan.
    const { error } = await supabase
        .from('user_profiles')
        .update({ status: status })
        .eq('id', userId);

    if (error) {
        return { success: false, error: error.message };
    }
    return { success: true, error: null };
};

export const getUserProfile = async (userId: string): Promise<UserProfileData | null> => {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error && error.code !== 'PGRST116') { // Abaikan error jika baris tidak ditemukan
        console.error('Error fetching user profile:', error.message);
        return null;
    }
    return data as UserProfileData | null;
};