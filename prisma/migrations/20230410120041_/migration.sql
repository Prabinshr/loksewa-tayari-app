-- CreateTable
CREATE TABLE "refreshTokenHash" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,

    CONSTRAINT "refreshTokenHash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refreshTokenHash_user_id_key" ON "refreshTokenHash"("user_id");

-- AddForeignKey
ALTER TABLE "refreshTokenHash" ADD CONSTRAINT "refreshTokenHash_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
