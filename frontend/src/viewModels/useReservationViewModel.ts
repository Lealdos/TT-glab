import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReservationService } from '../services/reservationService';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import { formatDateTime } from '../utils/DateFormat';
import {
    ReservationTypeSchema,
    DocumentTypeSchema,
} from '../utils/ValidationSchema';

//esquema de validación
const DateSchema = z
    .custom<Dayjs | null>(
        (val) => dayjs(val).isValid(),

        {
            message: 'Valid date is required',
        }
    )
    .refine((val) => dayjs(val).isAfter(dayjs().add(1, 'hour')), {
        message: 'Date must be at least 1 hour from now',
    });

const reservationSchema = z.object({
    reservationDate: DateSchema,
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    documentType: DocumentTypeSchema,
    documentNumber: z.string().min(5, 'Document number is required'),
    email: z.string().email('Invalid email address'),
    reservationType: ReservationTypeSchema,
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
            if (reservationDate) {
                const formattedDate = formatDateTime(reservationDate); // Convert Dayjs to string
                await createReservationService({
                    ...restData,
                    reservationDate: formattedDate,
                    status: 'PENDING',
                });
                setSubmitError(null);
                reset();
                navigate('/thank-you');
                toast('Reservation created successfully');
            }
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
        control,
    };
};
