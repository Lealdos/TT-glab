/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useMemo } from 'react';
import { getSessionStorageItem } from '../../utils/KeepSessionPersisten';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        getSessionStorageItem('authToken') !== null
    );

    const contextValue = useMemo(
        () => ({
            isAuthenticated,
            setIsAuthenticated,
        }),
        [isAuthenticated]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};
