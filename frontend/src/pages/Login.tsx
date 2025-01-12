import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Layout } from '../components/Layout';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginService } from '../services/AuthService';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from '../components/context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to='/dashboard' />;
    }

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const token = await loginService(data);
            sessionStorage.setItem('authToken', token.access_token);
            setIsAuthenticated(true);
            navigate('/admin/dashboard');
        } catch (error: unknown) {
            console.error(error);
            setAuthError('Invalid email or password');
        }
    };

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
                maxWidth='sm'
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
