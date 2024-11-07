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
                height: '100vh',
                justifyContent: 'space-between',
            }}
        >
            <NavBar />
            {children}
            <footer>
                <Typography variant='body1' align='center'>
                    Made with ❤️ by Lealdos
                </Typography>
            </footer>
        </Container>
    );
};
