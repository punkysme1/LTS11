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

const MIN_LOADING_TIME = 500; // Minimal waktu loading screen ditampilkan (milidetik)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const loadingStartTime = useRef<number | null>(null);
  const lastProcessedAccessToken = useRef<string | null>(null); // Untuk mencegah pemrosesan event berulang
  const authListenerRef = useRef<any>(null); // Untuk menyimpan langganan listener

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
    loadingStartTime.current = null; // Reset start time
  }, []);

  const startLoading = useCallback(() => {
    if (!isMounted.current) return;
    setLoading(true);
    loadingStartTime.current = Date.now();
    console.log('AUTH_CONTEXT_LOG: Loading set to true. Start time recorded.');
  }, []);

  const handleUserAndProfileState = useCallback(async (currentSession: Session | null) => { // Sekarang menerima objek Session penuh
    if (!isMounted.current) {
      console.log('AUTH_CONTEXT_LOG: handleUserAndProfileState aborted, not mounted.');
      return;
    }

    // UPDATE PENTING: Deteksi event berulang dari _recoverAndRefresh
    // Jika user ID dan access_token tidak berubah, dan sudah diproses sebelumnya, abaikan.
    // Ini adalah kunci untuk menghentikan loop loading.
    const newUserId = currentSession?.user?.id || null;
    const newAccessToken = currentSession?.access_token || null;

    if (newUserId === user?.id && newAccessToken === lastProcessedAccessToken.current && userProfile !== undefined && userProfile !== null) {
        console.warn('AUTH_CONTEXT_WARN: Redundant SIGNED_IN event. Skipping profile re-fetch.');
        finishLoading(); // Tetap panggil finishLoading jika startLoading sudah terpicu
        return;
    }

    // Simpan token yang baru diproses
    lastProcessedAccessToken.current = newAccessToken;

    setSession(currentSession); // Update state Session
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser); // Update state User

    if (currentUser) {
      console.log('AUTH_CONTEXT_LOG: Processing user ID:', currentUser.id);
      console.trace('AUTH_CONTEXT_TRACE: handleUserAndProfileState called for user');

      try {
        const profile = await getUserProfile(currentUser.id);
        console.log('AUTH_CONTEXT_DEBUG: Profile data fetched by getUserProfile:', profile);

        if (!isMounted.current) {
            console.log('AUTH_CONTEXT_LOG: handleUserAndProfileState aborted, not mounted after profile fetch.');
            return;
        }

        setUserProfile(profile);
        console.log('AUTH_CONTEXT_DEBUG: setUserProfile called with:', profile?.status || 'null');

        if (profile) {
          if (currentUser.id === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID?.trim()) {
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
        console.error("AUTH_CONTEXT_ERROR: Error fetching user profile in handleUserAndProfileState:", err.message || err);
        if (isMounted.current) {
          setRole('guest');
          setUserProfile(null);
          console.log('AUTH_CONTEXT_LOG: Error caught in handleUserAndProfileState, role set to GUEST and profile null.');
        }
      } finally {
        finishLoading();
      }
    } else { // No current user
      console.log('AUTH_CONTEXT_LOG: No current user, resetting states to default.');
      setUserProfile(null);
      setRole('guest');
      lastProcessedAccessToken.current = null; // Bersihkan token saat logout
      finishLoading();
    }
  }, [finishLoading, user?.id, userProfile]); // user?.id dan userProfile harus ada di dependensi


  useEffect(() => {
    console.log('AUTH_CONTEXT_DEBUG: useEffect runs, isMounted.current (on mount):', isMounted.current);
    console.trace('AUTH_CONTEXT_TRACE: Called useEffect (initial)');

    // Inisialisasi Promise yang akan menunggu event onAuthStateChange pertama (dihapus, langsung pakai listener)
    
    // Setup listener for auth state changes
    authListenerRef.current = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: Auth state change skipped, not mounted (from listener).');
          return;
      }
      
      console.log('AUTH_CONTEXT_LOG: Auth state change detected from listener. Event:', _event, 'Session user ID:', currentSession?.user?.id);
      console.trace('AUTH_CONTEXT_TRACE: Called onAuthStateChange listener');

      // Start loading when any auth state change is detected
      startLoading(); 

      // Process the session and update user/profile states
      await handleUserAndProfileState(currentSession);
    });

    // Cleanup function for useEffect
    return () => {
      isMounted.current = false;
      console.log('AUTH_CONTEXT_DEBUG: useEffect cleanup runs, isMounted.current set to false.');
      if (authListenerRef.current?.subscription?.unsubscribe) {
        authListenerRef.current.subscription.unsubscribe();
        console.log('AUTH_CONTEXT_LOG: AuthProvider unmounted, listener unsubscribed (cleanup).');
      }
    };
  }, [handleUserAndProfileState, startLoading]); // Dependencies


  const signOut = async () => {
    startLoading();
    console.log('AUTH_CONTEXT_LOG: Signing out...');
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("AUTH_CONTEXT_ERROR: Error during sign out:", err);
    } finally {
      // onAuthStateChange will fire a SIGNED_OUT event, which will handle state reset and finishLoading
      // No need to explicitly call handleUserAndProfileState(null) here
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