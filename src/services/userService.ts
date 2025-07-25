// src/services/userService.ts
import { supabase } from '../supabaseClient';
import { SignUpFormData, CompleteProfileFormData, UserProfileData, UserProfileStatus } from '../../types';

export const signUpUser = async (formData: SignUpFormData) => {
    const { email, password } = formData;

    console.log("USER_SERVICE_LOG: Attempting signUp for email:", email);
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        console.error('USER_SERVICE_ERROR: Error during signUp:', authError.message, authError.details, authError.hint);
        return { user: null, error: authError.message };
    }

    if (!authData.user) {
        console.error('USER_SERVICE_ERROR: SignUp successful, but user data is empty.');
        return { user: null, error: 'Pendaftaran berhasil, tetapi data pengguna kosong.' };
    }
    console.log('USER_SERVICE_LOG: SignUp successful. User ID:', authData.user.id);
    return { user: authData.user, error: null };
};

export const createUserProfile = async (userId: string, profileData: CompleteProfileFormData) => {
    console.log("USER_SERVICE_LOG: Attempting to create/update profile for userId:", userId);
    console.log("USER_SERVICE_LOG: Profile Data to be inserted:", profileData);

    // Pastikan admin sedang login saat memanggil fungsi ini jika menggunakan RLS ketat
    // Jika ini dipanggil dari sisi admin, maka auth.uid() di policy RLS akan cocok dengan admin.
    const { data: profileResult, error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
            id: userId, // ID pengguna yang profilnya dibuat/diperbarui
            full_name: profileData.full_name,
            domicile_address: profileData.domicile_address || '',
            institution_affiliation: profileData.institution_affiliation || '',
            is_alumni: profileData.is_alumni || false,
            alumni_unit: profileData.alumni_unit || null,
            alumni_grad_year: profileData.alumni_grad_year || null,
            occupation: profileData.occupation || '',
            phone_number: profileData.phone_number || '',
            status: profileData.status || UserProfileStatus.PENDING, // Status bisa diatur oleh admin
        }, { onConflict: 'id' }) // Gunakan onConflict 'id' untuk upsert
        .select()
        .single();

    if (profileError) {
        console.error('USER_SERVICE_ERROR: Error creating/updating user profile:', profileError.message);
        console.error('USER_SERVICE_ERROR: Supabase Error Code:', profileError.code);
        console.error('USER_SERVICE_ERROR: Supabase Error Details:', profileError.details);
        console.error('USER_SERVICE_ERROR: Supabase Error Hint:', profileError.hint);
        return { profile: null, error: profileError.message };
    }
    console.log('USER_SERVICE_LOG: User profile created/updated successfully:', profileResult);
    return { profile: profileResult, error: null };
};


export const getUserProfile = async (userId: string): Promise<UserProfileData | null> => {
    console.log("USER_SERVICE_LOG: Attempting to fetch profile for userId:", userId);
    // Ini sekarang hanya akan berhasil jika admin yang melihat (karena policy SELECT admin)
    // Atau jika pengguna mencoba melihat profilnya sendiri (tapi itu tidak akan ada jika admin belum membuatkan)
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error && error.code !== 'PGRST116') {
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
    console.log(`USER_SERVICE_LOG: Attempting to update status for userId: ${userId} to ${status}`);
    // Ini hanya akan berhasil jika admin yang melakukannya (karena policy UPDATE admin)
    const { data, error } = await supabase
        .from('user_profiles')
        .update({ status: status })
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        console.error('USER_SERVICE_ERROR: Error updating user profile status:', error.message, error.details, error.hint);
        return { success: false, error: error.message };
    }
    console.log('USER_SERVICE_LOG: User profile status updated successfully:', data);
    return { success: true, error: null };
};