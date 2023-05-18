/*
  Warnings:

  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExamCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExamCategory" DROP CONSTRAINT "ExamCategory_exam_id_fkey";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "ExamCategory";
