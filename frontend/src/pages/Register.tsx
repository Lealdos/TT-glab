import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRegisterViewModel } from '../viewModels/useRegisterViewModel';

export const Register: React.FC = () => {
    const { register, handleSubmit, errors, registerError, onSubmit } =
        useRegisterViewModel();

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
            <Typography variant='h4' component='h1' gutterBottom>
                Register
            </Typography>
            {registerError && (
                <Typography variant='body1' color='error' gutterBottom>
                    {registerError}
                </Typography>
            )}
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: '300px' }}
            >
                <TextField
                    label='First Name'
                    fullWidth
                    margin='normal'
                    {...register('firstName')}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    label='Last Name'
                    fullWidth
                    margin='normal'
                    {...register('lastName')}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
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
                <TextField
                    label='Confirm Password'
                    type='password'
                    fullWidth
                    margin='normal'
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
};
