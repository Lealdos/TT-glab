import { Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../components/context/AuthContext';

export const Home: React.FC = () => {
    const { isAuthenticated } = useAuthContext();
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background:
                    'linear-gradient(to right bottom, #430089, #82ffa1)',
                borderRadius: 5,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                gap: 2,
                padding: 2,
            }}
        >
            <h1>TT glab</h1>
            <p>Prueba técnica glab</p>

            <Typography
                sx={{
                    textDecoration: 'none',
                    color: 'white',
                }}
                variant='h4'
                component='h1'
                gutterBottom
            >
                {!isAuthenticated && <Link to='/login'>Login</Link>}
            </Typography>
            <Typography variant='h4' component='h1' gutterBottom>
                <Link to='/reservation'>Reservation</Link>
            </Typography>
            <Typography variant='h4' component='h1' gutterBottom>
                <Link to='admin/dashboard'>Dashboard</Link>
            </Typography>
        </Container>
    );
};
