import React from 'react';
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    Typography,
    InputLabel,
    FormControl,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useReservationViewModel } from '../viewModels/useReservationViewModel';

export const Reservation: React.FC = () => {
    const { register, handleSubmit, errors, submitError, onSubmit } =
        useReservationViewModel();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 8,
            }}
        >
            <Typography variant='h4' component='h1' gutterBottom>
                Create a Reservation
            </Typography>
            {submitError && (
                <Typography variant='body1' color='error' gutterBottom>
                    {submitError}
                </Typography>
            )}
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
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
                    width: '500px',
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
                    <DatePicker
                        label='Reservation Date'
                        {...register('reservationDate')}
                        onChange={() => {}}
                        slotProps={{
                            textField: {
                                error: !!errors.reservationDate,
                                helperText: errors.reservationDate?.message,
                            },
                        }}
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
            </Box>
        </Box>
    );
};
