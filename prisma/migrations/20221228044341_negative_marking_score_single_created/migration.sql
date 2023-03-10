/*
  Warnings:

  - You are about to drop the column `negative_marking` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "negative_marking",
ALTER COLUMN "negative_mark_value" SET DEFAULT 0;
