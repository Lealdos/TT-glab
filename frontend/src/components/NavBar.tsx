import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import { logoutService } from '../services/AuthService';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';

export const NavBar: React.FC = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const logOut = () => {
        logoutService();
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const menuItems = [
        { label: 'Dashboard', onClick: () => navigate('/admin/dashboard') },
        { label: 'Reservations', onClick: () => navigate('/reservation') },
        isAuthenticated
            ? { label: 'Logout', onClick: logOut }
            : { label: 'Login', onClick: () => navigate('/login') },
    ];

    return (
        <>
            <AppBar
                position='static'
                sx={{
                    background:
                        'linear-gradient(108deg, rgba(253,187,45,1) 0%, rgba(34,132,195,1) 100%)',
                    borderRadius: 5,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    marginY: 2,
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Container
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'space-between',
                            alignItems: 'center',
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

                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            onClick={handleDrawerToggle}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Container>

                    <Container
                        sx={{
                            display: { xs: 'none', md: 'flex' },
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
                            display: { xs: 'none', md: 'flex' },
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
            <Drawer
                anchor='left'
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                <List
                    sx={{
                        background:
                            'linear-gradient(108deg, rgba(253,187,45,1) 0%, rgba(34,132,195,1) 100%)',
                        height: '100%',
                    }}
                >
                    {menuItems.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton onClick={item.onClick}>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};
