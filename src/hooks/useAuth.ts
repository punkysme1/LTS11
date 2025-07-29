// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authStore } from '../authStore';
import { AuthContextType } from '../../types'; // Pastikan AuthContextType di sini benar

export const useAuth = (): AuthContextType => {
  // Gunakan state lokal untuk menyimpan data dari authStore
  // Omit 'signOut' dari tipe karena itu adalah fungsi, bukan bagian dari data state yang berubah
  const [authState, setAuthState] = useState<Omit<AuthContextType, 'signOut'>>(() => {
    // Initializer function untuk useState, dijalankan hanya sekali
    const initialState = authStore.getState();
    const { signOut, ...rest } = initialState; // Pisahkan signOut jika ada (meskipun seharusnya tidak di initialState)
    return rest;
  });

  useEffect(() => {
    // Berlangganan perubahan state dari authStore
    const unsubscribe = authStore.subscribe(newState => {
      // Perbarui state React komponen ini dengan data baru (tanpa fungsi signOut)
      const { signOut, ...rest } = newState;
      setAuthState(rest);
    });

    // Cleanup: batalkan langganan saat komponen di-unmount
    return () => {
      unsubscribe();
    };
  }, []); // Dependensi kosong agar efek hanya berjalan sekali saat mount

  // Mengembalikan nilai seperti AuthContextType
  // signOut selalu di-bind ke instance store agar tersedia
  return {
    ...authState, // Sebarkan semua properti data yang disimpan di state lokal
    signOut: authStore.signOut.bind(authStore), // Bind fungsi signOut dari instance store
  };
};