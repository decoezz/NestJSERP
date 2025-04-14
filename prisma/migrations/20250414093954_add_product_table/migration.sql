/*
  Warnings:

  - The `role` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Employee', 'Inventory_Manager', 'Store_Manager');

-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('Fresh', 'Unionaire', 'Sharp', 'Carrier', 'LG');

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Employee';

-- CreateTable
CREATE TABLE "Product" (
    "brand" "Brand" NOT NULL,
    "modelnumber" TEXT NOT NULL,
    "coolingCapacity" INTEGER NOT NULL,
    "powerConsumption" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "inventoryStock" INTEGER NOT NULL,
    "StoreStock" INTEGER NOT NULL,
    "inStore" BOOLEAN NOT NULL DEFAULT false,
    "photo" TEXT DEFAULT 'doesn''t exist',
    "unitSold" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_modelnumber_key" ON "Product"("modelnumber");
