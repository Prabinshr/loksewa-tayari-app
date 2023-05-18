/*
  Warnings:

  - You are about to drop the column `remainingDays` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionDate` on the `Package` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "remainingDays",
DROP COLUMN "subscriptionDate";
