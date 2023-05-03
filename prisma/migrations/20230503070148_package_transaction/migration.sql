/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "package_title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Package_title_key" ON "Package"("title");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_package_title_fkey" FOREIGN KEY ("package_title") REFERENCES "Package"("title") ON DELETE SET NULL ON UPDATE CASCADE;
