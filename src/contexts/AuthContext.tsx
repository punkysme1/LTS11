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

const MIN_LOADING_TIME = 500; 

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true); // Default to true, as we need to check auth state
  const isMounted = useRef(true);
  const loadingStartTime = useRef<number | null>(null);
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

  // Ini adalah useEffect utama untuk menginisialisasi dan mendengarkan perubahan otentikasi
  useEffect(() => {
    console.log('AUTH_CONTEXT_DEBUG: useEffect runs, isMounted.current (on mount):', isMounted.current);
    console.trace('AUTH_CONTEXT_TRACE: Called useEffect (initial)');

    let unsubscribe: (() => void) | undefined;

    // Fungsi async untuk inisialisasi awal AuthProvider
    const initializeAuthSynchronously = async () => {
        if (!isMounted.current) return;
        console.log('AUTH_CONTEXT_LOG: Running initial synchronous session check.');
        startLoading(); // Mulai loading segera

        try {
            const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
            
            if (!isMounted.current) {
                console.log('AUTH_CONTEXT_LOG: initializeAuthSynchronously aborted, unmounted.');
                return;
            }

            setSession(initialSession);
            const currentUser = initialSession?.user ?? null;
            setUser(currentUser);
            lastProcessedUserId.current = currentUser?.id || null; // Simpan ID pengguna yang diproses

            if (currentUser) {
                console.log('AUTH_CONTEXT_LOG: Initial session found synchronously, fetching profile.');
                await fetchUserProfileAndSetRole(currentUser.id);
            } else {
                console.log('AUTH_CONTEXT_LOG: No initial session found synchronously.');
                setUserProfile(null);
                setRole('guest');
            }
            // Langsung finish loading setelah pemeriksaan sesi awal selesai
            finishLoading(); 

        } catch (error) {
            console.error("AUTH_CONTEXT_ERROR: Error in initial synchronous session check:", error);
            if (isMounted.current) {
                setSession(null);
                setUser(null);
                setUserProfile(null);
                setRole('guest');
                finishLoading();
            }
        }
    };

    // Panggil fungsi inisialisasi awal saat komponen di-mount
    initializeAuthSynchronously();

    // Setup listener untuk perubahan state otentikasi Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: Auth state change skipped, not mounted (from listener).');
          return;
      }
      
      console.log('AUTH_CONTEXT_LOG: Auth state change detected from listener. Event:', _event, 'Session user ID:', currentSession?.user?.id);
      console.trace('AUTH_CONTEXT_TRACE: Called onAuthStateChange listener');

      const currentUser = currentSession?.user ?? null;

      // Handle event INITIAL_SESSION secara eksplisit jika belum terproses
      // Atau jika event SIGNED_IN ini adalah yang pertama setelah mounting
      // (ini akan tumpang tindih dengan initializeAuthSynchronously, tapi listener ini akan menjadi "kebenaran akhir")
      if (_event === 'INITIAL_SESSION' && currentUser && lastProcessedUserId.current === null) {
          // Kasus khusus: INITIAL_SESSION datang dan kita belum punya user ID yang diproses
          // Ini berarti initializeAuthSynchronously belum sempat mengatur lastProcessedUserId,
          // atau listener menangkapnya lebih dulu.
          console.log('AUTH_CONTEXT_LOG: Processing INITIAL_SESSION via listener for first time user.');
          startLoading();
          setSession(currentSession);
          setUser(currentUser);
          lastProcessedUserId.current = currentUser?.id || null;
          await fetchUserProfileAndSetRole(currentUser.id);
          finishLoading();
          return;
      }


      // Periksa apakah user ID sama dan event bukan logout
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
      // Atau jika isSameUser false (berarti ada pergantian user, atau user baru)
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
      finishLoading(); 
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