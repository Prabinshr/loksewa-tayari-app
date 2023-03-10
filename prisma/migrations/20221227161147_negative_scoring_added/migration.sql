/*
  Warnings:

  - Added the required column `negative_mark_value` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `negative_marking` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `negative_score` to the `User_Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "negative_mark_value" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "negative_marking" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User_Progress" ADD COLUMN     "negative_score" DOUBLE PRECISION NOT NULL;
