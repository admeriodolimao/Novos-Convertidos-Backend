/*
  Warnings:

  - You are about to drop the column `Nome` on the `NovoConvertido` table. All the data in the column will be lost.
  - Added the required column `name` to the `NovoConvertido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NovoConvertido" DROP COLUMN "Nome",
ADD COLUMN     "name" TEXT NOT NULL;
