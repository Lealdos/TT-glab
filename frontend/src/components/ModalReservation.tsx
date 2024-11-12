import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Slide,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import dayjs from 'dayjs';
import { ReservationData } from '../services/reservationService';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

type ReservationModalProps = {
    open: boolean;
    onClose: () => void;
    reservation: ReservationData | null;
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
    if (!reservation) return null;

    const handleSave = () => {
        handleToast('Reservation saved successfully', 'success');
        onClose();
    };
    const handleClose = () => {
        handleToast('Reservation cancelled', 'error');
        onClose();
    };

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
                    background:
                        'linear-gradient(108deg, rgba(253,187,45,1) 0%, rgba(253,187,45,1) 0%, rgba(34,132,195,1) 100%, rgba(0,0,0,1) 100%)',
                },
            }}
        >
            <DialogTitle>Reservation Details</DialogTitle>
            <DialogContent dividers>
                <Typography variant='body1'>
                    <strong>Full name:</strong> {reservation.firstName}{' '}
                    {reservation.lastName}
                </Typography>
                <Typography variant='body1'>
                    <strong>Document Type:</strong> {reservation.documentType}
                </Typography>
                <Typography variant='body1'>
                    <strong>Document Number:</strong>{' '}
                    {reservation.documentNumber}
                </Typography>
                <Typography variant='body1'>
                    <strong>Email:</strong> {reservation.email}
                </Typography>
                <Typography variant='body1'>
                    <strong>Reservation Date:</strong>{' '}
                    {dayjs(reservation.reservationDate).format(
                        'MM/DD/YYYY hh:mm A'
                    )}
                </Typography>
                <Typography variant='body1'>
                    <strong>Reservation Type:</strong>{' '}
                    {reservation.reservationType}
                </Typography>
                <Typography variant='body1'>
                    <strong>Number of People:</strong>{' '}
                    {reservation.numberOfPeople}
                </Typography>
                {reservation.description && (
                    <Typography variant='body1'>
                        <strong>Description:</strong> {reservation.description}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleClose} color='error'>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};
