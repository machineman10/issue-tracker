/*
  Warnings:

  - You are about to alter the column `userId` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_userId_fkey`;

-- AlterTable
ALTER TABLE `issue` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
