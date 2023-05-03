/*
  Warnings:

  - Added the required column `maxUses` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "maxUses" INTEGER NOT NULL,
ADD COLUMN     "usedCount" INTEGER NOT NULL DEFAULT 0;
