// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

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
  await prisma.user.deleteMany();
  console.log('All users deleted');

  const usersFilePath = path.join(__dirname, 'seed-data', 'users.csv');
  const users = await readCSV(usersFilePath);

  const userRecords = await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          role: user.role as 'ADMIN' | 'CLIENT',
        },
      }),
    ),
  );

  console.log(`Usuarios creados: ${userRecords.length}`);

  // Clearing reservations before batch insertion
  await prisma.reservation.deleteMany();
  console.log('All reservations deleted');

  const reservationsFilePath = path.join(
    __dirname,
    'seed-data',
    'reservations.csv',
  );
  const reservations = await readCSV(reservationsFilePath);

  const reservationPromises = reservations.map(async (reservation) => {
    const userId = parseInt(reservation.userId, 10);

    // Making sure that the user exists for the reservation
    const user = userRecords.find((u) => u.id === userId);
    if (!user) {
      console.log(
        `No user found for reservation: ${reservation.firstName} ${reservation.lastName}`,
      );
      return;
    }

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
          connect: { id: user.id },
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
