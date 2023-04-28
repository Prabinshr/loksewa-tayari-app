-- CreateEnum
CREATE TYPE "QSN_TYPE" AS ENUM ('PAID', 'FREE', 'TRIAL');

-- CreateTable
CREATE TABLE "QuestionSet" (
    "id" SERIAL NOT NULL,
    "type" "QSN_TYPE" NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "QuestionSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionSet" ADD CONSTRAINT "QuestionSet_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "SubStrTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
