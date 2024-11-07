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
        <Container>
            <AppBar
                position='static'
                sx={{ backgroundColor: '#242424', borderRadius: 5 }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Container sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            color='inherit'
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Home
                        </Button>
                    </Container>
                    <Container sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            color='inherit'
                            onClick={() => {
                                navigate('admin/dashboard');
                            }}
                        >
                            Dashboard
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
        </Container>
    );
};
