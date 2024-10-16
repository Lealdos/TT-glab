import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsEnum,
  Min,
  IsUUID,
} from 'class-validator';
import { Reservation } from '@prisma/client';
import { UUID } from 'crypto';

export class CreateReservationDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(['DNI', 'Passport', 'Driver License'])
  documentType: string;

  @IsString()
  documentNumber: string;

  @IsString()
  email: string;

  @IsDateString()
  reservationDate: string;

  @IsEnum(['Dinner', 'Lunch', 'Birthday', 'Special Occasion', 'dinner parties'])
  reservationType: Reservation['reservationType'];

  @IsNumber()
  @Min(1)
  numberOfPeople: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  userId: UUID;
}
