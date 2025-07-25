// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { supabase } from '../supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { UserProfileData, UserProfileStatus, UserRole } from '../../types';
import { getUserProfile } from '../services/userService';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  userProfile: UserProfileData | null;
  role: UserRole;
  loading: boolean;
  signOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  console.log('AUTH_CONTEXT_STATE: Render. Loading:', loading, 'User:', user?.id, 'Role:', role, 'UserProfile:', userProfile?.status);

  const fetchUserProfileAndSetRole = useCallback(async (userId: string) => {
    console.log('AUTH_CONTEXT_LOG: Starting fetchUserProfileAndSetRole for userId:', userId);
    setLoading(true); // Pastikan loading true saat memulai fetch ini

    try {
      const profile = await getUserProfile(userId);
      // Cek isMounted.current sebelum pembaruan state
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: fetchUserProfileAndSetRole aborted, unmounted during fetch.');
          return; // Langsung keluar jika tidak mounted
      }

      setUserProfile(profile);

      if (profile) {
        console.log('AUTH_CONTEXT_DEBUG: Current userId:', userId);
        console.log('AUTH_CONTEXT_DEBUG: Admin User ID from env:', import.meta.env.VITE_REACT_APP_ADMIN_USER_ID);
        console.log('AUTH_CONTEXT_DEBUG: Is userId === Admin ID?', userId === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim());

        if (userId === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim()) {
          setRole('admin');
          console.log('AUTH_CONTEXT_LOG: Role set to ADMIN.');
        } else if (profile.status === UserProfileStatus.VERIFIED) {
          setRole('verified_user');
          console.log('AUTH_CONTEXT_LOG: Role set to VERIFIED_USER.');
        } else if (profile.status === UserProfileStatus.PENDING) {
          setRole('pending');
          console.log('AUTH_CONTEXT_LOG: Role set to PENDING.');
        } else {
          setRole('guest');
          console.log('AUTH_CONTEXT_LOG: Role set to GUEST (unknown status).');
        }
      } else {
        // If user is logged in but no profile exists in user_profiles table
        setRole('pending'); // User harus melengkapi profil
        console.log('AUTH_CONTEXT_LOG: User logged in but no profile found, setting role to PENDING.');
      }
    } catch (err: any) {
      console.error("AUTH_CONTEXT_ERROR: Error fetching user profile:", err.message || err);
      // Tetap set role dan profile null pada error
      if (isMounted.current) {
        setRole('guest'); // Jika ada error parah, asumsikan guest
        setUserProfile(null);
        console.log('AUTH_CONTEXT_LOG: Error caught, role set to GUEST and profile null.');
      }
    } finally {
        // Pastikan setLoading(false) selalu dipanggil di akhir, setelah semua state di atas diatur
        if (isMounted.current) { // Pastikan komponen masih mounted sebelum update state
            setLoading(false);
            console.log('AUTH_CONTEXT_LOG: fetchUserProfileAndSetRole completed, loading set to false.');
        }
    }
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initializeAuth = async () => {
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: initializeAuth skipped, not mounted.');
          return;
      }
      console.log('AUTH_CONTEXT_LOG: Initializing AuthContext...');
      setLoading(true); // Mulai loading saat inisialisasi

      try {
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (!isMounted.current) {
            console.log('AUTH_CONTEXT_LOG: initializeAuth aborted, unmounted during session fetch.');
            return;
        }

        setSession(initialSession);
        const currentUser = initialSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          console.log('AUTH_CONTEXT_LOG: Initial session found, fetching profile for:', currentUser.id);
          // fetchUserProfileAndSetRole akan mengatur setLoading(false) di finally block-nya
          await fetchUserProfileAndSetRole(currentUser.id);
        } else {
          console.log('AUTH_CONTEXT_LOG: No initial session found, setting role to guest.');
          setUserProfile(null);
          setRole('guest');
          // Jika tidak ada user, loading selesai di sini
          if (isMounted.current) setLoading(false);
        }
      } catch (error) {
        console.error("AUTH_CONTEXT_ERROR: Error in initializeAuth outer catch:", error);
        if (isMounted.current) {
          setSession(null);
          setUser(null);
          setUserProfile(null);
          setRole('guest');
          setLoading(false); // Pastikan loading diatur false jika ada error di awal
        }
      }
    };

    initializeAuth(); // Panggil fungsi inisialisasi

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: Auth state change skipped, not mounted (from listener).');
          return;
      }
      
      console.log('AUTH_CONTEXT_LOG: Auth state change detected from listener. Event:', _event, 'Session user ID:', currentSession?.user?.id);
      
      // Jika event adalah sign-in/out/update/refresh, berarti ada proses autentikasi yang terjadi
      // Set loading true agar UI menampilkan loading
      if (['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED', 'TOKEN_REFRESHED'].includes(_event)) {
          setLoading(true);
      }

      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        console.log('AUTH_CONTEXT_LOG: Listener detected new/changed user, fetching profile.');
        // fetchUserProfileAndSetRole akan mengatur setLoading(false) di finally block-nya
        await fetchUserProfileAndSetRole(currentUser.id);
      } else {
        console.log('AUTH_CONTEXT_LOG: Listener detected user logged out, resetting profile and role.');
        setUserProfile(null);
        setRole('guest');
        // Jika user logout, loading selesai di sini
        if (isMounted.current) setLoading(false);
      }
    });

    unsubscribe = authListener.subscription.unsubscribe;

    return () => {
      isMounted.current = false;
      if (unsubscribe) {
        unsubscribe();
      }
      console.log('AUTH_CONTEXT_LOG: AuthProvider unmounted, listener unsubscribed (cleanup).');
    };
  }, [fetchUserProfileAndSetRole]); // fetchUserProfileAndSetRole adalah dependensi

  const signOut = async () => {
    setLoading(true);
    console.log('AUTH_CONTEXT_LOG: Signing out...');
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("AUTH_CONTEXT_ERROR: Error during sign out:", err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        console.log('AUTH_CONTEXT_LOG: Sign out process finished (via signOut function).');
      }
    }
  };

  const value = {
    session,
    user,
    userProfile,
    role,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};