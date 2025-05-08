/*
  Warnings:

  - You are about to drop the column `picture` on the `customers` table. All the data in the column will be lost.
  - Added the required column `image` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "picture",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'Invited';
