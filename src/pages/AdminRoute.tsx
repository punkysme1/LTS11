// src/pages/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../../types';

interface AdminRouteProps {
  allowedRoles?: UserRole[];
}

const AdminRoute: React.FC<AdminRouteProps> = ({ allowedRoles = ['admin'] }) => {
  const { user, role, loading } = useAuth();

  // Show loading screen while authentication is in progress
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-700 dark:text-gray-300">Memuat otentikasi...</div>
      </div>
    );
  }

  // Redirect if user is not authenticated or doesn't have the required role
  if (!user || !allowedRoles.includes(role)) {
    console.log("ADMIN_ROUTE: Unauthorized access. User:", user?.id, "Role:", role, "Required Roles:", allowedRoles);
    
    // Redirect based on the required role
    if (allowedRoles.includes('admin')) {
      return <Navigate to="/admin-login" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  // User is authenticated and has the required role
  console.log("ADMIN_ROUTE: Access granted. User:", user.id, "Role:", role);
  return <Outlet />;
};

export default AdminRoute;