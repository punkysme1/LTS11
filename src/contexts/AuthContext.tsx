// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { UserProfileData, UserProfileStatus, UserRole } from '../../types'; // Import UserProfileData dan UserRole
import { getUserProfile } from '../services/userService'; // Import getUserProfile

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfileData | null; // Tambahkan userProfile
  role: UserRole; // Tambahkan role
  loading: boolean;
  signOut: () => Promise<void>;
  // Jika Anda ingin menyediakan signIn/signUp di context, Anda bisa menambahkannya di sini
  // signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null); // State untuk profil pengguna
  const [role, setRole] = useState<UserRole>('guest'); // State untuk peran pengguna
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil profil pengguna dan menentukan peran
  const fetchUserProfileAndSetRole = useCallback(async (userId: string) => {
    const profile = await getUserProfile(userId); //
    setUserProfile(profile); //

    if (profile) {
      // PERBAIKAN DI SINI: Menggunakan import.meta.env untuk variabel lingkungan Vite.
      // Pastikan Anda punya file .env di root dengan VITE_REACT_APP_ADMIN_USER_ID=YOUR_ADMIN_USER_ID
      if (userId === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID) { //
          setRole('admin'); //
      } else if (profile.status === UserProfileStatus.VERIFIED) { //
          setRole('verified_user'); //
      } else if (profile.status === UserProfileStatus.PENDING) { //
          setRole('pending'); //
      } else {
          setRole('guest'); // Fallback jika status tidak dikenal
      }
    } else {
        // Jika tidak ada profil, cek apakah user sudah login (berarti baru sign-up tapi belum lengkapi profil)
        // Atau jika user logout, role akan kembali ke guest
        setRole(user ? 'pending' : 'guest'); //
    }
  }, [user]); // Ditambahkan 'user' ke dependency array

  useEffect(() => {
    const getSessionAndProfile = async () => {
      setLoading(true); //
      const { data: { session }, error } = await supabase.auth.getSession(); //
      if (error) {
        console.error("Error getting session:", error); //
      }
      setSession(session); //
      const currentUser = session?.user ?? null; //
      setUser(currentUser); //

      if (currentUser) {
        await fetchUserProfileAndSetRole(currentUser.id); //
      } else {
        setUserProfile(null); //
        setRole('guest'); //
      }
      setLoading(false); //
    };

    getSessionAndProfile(); //

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true); // Set loading true saat perubahan state auth
      setSession(session); //
      const currentUser = session?.user ?? null; //
      setUser(currentUser); //

      if (currentUser) {
        fetchUserProfileAndSetRole(currentUser.id).finally(() => setLoading(false)); //
      } else {
        setUserProfile(null); //
        setRole('guest'); //
        setLoading(false); //
      }
    });

    return () => {
      authListener.subscription.unsubscribe(); //
    };
  }, [fetchUserProfileAndSetRole]); //

  const signOut = async () => {
    setLoading(true); // Set loading true saat proses logout
    await supabase.auth.signOut(); //
    setSession(null); //
    setUser(null); //
    setUserProfile(null); //
    setRole('guest'); //
    setLoading(false); // Set loading false setelah logout selesai
  };

  const value = {
    session,
    user,
    userProfile, // Sediakan userProfile di context
    role, // Sediakan role di context
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};