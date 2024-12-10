import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { useLoginViewModel } from '../viewModels/useLoginViewModel';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuthContext } from '../components/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const Login: React.FC = () => {
    const { isAuthenticated } = useAuthContext();

    const { register, handleSubmit, errors, authError, onSubmit } =
        useLoginViewModel();

    const [passwordVisible, setPasswordVisible] = useState(false);
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />;
    }

    return (
        <Layout>
            <Container
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
                    margin: 'auto',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
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
                <Container
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{}}
                >
                    <TextField
                        label='Email'
                        fullWidth
                        margin='normal'
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        variant='outlined'
                    />
                    <TextField
                        label='Password'
                        type={passwordVisible ? 'text' : 'password'}
                        fullWidth
                        margin='normal'
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={() =>
                                                setPasswordVisible(
                                                    !passwordVisible
                                                )
                                            }
                                            edge='end'
                                        >
                                            {passwordVisible ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </Container>
            </Container>
        </Layout>
    );
};
