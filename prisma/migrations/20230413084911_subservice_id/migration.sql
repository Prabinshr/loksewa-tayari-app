-- DropForeignKey
ALTER TABLE "SubService" DROP CONSTRAINT "SubService_sewaService_id_fkey";

-- AlterTable
ALTER TABLE "SubService" ALTER COLUMN "sewaService_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SubService" ADD CONSTRAINT "SubService_sewaService_id_fkey" FOREIGN KEY ("sewaService_id") REFERENCES "SewaService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
