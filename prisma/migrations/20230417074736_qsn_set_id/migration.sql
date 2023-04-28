/*
  Warnings:

  - Added the required column `qsn_set_id` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "qsn_set_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_qsn_set_id_fkey" FOREIGN KEY ("qsn_set_id") REFERENCES "QuestionSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
