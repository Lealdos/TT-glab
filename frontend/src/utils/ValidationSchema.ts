import { z } from 'zod';

export const StatusSchema = z.enum([
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'CANCELED',
    'COMPLETED',
]);

export const DocumentTypeSchema = z.enum(['DNI', 'Passport', 'Driver License']);

export const ReservationTypeSchema = z.enum([
    'Dinner',
    'Lunch',
    'Birthday',
    'Special Occasion',
    'Dinner parties',
]);
