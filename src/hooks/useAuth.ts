// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authStore } from '../authStore'; // Import authStore dari lokasi yang benar
import { AuthContextType } from '../../types'; // Gunakan AuthContextType dari types.ts

export const useAuth = (): AuthContextType => {
  // Mendapatkan state awal dari store
  const [authState, setAuthState] = useState<AuthContextType>(authStore.getState());

  useEffect(() => {
    // Berlangganan perubahan state dari authStore
    const unsubscribe = authStore.subscribe(newState => {
      // Perbarui state React komponen ini
      setAuthState(newState);
    });

    // Cleanup: batalkan langganan saat komponen di-unmount
    return () => {
      unsubscribe();
    };
  }, []); // Dependensi kosong agar efek hanya berjalan sekali saat mount

  // Mengembalikan nilai seperti AuthContextType
  return {
    session: authState.session,
    user: authState.user,
    userProfile: authState.userProfile,
    role: authState.role,
    loading: authState.loading,
    signOut: authStore.signOut.bind(authStore), // Bind signOut ke instance store
  };
};