import axios from 'axios';

const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000';

interface ReservationData {
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

export const createReservationService = async (data: ReservationData) => {
    return axios.post(`${API_URL}/reservations`, data);
};
