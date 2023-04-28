/*
  Warnings:

  - Made the column `sewaService_id` on table `SubService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sub_struct_topic_id` on table `SubStrTopic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `syllabus_structure_id` on table `SyllabusSubStructure` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SubService" DROP CONSTRAINT "SubService_sewaService_id_fkey";

-- DropForeignKey
ALTER TABLE "SubStrTopic" DROP CONSTRAINT "SubStrTopic_sub_struct_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "SyllabusSubStructure" DROP CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey";

-- AlterTable
ALTER TABLE "SubService" ALTER COLUMN "sewaService_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "SubStrTopic" ALTER COLUMN "sub_struct_topic_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "SyllabusSubStructure" ALTER COLUMN "syllabus_structure_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SubService" ADD CONSTRAINT "SubService_sewaService_id_fkey" FOREIGN KEY ("sewaService_id") REFERENCES "SewaService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllabusSubStructure" ADD CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey" FOREIGN KEY ("syllabus_structure_id") REFERENCES "SyllabusStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubStrTopic" ADD CONSTRAINT "SubStrTopic_sub_struct_topic_id_fkey" FOREIGN KEY ("sub_struct_topic_id") REFERENCES "SyllabusSubStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
