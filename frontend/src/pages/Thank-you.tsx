import { Box, Typography } from '@mui/material';
import React from 'react';

export const ThankYou: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 8,
                backgroundColor: 'grey',
                color: 'white',
                fontSize: 20,
                fontWeight: 500,
                textAlign: 'center',
                padding: 2,
                borderRadius: 5,
                width: '500px',
                margin: 'auto',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            }}
        >
            <Typography variant='h4' component='h1'>
                Thank you for your reservation!
            </Typography>
        </Box>
    );
};
