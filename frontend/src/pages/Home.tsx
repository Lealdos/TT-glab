import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            component='div'
            gap={2}
            p={2}
            borderRadius={5}
            bgcolor={'gray'}
            color='white'
            fontSize={20}
            fontWeight={500}
            textAlign='center'
        >
            <h1>TT glab</h1>
            <p>Prueba técnica glab</p>

            <Typography variant='h4' component='h1' gutterBottom>
                <Link to='/register'>Register</Link>
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
                <Link to='/login'>Login</Link>
            </Typography>
            <Typography variant='h4' component='h1' gutterBottom>
                <Link to='/reservation'>Reservation</Link>
            </Typography>
            <Typography variant='h4' component='h1' gutterBottom>
                <Link to='/dashboard'>Dashboard</Link>
            </Typography>
        </Box>
    );
};
