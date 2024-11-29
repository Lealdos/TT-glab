import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    ReservationData,
    updateReservationService,
} from '../services/reservationService';
import dayjs from 'dayjs';

export const reservationSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    status: z.enum([
        'PENDING',
        'ACCEPTED',
        'REJECTED',
        'CANCELED',
        'COMPLETED',
    ]),
    documentType: z.enum(['DNI', 'PASSPORT', 'DRIVER_LICENSE']),
    documentNumber: z.string().min(1, 'Document number is required'),
    email: z.string().email('Invalid email format'),
    reservationDate: z.string(),
    reservationType: z.enum([
        'DINNER',
        'LUNCH',
        'BIRTHDAY',
        'SPECIAL_OCCASION',
    ]),
    numberOfPeople: z
        .number()
        .min(1, 'At least one person is required')
        .or(z.string().regex(/^\d+$/, 'Must be a number')),
    description: z.string().optional(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

type UseReservationViewModelProps = {
    reservation: ReservationData | null;
    handleToast: (message: string, type: 'success' | 'error') => void;
    onClose: () => void;
};

export const useUpdateReservationViewModel = ({
    reservation,
    handleToast,
    onClose,
}: UseReservationViewModelProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReservationFormValues>({
        resolver: zodResolver(reservationSchema),
        defaultValues: reservation
            ? {
                  ...reservation,
                  status: reservation.status?.toUpperCase() as ReservationFormValues['status'],
                  documentType:
                      reservation.documentType.toUpperCase() as ReservationFormValues['documentType'],
                  reservationType:
                      reservation.reservationType.toUpperCase() as ReservationFormValues['reservationType'],
              }
            : undefined,
    });

    useEffect(() => {
        if (reservation) {
            reset({
                ...reservation,
                reservationDate: reservation.reservationDate
                    ? dayjs(reservation.reservationDate).format(
                          'YYYY-MM-DDTHH:mm'
                      )
                    : '',
                documentType:
                    reservation.documentType.toUpperCase() as ReservationFormValues['documentType'],
                reservationType:
                    reservation.reservationType.toUpperCase() as ReservationFormValues['reservationType'],
            });
        }
    }, [reservation, reset]);

    const onSubmit: SubmitHandler<ReservationFormValues> = async (data) => {
        const updatedData = {
            ...data,
            numberOfPeople:
                typeof data.numberOfPeople === 'string'
                    ? parseInt(data.numberOfPeople, 10)
                    : data.numberOfPeople,
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
        control,
        handleSubmit,
        errors,
        onSubmit,
        reset,
    };
};
