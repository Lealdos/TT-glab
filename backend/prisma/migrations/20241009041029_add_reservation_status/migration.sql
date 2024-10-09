-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
