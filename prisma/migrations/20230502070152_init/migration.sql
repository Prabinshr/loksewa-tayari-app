/*
  Warnings:

  - The primary key for the `QuestionSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SewaService` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubService` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubStrTopic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubserviceHasSyllabus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SyllabusStructure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SyllabusSubStructure` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_qsn_set_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionSet" DROP CONSTRAINT "QuestionSet_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "SubService" DROP CONSTRAINT "SubService_sewaService_id_fkey";

-- DropForeignKey
ALTER TABLE "SubStrTopic" DROP CONSTRAINT "SubStrTopic_sub_struct_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "SubserviceHasSyllabus" DROP CONSTRAINT "SubserviceHasSyllabus_service_id_fkey";

-- DropForeignKey
ALTER TABLE "SubserviceHasSyllabus" DROP CONSTRAINT "SubserviceHasSyllabus_syllabus_sub_structure_id_fkey";

-- DropForeignKey
ALTER TABLE "SyllabusSubStructure" DROP CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "qsn_set_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "QuestionSet" DROP CONSTRAINT "QuestionSet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "topic_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "QuestionSet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "QuestionSet_id_seq";

-- AlterTable
ALTER TABLE "SewaService" DROP CONSTRAINT "SewaService_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SewaService_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SewaService_id_seq";

-- AlterTable
ALTER TABLE "SubService" DROP CONSTRAINT "SubService_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sewaService_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubService_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubService_id_seq";

-- AlterTable
ALTER TABLE "SubStrTopic" DROP CONSTRAINT "SubStrTopic_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sub_struct_topic_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubStrTopic_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubStrTopic_id_seq";

-- AlterTable
ALTER TABLE "SubserviceHasSyllabus" DROP CONSTRAINT "SubserviceHasSyllabus_pkey",
ALTER COLUMN "service_id" SET DATA TYPE TEXT,
ALTER COLUMN "syllabus_sub_structure_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubserviceHasSyllabus_pkey" PRIMARY KEY ("service_id");

-- AlterTable
ALTER TABLE "SyllabusStructure" DROP CONSTRAINT "SyllabusStructure_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SyllabusStructure_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SyllabusStructure_id_seq";

-- AlterTable
ALTER TABLE "SyllabusSubStructure" DROP CONSTRAINT "SyllabusSubStructure_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "syllabus_structure_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SyllabusSubStructure_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SyllabusSubStructure_id_seq";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_qsn_set_id_fkey" FOREIGN KEY ("qsn_set_id") REFERENCES "QuestionSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubService" ADD CONSTRAINT "SubService_sewaService_id_fkey" FOREIGN KEY ("sewaService_id") REFERENCES "SewaService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubserviceHasSyllabus" ADD CONSTRAINT "SubserviceHasSyllabus_syllabus_sub_structure_id_fkey" FOREIGN KEY ("syllabus_sub_structure_id") REFERENCES "SyllabusSubStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubserviceHasSyllabus" ADD CONSTRAINT "SubserviceHasSyllabus_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "SubService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllabusSubStructure" ADD CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey" FOREIGN KEY ("syllabus_structure_id") REFERENCES "SyllabusStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubStrTopic" ADD CONSTRAINT "SubStrTopic_sub_struct_topic_id_fkey" FOREIGN KEY ("sub_struct_topic_id") REFERENCES "SyllabusSubStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionSet" ADD CONSTRAINT "QuestionSet_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "SubStrTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
