/*
  Warnings:

  - A unique constraint covering the columns `[topic_id]` on the table `QuestionSet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_qsn_set_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "QuestionSet_topic_id_key" ON "QuestionSet"("topic_id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_qsn_set_id_fkey" FOREIGN KEY ("qsn_set_id") REFERENCES "QuestionSet"("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE;
