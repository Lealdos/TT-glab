import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Slide,
    Select,
    MenuItem,
    useMediaQuery,
    useTheme,
    FormHelperText,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { TransitionProps } from '@mui/material/transitions';
import { useReservationForm } from '../hooks/useUpdateReservationForm';
import { ReservationData } from '../services/reservationService';
import {
    StatusSchema,
    DocumentTypeSchema,
    ReservationTypeSchema,
} from '../utils/ValidationSchema';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

type ReservationModalProps = {
    open: boolean;
    onClose: () => void;
    reservation: ReservationData;
    handleToast: (message: string, type: 'success' | 'error') => void;
};

export const ReservationModal: React.FC<ReservationModalProps> = ({
    open,
    onClose,
    reservation,
    handleToast,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const statusOptions = StatusSchema.options.map((value) => ({
        value,
        label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    }));

    const documentTypeOptions = DocumentTypeSchema.options.map((value) => ({
        value,
        label: value,
    }));

    const reservationTypeOptions = ReservationTypeSchema.options.map(
        (value) => ({
            value,
            label: value,
        })
    );

    const { control, handleSubmit, errors, onSubmit } = useReservationForm({
        reservation,
        handleToast,
        onClose,
    });

    if (!reservation) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby='reservation-modal-description'
            fullScreen={isMobile}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '600px',
                    margin: isMobile ? 0 : 'auto',
                    borderRadius: isMobile ? 0 : 3,
                },
            }}
        >
            <DialogTitle>Edit Reservation</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    <Controller
                        name='firstName'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='First Name'
                                fullWidth
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                margin='normal'
                            />
                        )}
                    />
                    <Controller
                        name='lastName'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Last Name'
                                fullWidth
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                margin='normal'
                            />
                        )}
                    />
                    <Controller
                        name='email'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Email'
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                margin='normal'
                            />
                        )}
                    />
                    <Controller
                        name='status'
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                sx={{ marginTop: 2 }}
                                error={!!errors.status}
                            >
                                <InputLabel>Status</InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    displayEmpty
                                    label='Status'
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {!!errors.status && (
                                    <FormHelperText>
                                        {errors.status.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <Controller
                        name='reservationDate'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Reservation Date'
                                type='datetime-local'
                                fullWidth
                                error={!!errors.reservationDate}
                                helperText={
                                    errors.reservationDate?.message ?? ''
                                }
                                margin='normal'
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        )}
                    />
                    <Controller
                        name='documentType'
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                sx={{ marginTop: 2 }}
                                error={!!errors.documentType}
                            >
                                <InputLabel>Document Type</InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    error={!!errors.documentType}
                                    displayEmpty
                                    label='Document Type'
                                >
                                    {documentTypeOptions.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {!!errors.documentType && (
                                    <FormHelperText>
                                        {errors.documentType.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name='documentNumber'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Document Number'
                                fullWidth
                                error={!!errors.documentNumber}
                                helperText={errors.documentNumber?.message}
                                margin='normal'
                            />
                        )}
                    />
                    <Controller
                        name='reservationType'
                        control={control}
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                sx={{ marginTop: 2 }}
                                error={!!errors.reservationType}
                            >
                                <InputLabel>Reservation Type</InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    error={!!errors.reservationType}
                                    displayEmpty
                                    label='Reservation Type'
                                >
                                    {reservationTypeOptions.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.reservationType && (
                                    <FormHelperText>
                                        {errors.reservationType.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <Controller
                        name='numberOfPeople'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Number of People'
                                type='number'
                                fullWidth
                                error={!!errors.numberOfPeople}
                                helperText={errors.numberOfPeople?.message}
                                margin='normal'
                            />
                        )}
                    />
                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label='Description'
                                fullWidth
                                multiline
                                rows={4}
                                margin='normal'
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color='error'>
                        Cancel
                    </Button>
                    <Button type='submit'>Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
