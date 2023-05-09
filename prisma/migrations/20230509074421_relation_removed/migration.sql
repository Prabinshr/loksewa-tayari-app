/*
  Warnings:

  - You are about to drop the column `subserviceTitle` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubService" DROP CONSTRAINT "SubService_title_fkey";

-- DropIndex
DROP INDEX "User_subserviceTitle_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subserviceTitle";
