import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function readCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(
        parse({
          columns: true,
          delimiter: ',',
          trim: true,
          skip_empty_lines: true,
        }),
      )
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function main() {
  await prisma.reservation.deleteMany();
  console.log('All reservations deleted');
  await prisma.user.deleteMany();
  console.log('All users deleted');

  const usersFilePath = path.join(__dirname, 'seed-data', 'users.csv');
  const users = await readCSV(usersFilePath);

  const userRecords = await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: {
          id: user.id || undefined,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: bcrypt.hashSync(user.password, 10),
          role: user.role as 'ADMIN' | 'CLIENT',
        },
      }),
    ),
  );
  console.log(`Usuarios creados: ${userRecords.length}`);

  const reservationsFilePath = path.join(
    __dirname,
    'seed-data',
    'reservations.csv',
  );
  const reservations = await readCSV(reservationsFilePath);

  const reservationPromises = reservations.map(async (reservation) => {
    const user = userRecords.find(
      (u) => u.email === reservation.email || u.id === reservation.userId,
    );

    if (!user) {
      console.error(
        `Usuario no encontrado para la reserva: ${reservation.email} (userId: ${reservation.userId})`,
      );
      return null;
    }

    console.log(
      `Creando reserva para el usuario con ID: ${user.id} (${user.email})`,
    );

    return prisma.reservation.create({
      data: {
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        documentType: reservation.documentType as
          | 'DNI'
          | 'PASSPORT'
          | 'DRIVER_LICENSE',
        documentNumber: reservation.documentNumber,
        email: reservation.email,
        reservationDate: new Date(reservation.reservationDate),
        reservationType: reservation.reservationType as
          | 'DINNER'
          | 'LUNCH'
          | 'BIRTHDAY'
          | 'SPECIAL_OCCASION',
        numberOfPeople: parseInt(reservation.numberOfPeople, 10),
        description: reservation.description,
        user: {
          connect: { id: user.id }, // Conectar la reserva al usuario encontrado
        },
      },
    });
  });

  const createdReservations = await Promise.all(reservationPromises);
  console.log(
    `Reservas creadas: ${createdReservations.filter(Boolean).length}`,
  );
}

main()
  .then(() => {
    console.log('Datos de prueba insertados correctamente.');
  })
  .catch((e) => {
    console.error('Error insertando datos de prueba:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
