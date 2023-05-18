-- DropForeignKey
ALTER TABLE "ExamCategory" DROP CONSTRAINT "ExamCategory_examSet_id_fkey";

-- DropForeignKey
ALTER TABLE "ExamQuestion" DROP CONSTRAINT "ExamQuestion_examCategory_id_fkey";

-- DropForeignKey
ALTER TABLE "ExamSet" DROP CONSTRAINT "ExamSet_subService_id_fkey";

-- AlterTable
ALTER TABLE "ExamCategory" ALTER COLUMN "examSet_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ExamQuestion" ALTER COLUMN "examCategory_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ExamSet" ALTER COLUMN "subService_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ExamSet" ADD CONSTRAINT "ExamSet_subService_id_fkey" FOREIGN KEY ("subService_id") REFERENCES "SubService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamCategory" ADD CONSTRAINT "ExamCategory_examSet_id_fkey" FOREIGN KEY ("examSet_id") REFERENCES "ExamSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamQuestion" ADD CONSTRAINT "ExamQuestion_examCategory_id_fkey" FOREIGN KEY ("examCategory_id") REFERENCES "ExamCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
