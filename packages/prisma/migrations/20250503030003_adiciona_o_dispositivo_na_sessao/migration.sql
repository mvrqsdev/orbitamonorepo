/*
  Warnings:

  - You are about to drop the column `accessToken` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `device` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_accessToken_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "accessToken",
ADD COLUMN     "device" TEXT NOT NULL;
