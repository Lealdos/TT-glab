import React, { useEffect, useState } from 'react';

import {
    getAllReservationsService,
    ReservationData,
} from '../services/reservationService';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import dayjs from 'dayjs';
import { ReservationModal } from '../components/ModalReservation';
import { Layout } from '../components/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Dashboard: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationData[] | null>(
        []
    );
    const [openModal, setOpenModal] = useState(false);
    const [selectedReservation, setSelectedReservation] =
        useState<ReservationData | null>(null);

    const handleRowClick = (reservation: ReservationData) => {
        setSelectedReservation(reservation);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedReservation(null);
        setOpenModal(false);
    };
    useEffect(() => {
        const fetchReservations = async () => {
            const ReservationData = await getAllReservationsService();
            setReservations(ReservationData);
        };
        fetchReservations();
    }, [reservations]);

    const handleToast = (
        message: string,
        type: 'success' | 'error' | 'info'
    ) => {
        toast(message, {
            type,
            position: 'bottom-right',
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            autoClose: 6000,
        });
    };

    return (
        <Layout>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background:
                        ' linear-gradient(108deg, rgba(253,187,45,1) 0%, rgba(253,187,45,1) 0%, rgba(34,132,195,1) 100%, rgba(0,0,0,1) 100%);',
                    borderRadius: 5,
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                }}
            >
                <TableContainer component={Container} sx={{ borderRadius: 5 }}>
                    <Table aria-label='reservations table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full name</TableCell>
                                <TableCell>Document Type</TableCell>
                                <TableCell>Document number</TableCell>
                                <TableCell align='center'>Email</TableCell>
                                <TableCell>Date of reservation</TableCell>
                                <TableCell>Number of people</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations?.map((reservation) => (
                                <TableRow
                                    sx={{
                                        ':hover': {
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.08)',
                                        },
                                        cursor: 'pointer',
                                        color: 'white',
                                    }}
                                    key={reservation.id}
                                    onClick={() => handleRowClick(reservation)}
                                >
                                    <TableCell component='th' scope='row'>
                                        {reservation.firstName}{' '}
                                        {reservation.lastName}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {reservation.documentType}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {reservation.documentNumber}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {reservation.email}
                                    </TableCell>
                                    <TableCell>
                                        {dayjs(
                                            reservation.reservationDate
                                        ).format('MM/DD/YYYY hh:mm A')}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {reservation.numberOfPeople}
                                    </TableCell>
                                    <TableCell>{reservation.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {selectedReservation && (
                    <ReservationModal
                        open={openModal}
                        onClose={handleCloseModal}
                        reservation={selectedReservation}
                        handleToast={handleToast}
                    />
                )}
            </Container>
        </Layout>
    );
};
