-- CreateTable
CREATE TABLE "SyllabusSubStructure" (
    "id" SERIAL NOT NULL,
    "syllabus_structure_id" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "SyllabusSubStructure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SyllabusSubStructure" ADD CONSTRAINT "SyllabusSubStructure_syllabus_structure_id_fkey" FOREIGN KEY ("syllabus_structure_id") REFERENCES "SyllabusStructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;
