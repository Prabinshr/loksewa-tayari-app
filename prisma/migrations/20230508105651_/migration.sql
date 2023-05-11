/*
  Warnings:

  - A unique constraint covering the columns `[subserviceTitle]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SubService" ADD COLUMN     "package_title" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subserviceTitle" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_subserviceTitle_key" ON "User"("subserviceTitle");

-- AddForeignKey
ALTER TABLE "SubService" ADD CONSTRAINT "SubService_package_title_fkey" FOREIGN KEY ("package_title") REFERENCES "Package"("title") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubService" ADD CONSTRAINT "SubService_title_fkey" FOREIGN KEY ("title") REFERENCES "User"("subserviceTitle") ON DELETE RESTRICT ON UPDATE CASCADE;
