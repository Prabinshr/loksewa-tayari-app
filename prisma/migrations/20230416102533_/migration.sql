/*
  Warnings:

  - Made the column `syllabus_structure_id` on table `SyllabusSubStructure` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SyllabusSubStructure" DROP CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey";

-- AlterTable
ALTER TABLE "SyllabusSubStructure" ALTER COLUMN "syllabus_structure_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SyllabusSubStructure" ADD CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey" FOREIGN KEY ("syllabus_structure_id") REFERENCES "SyllabusStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
