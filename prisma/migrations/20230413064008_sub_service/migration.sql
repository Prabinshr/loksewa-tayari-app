-- CreateTable
CREATE TABLE "SubService" (
    "id" SERIAL NOT NULL,
    "sewaService_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "status" "STATUS" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubService" ADD CONSTRAINT "SubService_sewaService_id_fkey" FOREIGN KEY ("sewaService_id") REFERENCES "SewaService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
