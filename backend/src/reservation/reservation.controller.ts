import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation, Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('reservations')
// @UseGuards(JwtAuthGuard, RolesGuard) // Proteger todas las rutas con autenticación y autorización
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Crear una nueva reserva (solo administradores)
  @Post()
  async createReservation(
    @Body()
    reservationData: {
      firstName: string;
      lastName: string;
      documentType: string;
      documentNumber: string;
      email: string;
      reservationDate: string;
      reservationType: string;
      numberOfPeople: number;
      description?: string;
      userId: string;
    },
  ): Promise<Reservation> {
    return this.reservationService.createReservation({
      reservationDate: new Date(reservationData.reservationDate),
      reservationType: reservationData.reservationType,
      numberOfPeople: reservationData.numberOfPeople,
      description: reservationData.description,
      firstName: reservationData.firstName,
      lastName: reservationData.lastName,
      documentType: reservationData.documentType,
      documentNumber: reservationData.documentNumber,
      email: reservationData.email,
      user: { connect: { id: reservationData.userId } },
    });
  }

  // Obtener todas las reservas (accesible para usuarios y administradores)
  @Get()
  @Roles(Role.ADMIN, Role.CLIENT)
  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationService.getAllReservations();
  }

  // Obtener una reserva por ID (accesible para usuarios y administradores)
  @Get(':id')
  @Roles(Role.ADMIN, Role.CLIENT)
  async getReservationById(
    @Param('id') id: string,
  ): Promise<Reservation | null> {
    return this.reservationService.getReservationById(id);
  }

  // Actualizar una reserva (solo administradores)
  @Put(':id')
  @Roles(Role.ADMIN, Role.CLIENT)
  async updateReservation(
    @Param('id') id: string,
    @Body()
    updateData: {
      reservationDate?: string;
      reservationType?: string;
      numberOfPeople?: number;
      description?: string;
    },
  ): Promise<Reservation> {
    return this.reservationService.updateReservation(id, {
      reservationDate: updateData.reservationDate
        ? new Date(updateData.reservationDate)
        : undefined,
      reservationType: updateData.reservationType,
      numberOfPeople: updateData.numberOfPeople,
      description: updateData.description,
    });
  }

  // Eliminar una reserva (solo administradores)
  @Delete(':id')
  @Roles(Role.ADMIN, Role.CLIENT)
  async deleteReservation(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.deleteReservation(id);
  }
}
