import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const NavBar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Box top={0} left={0} right={0} position='fixed' bgcolor='#242424'>
            <AppBar position='static'>
                <Toolbar
                    sx={{ justifyContent: 'space-between', bgcolor: '#242424' }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{ flexGrow: 1 }}
                        >
                            TT glab
                        </Typography>
                        <Button
                            color='inherit'
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Home
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            color='inherit'
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            Register
                        </Button>
                        <Button
                            color='inherit'
                            onClick={() => {
                                navigate('/dashboard');
                            }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            color='inherit'
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};