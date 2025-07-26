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

// Konstanta untuk penundaan loading (dalam milidetik)
// Ini membantu mencegah flicker jika proses autentikasi sangat cepat
const MIN_LOADING_TIME = 500; // Minimal waktu loading screen ditampilkan

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const loadingStartTime = useRef<number | null>(null); // Untuk melacak kapan loading dimulai

  console.log('AUTH_CONTEXT_STATE: Render. Loading:', loading, 'User:', user?.id, 'Role:', role, 'UserProfile:', userProfile?.status);

  // Fungsi untuk mengakhiri loading dengan penundaan minimal
  const finishLoading = useCallback(() => {
    if (!isMounted.current) return;

    const elapsed = Date.now() - (loadingStartTime.current || 0);
    const remainingTime = MIN_LOADING_TIME - elapsed;

    if (remainingTime > 0) {
      console.log(`AUTH_CONTEXT_LOG: Delaying finishLoading by ${remainingTime}ms.`);
      setTimeout(() => {
        if (isMounted.current) {
          setLoading(false);
          console.log('AUTH_CONTEXT_LOG: Loading set to false after delay.');
        }
      }, remainingTime);
    } else {
      setLoading(false);
      console.log('AUTH_CONTEXT_LOG: Loading set to false immediately.');
    }
    loadingStartTime.current = null; // Reset start time
  }, []);

  const startLoading = useCallback(() => {
    if (!isMounted.current) return;
    setLoading(true);
    loadingStartTime.current = Date.now();
    console.log('AUTH_CONTEXT_LOG: Loading set to true. Start time recorded.');
  }, []);


  const fetchUserProfileAndSetRole = useCallback(async (userId: string) => {
    console.log('AUTH_CONTEXT_LOG: Starting fetchUserProfileAndSetRole for userId:', userId);
    console.trace('AUTH_CONTEXT_TRACE: Called fetchUserProfileAndSetRole'); // Trace panggilan

    try {
      const profile = await getUserProfile(userId);
      console.log('AUTH_CONTEXT_DEBUG: Profile data fetched by getUserProfile:', profile);

      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: fetchUserProfileAndSetRole aborted, not mounted after fetch.');
          return;
      }

      // Selalu set userProfile berdasarkan hasil fetch.
      setUserProfile(profile);
      console.log('AUTH_CONTEXT_DEBUG: setUserProfile called with:', profile?.status || 'null');

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
        } else { // Fallback for unknown status
          setRole('guest');
          console.log('AUTH_CONTEXT_LOG: Role set to GUEST (unknown status).');
        }
      } else {
        setRole('pending'); // Asumsi pending jika user login tapi profil tidak ditemukan
        console.log('AUTH_CONTEXT_LOG: User logged in but no profile found, setting role to PENDING.');
      }
    } catch (err: any) {
      console.error("AUTH_CONTEXT_ERROR: Error fetching user profile:", err.message || err);
      if (isMounted.current) {
        setRole('guest');
        setUserProfile(null);
        console.log('AUTH_CONTEXT_LOG: Error caught, role set to GUEST and profile null.');
      }
    } finally {
        // Panggil finishLoading di akhir proses ini
        finishLoading();
    }
  }, [finishLoading]); // Tambahkan finishLoading sebagai dependensi

  useEffect(() => {
    console.log('AUTH_CONTEXT_DEBUG: useEffect runs, isMounted.current (on mount):', isMounted.current);
    console.trace('AUTH_CONTEXT_TRACE: Called useEffect (initial)'); // Trace panggilan useEffect

    let unsubscribe: (() => void) | undefined;

    const initializeAuth = async () => {
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: initializeAuth skipped, not mounted.');
          return;
      }
      console.log('AUTH_CONTEXT_LOG: Initializing AuthContext...');
      startLoading(); // Mulai loading saat inisialisasi

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
          await fetchUserProfileAndSetRole(currentUser.id);
        } else {
          console.log('AUTH_CONTEXT_LOG: No initial session found.');
          setUserProfile(null);
          setRole('guest');
          finishLoading(); // Selesaikan loading jika tidak ada user
        }
      } catch (error) {
        console.error("AUTH_CONTEXT_ERROR: Error in initializeAuth outer catch:", error);
        if (isMounted.current) {
          setSession(null);
          setUser(null);
          setUserProfile(null);
          setRole('guest');
          finishLoading(); // Selesaikan loading jika ada error
        }
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: Auth state change skipped, not mounted (from listener).');
          return;
      }
      
      console.log('AUTH_CONTEXT_LOG: Auth state change detected from listener. Event:', _event, 'Session user ID:', currentSession?.user?.id);
      console.trace('AUTH_CONTEXT_TRACE: Called onAuthStateChange listener'); // Trace panggilan listener

      // Ketika ada perubahan state otentikasi, selalu mulai loading
      startLoading(); 

      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        console.log('AUTH_CONTEXT_LOG: Listener detected new/changed user, fetching profile.');
        await fetchUserProfileAndSetRole(currentUser.id);
      } else {
        console.log('AUTH_CONTEXT_LOG: Listener detected user logged out, resetting profile and role.');
        setUserProfile(null);
        setRole('guest');
        finishLoading(); // Selesaikan loading jika user logout
      }
    });

    unsubscribe = authListener.subscription.unsubscribe;

    return () => {
      isMounted.current = false;
      console.log('AUTH_CONTEXT_DEBUG: useEffect cleanup runs, isMounted.current set to false.');
      if (unsubscribe) {
        unsubscribe();
      }
      console.log('AUTH_CONTEXT_LOG: AuthProvider unmounted, listener unsubscribed (cleanup).');
    };
  }, [fetchUserProfileAndSetRole, startLoading, finishLoading]); // Tambahkan startLoading, finishLoading sebagai dependensi

  const signOut = async () => {
    startLoading();
    console.log('AUTH_CONTEXT_LOG: Signing out...');
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("AUTH_CONTEXT_ERROR: Error during sign out:", err);
    } finally {
      finishLoading(); // Selesaikan loading setelah sign out
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