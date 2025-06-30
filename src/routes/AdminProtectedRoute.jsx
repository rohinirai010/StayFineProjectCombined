import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = useSelector(state => state.adminAuth.isAdminAuthenticated);
  
  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default AdminProtectedRoute;