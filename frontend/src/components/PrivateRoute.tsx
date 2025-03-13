import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    // Verificação adicional do token no localStorage
    const storedToken = localStorage.getItem('token');
    if (!storedToken && isAuthenticated) {
      // Se não há token no localStorage mas o estado diz que está autenticado,
      // algo está errado e precisamos forçar um logout
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}; 