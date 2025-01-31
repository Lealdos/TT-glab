import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = !!sessionStorage.getItem('authToken');

    return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

export { PrivateRoute };
