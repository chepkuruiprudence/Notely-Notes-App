/*
  Warnings:

  - You are about to drop the column `authorId` on the `note` table. All the data in the column will be lost.
  - Added the required column `userId` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_authorId_fkey";

-- AlterTable
ALTER TABLE "note" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
