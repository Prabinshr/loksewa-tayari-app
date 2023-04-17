-- CreateTable
CREATE TABLE "SubStrTopic" (
    "id" SERIAL NOT NULL,
    "sub_struct_topic_id" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "SubStrTopic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubStrTopic" ADD CONSTRAINT "SubStrTopic_sub_struct_topic_id_fkey" FOREIGN KEY ("sub_struct_topic_id") REFERENCES "SyllabusSubStructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;
