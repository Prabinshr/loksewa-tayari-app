-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postId_fkey";

-- CreateTable
CREATE TABLE "_CommentsToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommentsToPost_AB_unique" ON "_CommentsToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentsToPost_B_index" ON "_CommentsToPost"("B");

-- AddForeignKey
ALTER TABLE "_CommentsToPost" ADD CONSTRAINT "_CommentsToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentsToPost" ADD CONSTRAINT "_CommentsToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
