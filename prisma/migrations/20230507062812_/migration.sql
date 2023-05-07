/*
  Warnings:

  - You are about to drop the `_CommentsToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommentsToPost" DROP CONSTRAINT "_CommentsToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentsToPost" DROP CONSTRAINT "_CommentsToPost_B_fkey";

-- DropTable
DROP TABLE "_CommentsToPost";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
