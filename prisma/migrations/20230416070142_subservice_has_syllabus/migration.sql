-- CreateTable
CREATE TABLE "SubserviceHasSyllabus" (
    "service_id" INTEGER NOT NULL,
    "syllabus_sub_structure_id" INTEGER NOT NULL,

    CONSTRAINT "SubserviceHasSyllabus_pkey" PRIMARY KEY ("service_id")
);

-- AddForeignKey
ALTER TABLE "SubserviceHasSyllabus" ADD CONSTRAINT "SubserviceHasSyllabus_syllabus_sub_structure_id_fkey" FOREIGN KEY ("syllabus_sub_structure_id") REFERENCES "SyllabusSubStructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubserviceHasSyllabus" ADD CONSTRAINT "SubserviceHasSyllabus_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "SubService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
