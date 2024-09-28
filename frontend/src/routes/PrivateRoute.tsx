// src/routes/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken'); // Verificar autenticación

    return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};
