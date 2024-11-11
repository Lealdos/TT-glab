import React from 'react';
import { NavBar } from '../components/NavBar';
import { Container, Typography } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <NavBar />
            {children}
            <footer>
                <Typography variant='h6' align='center'>
                    Made with ❤️ by Lealdos
                </Typography>
            </footer>
        </Container>
    );
};
