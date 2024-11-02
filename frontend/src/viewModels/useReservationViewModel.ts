import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReservationService } from '../services/reservationService';
import dayjs from 'dayjs';

interface ReservationUpdateData {
    reservationDate?: string;
    reservationType?: string;
    numberOfPeople?: number;
    status?: string;
}

// Definir el esquema de validación
const reservationSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    documentType: z.enum(['DNI', 'Passport', 'Driver License']),
    documentNumber: z.string().min(5, 'Document number is required'),
    email: z.string().email('Invalid email address'),
    reservationDate: z.any().refine((val) => dayjs.isDayjs(val), {
        message: 'Reservation date is required',
    }),
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
        control,
    } = useForm<ReservationFormInputs>({
        resolver: zodResolver(reservationSchema),
    });

    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate(); //redirigir hook

    const onSubmit: SubmitHandler<ReservationFormInputs> = async ({
        reservationDate,
        ...restData
    }) => {
        try {
            const formattedDate = reservationDate.format('YYYY-MM-DD hh:mm A'); // Convert Dayjs to string
            console.log(formattedDate);
            await createReservationService({
                ...restData,
                reservationDate: formattedDate,
            });
            setSubmitError(null);
            reset();
            navigate('/thank-you');
        } catch (error: unknown) {
            console.error(error);
            setSubmitError('Failed to create reservation. Please try again.');
        }
    };

    const updateReservationService = async (
        id: string,
        data: ReservationUpdateData
    ) => {
        try {
            await updateReservationService(id, data);
            setSubmitError(null);
            reset();
            navigate('/thank-you');
        } catch (error: unknown) {
            console.error(error);
            setSubmitError('Failed to update reservation. Please try again.');
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        submitError,
        onSubmit,
        control,
        updateReservationService,
    };
};
