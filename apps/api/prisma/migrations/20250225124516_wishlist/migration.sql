/*
  Warnings:

  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `recetas` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_size` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[image]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `culinaryUses` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organic` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonal` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageLife` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sweetness` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product_size` DROP FOREIGN KEY `product_size_productId_fkey`;

-- DropIndex
DROP INDEX `Product_images_key` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `images`,
    DROP COLUMN `recetas`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `culinaryUses` JSON NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `organic` BOOLEAN NOT NULL,
    ADD COLUMN `origin` VARCHAR(191) NOT NULL,
    ADD COLUMN `seasonal` BOOLEAN NOT NULL,
    ADD COLUMN `seasonalAvailability` JSON NULL,
    ADD COLUMN `sku` VARCHAR(191) NOT NULL,
    ADD COLUMN `stock` INTEGER NOT NULL,
    ADD COLUMN `storageLife` VARCHAR(191) NOT NULL,
    ADD COLUMN `sweetness` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Cart`;

-- DropTable
DROP TABLE `product_size`;

-- CreateTable
CREATE TABLE `Wishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Wishlist_userId_productId_key`(`userId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_image_key` ON `Product`(`image`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_sku_key` ON `Product`(`sku`);

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
