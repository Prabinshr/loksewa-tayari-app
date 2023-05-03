/*
  Warnings:

  - You are about to drop the column `expiration` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `usedCount` on the `Coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "expiration",
DROP COLUMN "usedCount";
