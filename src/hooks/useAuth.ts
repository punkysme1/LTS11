// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // PERBAIKAN DI SINI: Import AuthContext dari contexts

export const useAuth = () => {
  const context = useContext(AuthContext); // Gunakan AuthContext yang diimpor dari contexts
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};