import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import { logoutService } from '../services/AuthService';
import { Container } from '@mui/material';

export const NavBar: React.FC = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const logOut = () => {
        logoutService();
        setIsAuthenticated(false);
        navigate('/');
    };
    return (
        <AppBar
            position='static'
            sx={{
                background:
                    'linear-gradient(108deg, rgba(253,187,45,1) 0%, rgba(253,187,45,1) 0%, rgba(34,132,195,1) 100%, rgba(0,0,0,1) 100%);',
                borderRadius: 5,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                marginY: 2,
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '@media (max-width: 600px)': {
                        width: '100%',
                        overflow: 'auto',
                    },
                }}
            >
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Button
                        color='inherit'
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Home
                    </Button>
                </Container>
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        color='inherit'
                        onClick={() => {
                            navigate('/admin/dashboard');
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        color='inherit'
                        onClick={() => {
                            navigate('/reservation');
                        }}
                    >
                        Reservations
                    </Button>
                    {isAuthenticated && (
                        <Button color='inherit' onClick={logOut}>
                            Logout
                        </Button>
                    )}
                    {!isAuthenticated && (
                        <Button
                            color='inherit'
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Container>
            </Toolbar>
        </AppBar>
    );
};
