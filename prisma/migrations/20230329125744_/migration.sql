-- DropForeignKey
ALTER TABLE "User_Progress" DROP CONSTRAINT "User_Progress_user_id_fkey";

-- AddForeignKey
ALTER TABLE "User_Progress" ADD CONSTRAINT "User_Progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
