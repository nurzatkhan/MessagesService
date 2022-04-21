-- CreateEnum
CREATE TYPE "whatsappMessageStatus" AS ENUM ('queued', 'sending', 'sent', 'failed', 'delivered', 'undelivered', 'receiving', 'received', 'read');

-- CreateTable
CREATE TABLE "whatsapp__messengs" (
    "id" SERIAL NOT NULL,
    "sid" TEXT NOT NULL,
    "number" VARCHAR(63) NOT NULL,
    "message" TEXT NOT NULL,
    "message_status" "whatsappMessageStatus" NOT NULL DEFAULT E'sending',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whatsapp__messengs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp__messengs_sid_key" ON "whatsapp__messengs"("sid");
