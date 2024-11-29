import axios, { AxiosResponse } from 'axios';
const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

export interface ReservationData {
    id?: string;
    status?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'COMPLETED';
    firstName: string;
    lastName: string;
    documentType: 'DNI' | 'Passport' | 'Driver License';
    documentNumber: string;
    email: string;
    reservationDate: string;
    reservationType:
        | 'Dinner'
        | 'Lunch'
        | 'Birthday'
        | 'Special Occasion'
        | 'dinner parties';
    numberOfPeople: number;
    description?: string;
}

interface ReservationUpdateData {
    reservationDate?: string;
    reservationType?: string;
    numberOfPeople?: number;
    description?: string;
    status?: string;
}

export const createReservationService = async (data: ReservationData) => {
    return axios.post(`${API_URL}/reservations`, data);
};

export const getAllReservationsService = async (): Promise<
    ReservationData[]
> => {
    try {
        const response: AxiosResponse<ReservationData[]> = await axios.get(
            `${API_URL}/reservations`
        );
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching reservations:', error);
        throw new Error('Failed to fetch reservations');
    }
};

export const getReservationByIdService = async (id: string) => {
    return axios.get(`${API_URL}/reservations/${id}`);
};

export const updateReservationService = async (
    id: string,
    data: ReservationUpdateData
) => {
    console.log('updateReservationService', id, data);
    return axios.put(`${API_URL}/reservations/${id}/update`, data);
};

export const deleteReservationService = async (id: string) => {
    return axios.delete(`${API_URL}/reservations/${id}`);
};
