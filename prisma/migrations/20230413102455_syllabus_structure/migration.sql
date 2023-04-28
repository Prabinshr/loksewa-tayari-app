-- CreateTable
CREATE TABLE "SyllabusStructure" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "SyllabusStructure_pkey" PRIMARY KEY ("id")
);
