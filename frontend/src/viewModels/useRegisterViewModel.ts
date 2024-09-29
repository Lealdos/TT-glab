// src/viewModels/useRegisterViewModel.ts
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserService } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const registerSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export const useRegisterViewModel = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const [registerError, setRegisterError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            await registerUserService(data);
            setRegisterError(null);
            navigate('/dashboard');
        } catch (error: unknown) {
            console.error(error);
            setRegisterError('Failed to register user. Please try again.');
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        registerError,
        onSubmit,
    };
};
