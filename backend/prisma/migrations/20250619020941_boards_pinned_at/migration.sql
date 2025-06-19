/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "updatedAt",
ADD COLUMN     "pinnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
