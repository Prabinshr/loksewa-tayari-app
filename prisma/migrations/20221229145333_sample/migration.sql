/*
  Warnings:

  - Made the column `created_at` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Quiz_Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Quiz_Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `User_Progress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `User_Progress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quiz_Category" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "User_Progress" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
