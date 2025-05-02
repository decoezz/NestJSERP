-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Pending', 'Completed');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'Pending',
    "assignedToFirstname" TEXT NOT NULL,
    "assignedToLastname" TEXT NOT NULL,
    "assignedByFirstname" TEXT NOT NULL,
    "assignedByLastname" TEXT NOT NULL,
    "assignedByRole" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_assignedToFirstname_assignedToLastname_title_key" ON "Task"("assignedToFirstname", "assignedToLastname", "title");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToFirstname_assignedToLastname_fkey" FOREIGN KEY ("assignedToFirstname", "assignedToLastname") REFERENCES "Employee"("firstname", "lastname") ON DELETE RESTRICT ON UPDATE CASCADE;
