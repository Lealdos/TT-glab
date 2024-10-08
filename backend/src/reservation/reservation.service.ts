import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Reservation } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear una nueva reserva en la base de datos.
   * @param data Datos de la nueva reserva (reservationDate, reservationType, numberOfPeople, description, userId)
   * @returns La reserva creada.
   */
  async createReservation(
    data: Prisma.ReservationCreateInput,
  ): Promise<Reservation> {
    return this.prisma.reservation.create({
      data,
    });
  }

  /**
   * Obtener todas las reservas de la base de datos.
   * @returns Lista de todas las reservas.
   */
  async getAllReservations(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      include: {
        user: true,
      },
    });
  }

  /**
   * Obtener una reserva específica por su ID.
   * @param id ID de la reserva a buscar.
   * @returns La reserva si se encuentra, o lanza un error NotFoundException si no se encuentra.
   */
  async getReservationById(id: string): Promise<Reservation | null> {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true, // Incluir la información del usuario relacionado
      },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found.`);
    }

    return reservation;
  }

  /**
   * Actualizar una reserva existente en la base de datos.
   * @param id ID de la reserva a actualizar.
   * @param data Datos a actualizar (reservationDate, reservationType, numberOfPeople, description).
   * @returns La reserva actualizada.
   */
  async updateReservation(
    id: string,
    data: Prisma.ReservationUpdateInput,
  ): Promise<Reservation> {
    const reservationExists = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservationExists) {
      throw new NotFoundException(`Reservation with ID ${id} not found.`);
    }

    return this.prisma.reservation.update({
      where: { id },
      data,
    });
  }

  /**
   * Eliminar una reserva de la base de datos.
   * @param id ID de la reserva a eliminar.
   * @returns La reserva eliminada.
   */
  async deleteReservation(id: string): Promise<Reservation> {
    const reservationExists = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservationExists) {
      throw new NotFoundException(`Reservation with ID ${id} not found.`);
    }

    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}
