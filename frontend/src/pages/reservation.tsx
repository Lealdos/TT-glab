import React, { useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    Typography,
    InputLabel,
    FormControl,
    Container,
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import dayjs, { Dayjs } from 'dayjs';
import { Layout } from '../components/Layout';
import {
    ReservationTypeSchema,
    DocumentTypeSchema,
} from '../utils/ValidationSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { createReservationService } from '../services/reservationService';
import { formatDateTime } from '../utils/DateFormat';
import { toast } from 'react-toastify';

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

export const Reservation: React.FC = () => {
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

    return (
        <Layout>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 5,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    padding: 2,
                }}
                maxWidth='md'
            >
                <Typography variant='h4' component='h1' gutterBottom>
                    Create a Reservation
                </Typography>
                {submitError && (
                    <Typography variant='body1' color='error' gutterBottom>
                        {submitError}
                    </Typography>
                )}

                <Container
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: '#ffff',
                        padding: 2,
                        fontSize: 20,
                        fontWeight: 500,
                        textAlign: 'center',
                        borderRadius: 5,
                        margin: 'auto',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <TextField
                        label='First Name'
                        fullWidth
                        margin='normal'
                        {...register('firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        label='Last Name'
                        fullWidth
                        margin='normal'
                        {...register('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Document Type</InputLabel>
                        <Select
                            label='Document Type'
                            {...register('documentType')}
                            error={!!errors.documentType}
                            defaultValue=''
                        >
                            <MenuItem value='DNI'>DNI</MenuItem>
                            <MenuItem value='Passport'>Passport</MenuItem>
                            <MenuItem value='Driver License'>
                                Driver License
                            </MenuItem>
                        </Select>
                        <Typography variant='body2' color='error'>
                            {errors.documentType?.message}
                        </Typography>
                    </FormControl>
                    <TextField
                        label='Document Number'
                        fullWidth
                        margin='normal'
                        {...register('documentNumber')}
                        error={!!errors.documentNumber}
                        helperText={errors.documentNumber?.message}
                    />
                    <TextField
                        label='Email'
                        fullWidth
                        margin='normal'
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <FormControl fullWidth margin='normal'>
                        <Controller
                            control={control}
                            name='reservationDate'
                            defaultValue={dayjs().add(1, 'hour')}
                            render={({ field }) => (
                                <MobileDateTimePicker
                                    {...field}
                                    label='Reservation Date'
                                    value={field.value || null}
                                    views={['year', 'day', 'hours', 'minutes']}
                                    onChange={(date: Dayjs | null) => {
                                        return field.onChange(date);
                                    }}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.reservationDate,
                                            helperText:
                                                errors.reservationDate?.message,
                                        },
                                    }}
                                    arial-label='reservation date'
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>Reservation Type</InputLabel>
                        <Select
                            label='Reservation Type'
                            {...register('reservationType')}
                            error={!!errors.reservationType}
                            defaultValue=''
                        >
                            <MenuItem value='Dinner'>Dinner</MenuItem>
                            <MenuItem value='Lunch'>Lunch</MenuItem>
                            <MenuItem value='Birthday'>Birthday</MenuItem>
                            <MenuItem value='Special Occasion'>
                                Special Occasion
                            </MenuItem>
                            <MenuItem value='Dinner parties'>
                                Dinner parties
                            </MenuItem>
                        </Select>
                        <Typography variant='body2' color='error'>
                            {errors.reservationType?.message}
                        </Typography>
                    </FormControl>
                    <TextField
                        label='Number of People'
                        type='number'
                        fullWidth
                        margin='normal'
                        {...register('numberOfPeople', { valueAsNumber: true })}
                        error={!!errors.numberOfPeople}
                        helperText={errors.numberOfPeople?.message}
                        defaultValue={1}
                    />
                    <TextField
                        label='Description / Observations'
                        fullWidth
                        multiline
                        rows={4}
                        margin='normal'
                        {...register('description')}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Create Reservation
                    </Button>
                </Container>
            </Container>
        </Layout>
    );
};
