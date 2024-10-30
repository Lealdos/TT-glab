import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import {
    getAllReservationsService,
    ReservationData,
} from '../services/reservationService';

const columns: GridColDef[] = [
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (value, row) =>
            `${row.firstName || ''} ${row.lastName || ''}`,
    },
    { field: 'documentType', headerName: 'Document Type', width: 150 },
    { field: 'documentNumber', headerName: 'Document Number', width: 150 },
    { field: 'reservationDate', headerName: 'Reservation date', width: 200 },
    { field: 'reservationType', headerName: 'Reservation type', width: 200 },
    { field: 'numberOfPeople', headerName: 'Number of people', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
        field: 'description',
        headerName: 'Description',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200,
        valueGetter: (value, row) => `${row.description || ''} `,
    },
];

const paginationModel = { page: 0, pageSize: 5 };
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
        <Paper sx={{ height: 400, width: '100%', margin: 'auto', padding: 1 }}>
            <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
            {reservations && (
                <DataGrid
                    rows={reservations}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 2 }}
                />
            )}
        </Paper>
    );
};
