import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateReservationService } from '../services/reservationService';
import { formatDateTime } from '../utils/DateFormat';
import {
    ReservationTypeSchema,
    DocumentTypeSchema,
    StatusSchema,
} from '../utils/ValidationSchema';
import dayjs from 'dayjs';

export const reservationSchema = z.object({
    id: z.string().uuid().optional(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    status: StatusSchema,
    documentType: DocumentTypeSchema,
    documentNumber: z.string().min(1, 'Document number is required'),
    email: z.string().email('Invalid email format'),
    reservationDate: z.string(),
    reservationType: ReservationTypeSchema,
    numberOfPeople: z
        .number()
        .min(1, 'At least one person is required')
        .or(z.string().regex(/^\d+$/, 'Must be a number')),
    description: z.string().optional(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

type UseReservationViewModelProps = {
    handleToast: (message: string, type: 'success' | 'error') => void; // hay toasts
    onClose: () => void;
    reservation?: ReservationFormValues;
};

const DEFAULT_RESERVATION: ReservationFormValues = {
    status: 'PENDING',
    documentType: 'DNI',
    reservationType: 'Dinner',
    firstName: '',
    email: '',
    documentNumber: '',
    lastName: '',
    numberOfPeople: 0,
    reservationDate: dayjs().format('YYYY-MM-DDTHH:mm A'),
};

export const useReservationForm = ({
    reservation,
    handleToast,
    onClose,
}: UseReservationViewModelProps) => {
    const defaultValues: ReservationFormValues = {
        ...DEFAULT_RESERVATION,
        ...reservation,
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        register,
    } = useForm<ReservationFormValues>({
        resolver: zodResolver(reservationSchema),
        defaultValues,
    });
    useEffect(() => {
        if (reservation) {
            reset({
                ...reservation,
                reservationDate: reservation.reservationDate
                    ? formatDateTime(reservation.reservationDate)
                    : '',
            });
        }
    }, [reservation, reset]);

    const onSubmit: SubmitHandler<ReservationFormValues> = async (data) => {
        const updatedData = {
            ...data,
            numberOfPeople: Number(data.numberOfPeople),
        };

        if (reservation?.id) {
            await updateReservationService(reservation.id, updatedData);
            handleToast('Reservation updated successfully', 'success');
        } else {
            handleToast('Was not possible to update the reservation', 'error');
        }
        onClose();
    };

    return {
        register,
        control,
        handleSubmit,
        errors,
        onSubmit,
        reset,
    };
};
