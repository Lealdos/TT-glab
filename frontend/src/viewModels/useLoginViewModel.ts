import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../components/context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const useLoginViewModel = () => {
    const { setIsAuthenticated } = useAuthContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const token = await loginService(data);
            sessionStorage.setItem('authToken', token.access_token);
            setAuthError(null);
            setIsAuthenticated(true);
            navigate('/admin/dashboard');
        } catch (error: unknown) {
            console.error(error);
            setAuthError('Invalid email or password');
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        authError,
        onSubmit,
    };
};
