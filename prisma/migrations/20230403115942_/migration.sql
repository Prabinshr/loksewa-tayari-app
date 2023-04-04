-- CreateEnum
CREATE TYPE "OnlineStatus" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onlineStatus" "OnlineStatus" DEFAULT 'OFFLINE';
