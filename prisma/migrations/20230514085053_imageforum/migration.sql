/*
  Warnings:

  - You are about to drop the column `description` on the `SewaService` table. All the data in the column will be lost.
  - Added the required column `title` to the `SewaService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "SewaService" DROP COLUMN "description",
ADD COLUMN     "title" TEXT NOT NULL;
