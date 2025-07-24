// src/hooks/useAuth.ts
import { useContext } from 'react';
// PERBAIKAN DI SINI: Import AuthContextType dari types.ts
import { AuthContextType } from '../types';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext dari contexts

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};