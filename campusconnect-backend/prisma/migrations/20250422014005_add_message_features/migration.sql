-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'FILE');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "MessageType" NOT NULL DEFAULT 'TEXT',
ALTER COLUMN "content" DROP NOT NULL;
