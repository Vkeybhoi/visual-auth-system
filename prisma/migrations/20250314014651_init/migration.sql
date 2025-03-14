-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "artistEmail" TEXT NOT NULL,
    "artistPassword" TEXT NOT NULL,
    "artistBiometricKey" TEXT,
    "artistCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "artistUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_artistEmail_key" ON "Artist"("artistEmail");
