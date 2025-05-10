/*
  Warnings:

  - A unique constraint covering the columns `[assignedToFirstname,assignedToLastname]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EmployeeTaskData";

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeTaskLimit" ON "Task"("assignedToFirstname", "assignedToLastname");
