-- CreateTable
CREATE TABLE "GorkhaPatra" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "news_link" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GorkhaPatra_pkey" PRIMARY KEY ("id")
);
