-- CreateEnum
CREATE TYPE "whatsappMessageStatus" AS ENUM ('queued', 'sending', 'sent', 'failed', 'delivered', 'undelivered', 'receiving', 'received', 'read');

-- CreateTable
CREATE TABLE "whatsapp_messages" (
    "id" SERIAL NOT NULL,
    "sid" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "numberPhone" VARCHAR(12) NOT NULL,
    "message" TEXT NOT NULL,
    "sourceService" TEXT NOT NULL DEFAULT E'undefined',
    "statusMessage_twilio" "whatsappMessageStatus" NOT NULL DEFAULT E'sending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whatsapp_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_messages_sid_key" ON "whatsapp_messages"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_messages_uuid_key" ON "whatsapp_messages"("uuid");
