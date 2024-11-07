import React from 'react';
import { NavBar } from '../components/NavBar';
import { Container } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Container>
            <NavBar />
            {children}
        </Container>
    );
};
