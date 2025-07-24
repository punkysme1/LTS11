// src/services/userService.ts
import { supabase } from '../supabaseClient';
import { SignUpFormData, CompleteProfileFormData, UserProfileData, UserProfileStatus } from '../../types';

export const signUpUser = async (formData: SignUpFormData) => {
    const { email, password } = formData;

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        console.error('Error saat pendaftaran pengguna (signUp):', authError.message);
        return { user: null, error: authError.message };
    }

    if (!authData.user) {
        return { user: null, error: 'Pendaftaran berhasil, tetapi data pengguna kosong.' };
    }

    return { user: authData.user, error: null };
};

export const createUserProfile = async (userId: string, profileData: CompleteProfileFormData) => {
    const { data: profileResult, error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
            id: userId,
            full_name: profileData.full_name,
            domicile_address: profileData.domicile_address,
            institution_affiliation: profileData.institution_affiliation,
            is_alumni: profileData.is_alumni,
            alumni_unit: profileData.is_alumni ? profileData.alumni_unit : null,
            alumni_grad_year: profileData.is_alumni ? profileData.alumni_grad_year : null,
            occupation: profileData.occupation,
            phone_number: profileData.phone_number,
            status: UserProfileStatus.PENDING,
        }, { onConflict: 'id' })
        .select()
        .single();

    if (profileError) {
        console.error('Error saat membuat/memperbarui profil pengguna:', profileError.message);
        return { profile: null, error: profileError.message };
    }

    return { profile: profileResult, error: null };
};


export const getUserProfile = async (userId: string): Promise<UserProfileData | null> => {
    console.log("USER_SERVICE_LOG: Attempting to fetch profile for userId:", userId);
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*') // Anda bisa tambahkan '*, auth_users(email)' jika ingin mengambil email juga
        .eq('id', userId)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is ok
        console.error('USER_SERVICE_ERROR: Error fetching user profile from Supabase:', error.message, 'Code:', error.code);
        return null;
    }
    if (data) {
        console.log('USER_SERVICE_LOG: Profile fetched successfully:', data);
    } else {
        console.log('USER_SERVICE_LOG: No profile found for userId:', userId);
    }
    return data as UserProfileData | null;
};

export const updateUserProfileStatus = async (userId: string, status: UserProfileStatus) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .update({ status: status })
        .eq('id', userId);

    if (error) {
        console.error('Error updating user profile status:', error.message);
        return { success: false, error: error.message };
    }
    return { success: true, error: null };
};