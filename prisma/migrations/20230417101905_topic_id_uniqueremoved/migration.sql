-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_qsn_set_id_fkey";

-- DropIndex
DROP INDEX "QuestionSet_topic_id_key";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_qsn_set_id_fkey" FOREIGN KEY ("qsn_set_id") REFERENCES "QuestionSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
