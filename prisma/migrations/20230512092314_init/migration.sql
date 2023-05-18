/*
  Warnings:

  - You are about to drop the column `exam_id` on the `ExamCategory` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `ExamSet` table. All the data in the column will be lost.
  - You are about to drop the column `examSetId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `examSet_id` to the `ExamCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `ExamSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subService_id` to the `ExamSet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LEVEL" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropForeignKey
ALTER TABLE "ExamCategory" DROP CONSTRAINT "ExamCategory_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "ExamSet" DROP CONSTRAINT "ExamSet_examId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_examSetId_fkey";

-- AlterTable
ALTER TABLE "ExamCategory" DROP COLUMN "exam_id",
ADD COLUMN     "examSet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExamSet" DROP COLUMN "examId",
ADD COLUMN     "level" "LEVEL" NOT NULL,
ADD COLUMN     "negative_mark_value" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "subService_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "examSetId";

-- DropTable
DROP TABLE "Exam";

-- CreateTable
CREATE TABLE "ExamQuestion" (
    "id" TEXT NOT NULL,
    "examCategory_id" TEXT NOT NULL,
    "syllabusStr" TEXT NOT NULL,
    "syllabusSubStr" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "correct_ans" TEXT NOT NULL,
    "explaination" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "refreshTokenHash_user_id_idx" ON "refreshTokenHash"("user_id");

-- CreateIndex
CREATE INDEX "refreshTokenHash_token_hash_idx" ON "refreshTokenHash"("token_hash");

-- AddForeignKey
ALTER TABLE "ExamSet" ADD CONSTRAINT "ExamSet_subService_id_fkey" FOREIGN KEY ("subService_id") REFERENCES "SubService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamCategory" ADD CONSTRAINT "ExamCategory_examSet_id_fkey" FOREIGN KEY ("examSet_id") REFERENCES "ExamSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamQuestion" ADD CONSTRAINT "ExamQuestion_examCategory_id_fkey" FOREIGN KEY ("examCategory_id") REFERENCES "ExamCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
