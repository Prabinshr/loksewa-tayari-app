-- DropForeignKey
ALTER TABLE "SyllabusSubStructure" DROP CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey";

-- AlterTable
ALTER TABLE "SyllabusSubStructure" ALTER COLUMN "syllabus_structure_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SyllabusSubStructure" ADD CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey" FOREIGN KEY ("syllabus_structure_id") REFERENCES "SyllabusStructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;
