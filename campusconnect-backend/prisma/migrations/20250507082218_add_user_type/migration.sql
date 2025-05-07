/*
  Warnings:

  - You are about to drop the column `location` on the `College` table. All the data in the column will be lost.
  - The primary key for the `Mentor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the `_AppliedOpportunities` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Mentor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
/* Migration SQL with fixes */
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'MENTOR');

-- DropForeignKey
ALTER TABLE "_AppliedOpportunities" DROP CONSTRAINT "_AppliedOpportunities_A_fkey";
ALTER TABLE "_AppliedOpportunities" DROP CONSTRAINT "_AppliedOpportunities_B_fkey";

-- AlterTable
ALTER TABLE "College" 
    DROP COLUMN "location",
    ADD COLUMN     "address" TEXT,
    ADD COLUMN     "city" TEXT,
    ADD COLUMN     "country" TEXT,
    ADD COLUMN     "state" TEXT;

-- AlterTable 
ALTER TABLE "Mentor" 
    DROP CONSTRAINT "Mentor_pkey",
    DROP COLUMN "email",
    DROP COLUMN "id",
    ADD CONSTRAINT "Mentor_pkey" PRIMARY KEY ("userId");

-- AlterTable (with default)
ALTER TABLE "User" 
    ADD COLUMN "type" "UserType" NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "_AppliedOpportunities";

-- CreateTable
CREATE TABLE "Student" (
    "userId" TEXT NOT NULL,
    "major" TEXT,
    "year" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "_Application" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Application_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE INDEX "_Application_B_index" ON "_Application"("B");

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_userId_key" ON "Mentor"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Application" ADD CONSTRAINT "_Application_A_fkey" FOREIGN KEY ("A") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Application" ADD CONSTRAINT "_Application_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
