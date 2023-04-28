-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PUBLISHED', 'UNPUBLISHED');

-- CreateTable
CREATE TABLE "SewaService" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" "STATUS" NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SewaService_pkey" PRIMARY KEY ("id")
);
