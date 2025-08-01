// src/pages/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../../types';

// FIX 1: Tambahkan `children` ke dalam tipe properti
interface AdminRouteProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

// FIX 2: Ambil `children` dari props dan render saat akses diberikan
const AdminRoute: React.FC<AdminRouteProps> = ({ allowedRoles = ['admin'], children }) => {
  const { user, role, isInitialized, loading } = useAuth();

  // Tampilkan loading screen saat otentikasi belum siap.
  if (!isInitialized || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-700 dark:text-gray-300">Memuat otentikasi...</div>
      </div>
    );
  }

  // Alihkan jika pengguna tidak login atau role tidak sesuai.
  if (!user || !allowedRoles.includes(role)) {
    console.log("ADMIN_ROUTE: Unauthorized. Redirecting. Role:", role, "Required:", allowedRoles);
    
    if (allowedRoles.includes('admin')) {
      return <Navigate to="/admin-login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // FIX 3: Jika akses diberikan, tampilkan `children` yang dibungkusnya.
  console.log("ADMIN_ROUTE: Access granted. Rendering children component.");
  return <>{children}</>;
};

export default AdminRoute;