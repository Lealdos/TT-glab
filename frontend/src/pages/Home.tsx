import { Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../components/context/AuthContext';
import { Layout } from '../components/Layout';

export const Home: React.FC = () => {
    const { isAuthenticated } = useAuthContext();
    return (
        <Layout>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background:
                        'linear-gradient(108deg, rgba(253,187,45,1) 0%, rgba(253,187,45,1) 0%, rgba(34,132,195,1) 100%, rgba(0,0,0,1) 100%);',
                    borderRadius: 5,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    gap: 2,
                    padding: 2,
                    textAlign: 'center',
                }}
                maxWidth='md'
            >
                <Typography variant='h1' component='h1' gutterBottom>
                    Restaurant Reservation
                </Typography>
                <Typography variant='h4' component='p' gutterBottom>
                    Technical Test
                </Typography>

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
        </Layout>
    );
};
