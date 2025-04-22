/*
  Warnings:

  - You are about to drop the column `created_at` on the `CampusWall` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `CampusWall` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CampusWall` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CampusWall" DROP COLUMN "created_at",
DROP COLUMN "user_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collegeIDPath" TEXT,
ADD COLUMN     "collegeIdImage" TEXT;

-- AddForeignKey
ALTER TABLE "CampusWall" ADD CONSTRAINT "CampusWall_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
