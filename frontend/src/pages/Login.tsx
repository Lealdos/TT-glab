// src/pages/Login.tsx
import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useLoginViewModel } from '../viewModels/useLoginViewModel';

export const Login: React.FC = () => {
    const { register, handleSubmit, errors, authError, onSubmit } =
        useLoginViewModel();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 8,
            }}
        >
            <Typography variant='h4' component='h1' gutterBottom>
                Login
            </Typography>
            {authError && (
                <Typography variant='body1' color='error' gutterBottom>
                    {authError}
                </Typography>
            )}
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: '300px' }}
            >
                <TextField
                    label='Email'
                    fullWidth
                    margin='normal'
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label='Password'
                    type='password'
                    fullWidth
                    margin='normal'
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};
