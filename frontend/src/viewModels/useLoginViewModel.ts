// src/viewModels/useLoginViewModel.ts
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const useLoginViewModel = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });
    const [authError, setAuthError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        // Lógica de autenticación
        console.log('Login data:', data);
        // Simular un error de autenticación
        if (
            data.email !== 'admin@example.com' ||
            data.password !== 'password123'
        ) {
            setAuthError('Invalid email or password');
        } else {
            setAuthError(null);
            // Redirigir al dashboard o realizar otra acción
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
