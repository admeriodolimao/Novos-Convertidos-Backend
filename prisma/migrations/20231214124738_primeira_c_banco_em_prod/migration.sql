-- CreateTable
CREATE TABLE "NovoConvertido" (
    "id" SERIAL NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "statusRelacionamento" TEXT NOT NULL,
    "jaTeveOutraReligiao" TEXT NOT NULL,

    CONSTRAINT "NovoConvertido_pkey" PRIMARY KEY ("id")
);
