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

export const Dashboard: React.FC = () => {
    const [reservations, setReservations] = useState<ReservationData[] | null>(
        []
    );
    useEffect(() => {
        const fetchReservations = async () => {
            const ReservationData = await getAllReservationsService();
            setReservations(ReservationData);
        };
        fetchReservations();
    }, []);
    return (
        <TableContainer
            component={Container}
            sx={{ borderRadius: 5, backgroundColor: 'grey' }}
        >
            <Table aria-label='reservations table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Full name</TableCell>
                        <TableCell>Document number</TableCell>
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
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                            key={reservation.id}
                            onClick={() => {
                                console.log(reservation.id);
                            }}
                        >
                            <TableCell component='th' scope='row'>
                                {reservation.firstName} {reservation.lastName}
                            </TableCell>
                            <TableCell>{reservation.documentNumber}</TableCell>
                            <TableCell>
                                {dayjs(reservation.reservationDate).format(
                                    'MM/DD/YYYY hh:mm A'
                                )}
                            </TableCell>
                            <TableCell>{reservation.numberOfPeople}</TableCell>
                            <TableCell>{reservation.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
