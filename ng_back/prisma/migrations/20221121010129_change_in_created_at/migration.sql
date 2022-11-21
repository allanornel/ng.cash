/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "createdAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_accountId_key" ON "users"("accountId");
