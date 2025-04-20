/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("firstname", "lastname");

-- CreateTable
CREATE TABLE "User" (
    "userid" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "employeeFirstname" TEXT NOT NULL,
    "employeeLastname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeFirstname_employeeLastname_key" ON "User"("employeeFirstname", "employeeLastname");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeFirstname_employeeLastname_fkey" FOREIGN KEY ("employeeFirstname", "employeeLastname") REFERENCES "Employee"("firstname", "lastname") ON DELETE RESTRICT ON UPDATE CASCADE;
