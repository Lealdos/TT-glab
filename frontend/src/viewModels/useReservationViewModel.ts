import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReservationService } from '../services/reservationService';

// Definir el esquema de validación
const reservationSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    documentType: z.enum(['DNI', 'Passport', 'Driver License']),
    documentNumber: z.string().min(5, 'Document number is required'),
    email: z.string().email('Invalid email address'),
    reservationDate: z.string().min(1, 'Reservation date is required'),
    reservationType: z.enum([
        'Dinner',
        'Lunch',
        'Birthday',
        'Special Occasion',
    ]),
    numberOfPeople: z.number().min(1, 'At least one person is required'),
    description: z.string().optional(),
});

type ReservationFormInputs = z.infer<typeof reservationSchema>;

export const useReservationViewModel = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ReservationFormInputs>({
        resolver: zodResolver(reservationSchema),
    });

    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate(); // Para redirigir después de crear una reservación

    const onSubmit: SubmitHandler<ReservationFormInputs> = async (data) => {
        try {
            await createReservationService(data);
            setSubmitError(null);
            reset();
            navigate('/thank-you');
        } catch (error: unknown) {
            console.error(error);
            setSubmitError('Failed to create reservation. Please try again.');
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        submitError,
        onSubmit,
    };
};
