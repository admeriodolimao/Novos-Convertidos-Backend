/*
  Warnings:

  - You are about to drop the column `dataCriacao` on the `Voluntarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NovoConvertido" ADD COLUMN     "voluntarioRelacionadoId" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Voluntarios" DROP COLUMN "dataCriacao";

-- AddForeignKey
ALTER TABLE "NovoConvertido" ADD CONSTRAINT "NovoConvertido_voluntarioRelacionadoId_fkey" FOREIGN KEY ("voluntarioRelacionadoId") REFERENCES "Voluntarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
