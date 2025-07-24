// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { supabase } from '../supabaseClient';
import { Session, User } from '@supabase/supabase-js';
// PERBAIKAN DI SINI: Import AuthContextType dari types.ts
import { UserProfileData, UserProfileStatus, UserRole, AuthContextType } from '../../types';
import { getUserProfile } from '../services/userService';

// PERBAIKAN DI SINI: HAPUS DEFINISI AuthContextType yang DUPLIKAT di sini
// export interface AuthContextType { ... } // HAPUS INI

// AuthContext tetap didefinisikan di sini karena Provider-nya ada di sini
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
    if (!isMounted.current) {
        console.log('AUTH_CONTEXT_LOG: fetchUserProfileAndSetRole skipped, not mounted.');
        return;
    }
    console.log('AUTH_CONTEXT_LOG: Starting fetchUserProfileAndSetRole for userId:', userId);

    try {
      const profile = await getUserProfile(userId);
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: fetchUserProfileAndSetRole aborted, unmounted during fetch.');
          return;
      }

      setUserProfile(profile);

      if (profile) {
        if (userId === import.meta.env.VITE_REACT_APP_ADMIN_USER_ID) {
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
    } finally {
      if (isMounted.current) {
        setLoading(false);
        console.log('AUTH_CONTEXT_LOG: setLoading(false) executed. Final loading state:', false);
      }
    }
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      if (!isMounted.current) return;
      console.log('AUTH_CONTEXT_LOG: Initializing AuthContext from getInitialSession.');
      setLoading(true);

      const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
      
      if (!isMounted.current) return;

      if (sessionError) {
        console.error("AUTH_CONTEXT_ERROR: Error getting initial session:", sessionError);
        setSession(null);
        setUser(null);
        setUserProfile(null);
        setRole('guest');
        setLoading(false);
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
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted.current) {
          console.log('AUTH_CONTEXT_LOG: handleAuthStateChange skipped, not mounted (from listener).');
          return;
      }
      
      console.log('AUTH_CONTEXT_LOG: Auth state change detected from listener. Event:', _event, 'Session user ID:', currentSession?.user?.id);
      
      if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED' || _event === 'USER_UPDATED') {
          if (user && user.id === currentSession?.user?.id && userProfile) {
              console.log('AUTH_CONTEXT_LOG: User ID and profile unchanged from listener event, skipping refetch.');
              setSession(currentSession);
              setUser(currentSession.user);
              setLoading(false);
              return;
          }
      }

      setLoading(true);
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        console.log('AUTH_CONTEXT_LOG: Listener detected new/changed user (or initial fetch), fetching profile.');
        await fetchUserProfileAndSetRole(currentUser.id);
      } else {
        console.log('AUTH_CONTEXT_LOG: Listener detected user logged out.');
        setUserProfile(null);
        setRole('guest');
        setLoading(false);
      }
    });

    return () => {
      isMounted.current = false;
      authListener.subscription.unsubscribe();
      console.log('AUTH_CONTEXT_LOG: AuthProvider unmounted, listener unsubscribed (cleanup).');
    };
  }, [fetchUserProfileAndSetRole, user, userProfile]);

  const signOut = async () => {
    setLoading(true);
    console.log('AUTH_CONTEXT_LOG: Signing out...');
    try {
      await supabase.auth.signOut();
      if (isMounted.current) {
        setSession(null);
        setUser(null);
        setUserProfile(null);
        setRole('guest');
        console.log('AUTH_CONTEXT_LOG: Sign out successful, state reset.');
      }
    } catch (err) {
      console.error("AUTH_CONTEXT_ERROR: Error during sign out:", err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        console.log('AUTH_CONTEXT_LOG: Sign out process finished.');
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