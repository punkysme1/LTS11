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

const MIN_LOADING_TIME = 500; // Minimal waktu loading screen ditampilkan

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true); // Default to true, as we need to check auth state
  const isMounted = useRef(true);
  const loadingStartTime = useRef<number | null>(null);
  const hasSupabaseListenerInitialized = useRef(false); // Untuk melacak apakah listener Supabase sudah menginisialisasi state pertama kali
  const lastProcessedUserId = useRef<string | null>(null); 

  console.log('AUTH_CONTEXT_STATE: Render. Loading:', loading, 'User:', user?.id, 'Role:', role, 'UserProfile:', userProfile?.status);

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
    loadingStartTime.current = null;
  }, []);

  const startLoading = useCallback(() => {
    if (!isMounted.current) return;
    setLoading(true);
    loadingStartTime.current = Date.now();
    console.log('AUTH_CONTEXT_LOG: Loading set to true. Start time recorded.');
  }, []);


  const fetchUserProfileAndSetRole = useCallback(async (userId: string) => {
    console.log('AUTH_CONTEXT_LOG: Starting fetchUserProfileAndSetRole for userId:', userId);
    console.trace('AUTH_CONTEXT_TRACE: Called fetchUserProfileAndSetRole');

    try {
      const profile = await getUserProfile(userId);
      console.log('AUTH_CONTEXT_DEBUG: Profile data fetched by getUserProfile:', profile);

      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: fetchUserProfileAndSetRole aborted, not mounted after fetch.');
          return;
      }

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
        } else {
          setRole('guest');
          console.log('AUTH_CONTEXT_LOG: Role set to GUEST (unknown status).');
        }
      } else {
        setRole('pending'); 
        console.log('AUTH_CONTEXT_LOG: User logged in but no profile found, setting role to PENDING.');
      }
    } catch (err: any) {
      console.error("AUTH_CONTEXT_ERROR: Error fetching user profile:", err.message || err);
      if (isMounted.current) {
        setRole('guest');
        setUserProfile(null);
        console.log('AUTH_CONTEXT_LOG: Error caught, role set to GUEST and profile null.');
      }
    }
  }, []);

  // Ini adalah useEffect utama untuk mendengarkan perubahan otentikasi Supabase
  useEffect(() => {
    console.log('AUTH_CONTEXT_DEBUG: useEffect runs, isMounted.current (on mount):', isMounted.current);
    console.trace('AUTH_CONTEXT_TRACE: Called useEffect (initial)');

    let unsubscribe: (() => void) | undefined;

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: Auth state change skipped, not mounted (from listener).');
          return;
      }
      
      console.log('AUTH_CONTEXT_LOG: Auth state change detected from listener. Event:', _event, 'Session user ID:', currentSession?.user?.id);
      console.trace('AUTH_CONTEXT_TRACE: Called onAuthStateChange listener');

      const currentUser = currentSession?.user ?? null;

      // Logika khusus untuk INITIAL_SESSION
      if (_event === 'INITIAL_SESSION') {
          console.log('AUTH_CONTEXT_LOG: Handling INITIAL_SESSION event.');
          if (!hasSupabaseListenerInitialized.current) {
              startLoading(); // Hanya start loading jika ini inisialisasi listener pertama kali
              hasSupabaseListenerInitialized.current = true;
          }

          setSession(currentSession);
          setUser(currentUser);
          lastProcessedUserId.current = currentUser?.id || null; // Simpan ID pengguna yang diproses

          if (currentUser) {
              console.log('AUTH_CONTEXT_LOG: Initial session found via listener, fetching profile.');
              await fetchUserProfileAndSetRole(currentUser.id);
          } else {
              console.log('AUTH_CONTEXT_LOG: No initial session found via listener.');
              setUserProfile(null);
              setRole('guest');
          }
          finishLoading(); // Selalu selesaikan loading setelah INITIAL_SESSION diproses
          return; // Hentikan pemrosesan lebih lanjut untuk INITIAL_SESSION
      }

      // Untuk event selain INITIAL_SESSION (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_DELETED)
      const isLogoutEvent = _event === 'SIGNED_OUT' || _event === 'USER_DELETED';
      const isSameUser = currentUser?.id === lastProcessedUserId.current;
      
      if (isSameUser && !isLogoutEvent && user && role !== 'guest') {
        // Jika user ID sama dan sudah login, kemungkinan hanya refresh token minor atau duplicate SIGNED_IN.
        console.log('AUTH_CONTEXT_LOG: User is already logged in and ID matched. Skipping full re-auth process and setting loading to false.');
        setSession(currentSession); 
        setUser(currentUser); 
        // Jika sesi sudah stabil dan loading masih true karena alasan lain (e.g. MIN_LOADING_TIME), segera selesaikan
        if (loading) { 
          setLoading(false); 
          loadingStartTime.current = null; 
        }
        return; // Hentikan proses lebih lanjut
      }
      
      // Jika ada perubahan user (login/logout) atau event penting lainnya
      startLoading(); 

      setSession(currentSession);
      setUser(currentUser);
      lastProcessedUserId.current = currentUser?.id || null; 

      if (currentUser) {
        console.log('AUTH_CONTEXT_LOG: Listener detected new/changed user, fetching profile.');
        await fetchUserProfileAndSetRole(currentUser.id);
      } else {
        console.log('AUTH_CONTEXT_LOG: Listener detected user logged out, resetting profile and role.');
        setUserProfile(null);
        setRole('guest');
        setSession(null); 
        setUser(null);     
      }
      finishLoading(); // Selalu selesaikan loading setelah event diproses
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
  }, [fetchUserProfileAndSetRole, startLoading, finishLoading, user, role]);

  const signOut = async () => {
    startLoading();
    console.log('AUTH_CONTEXT_LOG: Signing out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("AUTH_CONTEXT_ERROR: Error during sign out:", error.message);
      } else {
        console.log('AUTH_CONTEXT_LOG: Supabase signOut successful, resetting local state.');
        setSession(null);
        setUser(null);
        setUserProfile(null);
        setRole('guest');
        lastProcessedUserId.current = null; 
      }
    } catch (err: any) {
      console.error("AUTH_CONTEXT_ERROR: Error during sign out catch block:", err.message || err);
    } finally {
      finishLoading();
      console.log('AUTH_CONTEXT_LOG: Sign out process finished.');
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