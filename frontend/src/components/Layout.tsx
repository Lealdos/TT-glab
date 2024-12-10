import React from 'react';
import { NavBar } from '../components/NavBar';
import { Container, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';

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
                overflow: 'auto',
                height: '100vh',
                gap: 2,
            }}
            maxWidth={false}
        >
            <NavBar />
            {children}

            <ToastContainer autoClose={5000} position='bottom-right' />

            <footer>
                <Typography variant='h6' align='center'>
                    Made with ❤️ by Lealdos
                </Typography>
            </footer>
        </Container>
    );
};
