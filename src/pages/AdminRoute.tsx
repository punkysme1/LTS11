// src/components/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../../types'; // Pastikan path ini benar

interface AdminRouteProps {
  // allowedRoles memungkinkan rute ini digunakan juga untuk melindungi rute non-admin
  // seperti halaman profil pengguna, di mana hanya verified_user atau pending yang bisa akses.
  allowedRoles?: UserRole[];
}

const AdminRoute: React.FC<AdminRouteProps> = ({ allowedRoles = ['admin'] }) => {
  const { user, role, loading } = useAuth(); // Dapatkan user, role, dan loading dari useAuth

  if (loading) {
    // Tampilkan loading screen saat autentikasi masih dimuat
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-700 dark:text-gray-300">Memuat otentikasi...</div>
      </div>
    );
  }

  // Jika tidak ada user ATAU role tidak termasuk dalam allowedRoles, redirect ke halaman login admin
  // Jika allowedRoles hanya ['admin'], dan user bukan admin, akan diarahkan ke /admin-login
  // Jika allowedRoles termasuk ['verified_user'], dan user bukan itu, akan diarahkan
  if (!user || !allowedRoles.includes(role)) {
    console.log("ADMIN_ROUTE: Unauthorized access. User:", user?.id, "Role:", role, "Attempted Roles:", allowedRoles);
    // Jika user adalah guest atau role tidak sesuai, arahkan ke login yang sesuai
    // Jika tujuannya /admin, arahkan ke /admin-login
    // Jika tujuannya /user, arahkan ke /login
    // Ini bisa diatur lebih cerdas, untuk saat ini kita asumsikan default ke /admin-login
    // Anda bisa menyesuaikannya jika punya ProtectedRoute terpisah untuk user biasa
    if (allowedRoles.includes('admin')) {
      return <Navigate to="/admin-login" replace />;
    } else {
      return <Navigate to="/login" replace />; // Default untuk rute yang dilindungi user
    }
  }

  // Jika user ada dan role diizinkan, render child routes (Outlet)
  return <Outlet />;
};

export default AdminRoute;