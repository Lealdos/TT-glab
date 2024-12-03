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
  await prisma.role.deleteMany();
  console.log('All roles deleted');
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
        },
      }),
    ),
  );
  console.log(`Usuarios creados: ${userRecords.length}`);

  // Cargar y crear roles desde roles.csv
  const rolesFilePath = path.join(__dirname, 'seed-data', 'roles.csv');
  const roles = await readCSV(rolesFilePath);

  const rolePromises = roles.map(async (role) => {
    const user = userRecords.find((u) => u.id === role.userId);

    if (!user) {
      console.error(`Usuario no encontrado para el rol: ${role.userId}`);
      return null;
    }

    return prisma.role.create({
      data: {
        id: role.id || undefined,
        userId: role.userId,
        role: role.role as 'ADMIN' | 'CLIENT', // Enum de Prisma
      },
    });
  });

  const createdRoles = await Promise.all(rolePromises);
  console.log(`Roles creados: ${createdRoles.filter(Boolean).length}`);

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
          | 'Passport'
          | 'Driver License',
        documentNumber: reservation.documentNumber,
        email: reservation.email,
        reservationDate: new Date(reservation.reservationDate),
        reservationType: reservation.reservationType as
          | 'Dinner'
          | 'Lunch'
          | 'Birthday'
          | 'Special Occasion'
          | 'Dinner parties',
        numberOfPeople: parseInt(reservation.numberOfPeople, 10),
        description: reservation.description,
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
