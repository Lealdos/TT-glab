import { AxiosResponse } from 'axios';
import {axiosInstance} from './axiosConfig';
import { z } from 'zod';
import {
    StatusSchema,
    DocumentTypeSchema,
    ReservationTypeSchema,
} from '../utils/ValidationSchema';



export type ReservationData = {
    id?: string;
    status: z.infer<typeof StatusSchema>;
    firstName: string;
    lastName: string;
    documentType: z.infer<typeof DocumentTypeSchema>;
    documentNumber: string;
    email: string;
    reservationDate: string;
    reservationType: z.infer<typeof ReservationTypeSchema>;
    numberOfPeople: number;
    description?: string;
};

interface ReservationUpdateData {
    reservationDate?: string;
    reservationType?: string;
    numberOfPeople?: number;
    description?: string;
    status?: string;
}

export const createReservationService = async (data: ReservationData) => {
    return axiosInstance.post(`/reservations`, data);
};

export const getAllReservationsService = async (): Promise<
    ReservationData[]
> => {
    try {
        const response: AxiosResponse<ReservationData[]> = await axiosInstance.get(
            `/reservations`
        );
        return response.data;
    } catch (error: unknown) {
        console.error('Error fetching reservations:', error);
        throw new Error('Failed to fetch reservations');
    }
};

export const getReservationByIdService = async (id: string) => {
    return axiosInstance.get(`/reservations/${id}`);
};

export const updateReservationService = async (
    id: string,
    data: ReservationUpdateData
) => {
    console.log('updateReservationService', id, data);
    return axiosInstance.put(`/reservations/${id}/update`, data);
};

export const deleteReservationService = async (id: string) => {
    return axiosInstance.delete(`/reservations/${id}`);
};
