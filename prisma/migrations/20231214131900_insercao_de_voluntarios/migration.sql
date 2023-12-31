-- CreateTable
CREATE TABLE "Voluntarios" (
    "id" SERIAL NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(63) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "cpfCnpj" VARCHAR(127) NOT NULL,
    "mobilePhone" VARCHAR(12) NOT NULL DEFAULT 'mobilePhone',
    "phone" VARCHAR(12) NOT NULL,
    "company" VARCHAR(50) NOT NULL,
    "postalCode" VARCHAR(9) NOT NULL DEFAULT 'postalCode',
    "address" VARCHAR(250) NOT NULL,
    "state" VARCHAR(250) NOT NULL,
    "province" VARCHAR(250) NOT NULL DEFAULT 'province',
    "city" VARCHAR(50) NOT NULL,
    "addressNumber" VARCHAR(5) NOT NULL,
    "complement" VARCHAR(250) NOT NULL DEFAULT 'complement',
    "municipalInscription" VARCHAR(50) NOT NULL DEFAULT 'municipalinscription',
    "stateInscription" VARCHAR(50) NOT NULL DEFAULT 'stateinscription',
    "additionalEmails" VARCHAR(250) NOT NULL DEFAULT 'additionalEmails',
    "observations" VARCHAR(250) NOT NULL DEFAULT 'observations',
    "birthAt" TIMESTAMP(0),
    "role" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSMSVerified" TEXT NOT NULL DEFAULT 'false',
    "emailVerificationCode" VARCHAR(5) NOT NULL DEFAULT '12345',
    "SMSVerificationCode" VARCHAR(5) NOT NULL DEFAULT '12345',
    "forgetVerificationCode" VARCHAR(5) NOT NULL DEFAULT '12345',

    CONSTRAINT "Voluntarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voluntarios_email_key" ON "Voluntarios"("email");
