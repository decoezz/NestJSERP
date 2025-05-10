/*
https://docs.nestjs.com/providers#services
*/
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role } from '@prisma/client';
import { TaskStatus } from './enum/task-status.enum';
import { checkDeadline } from 'src/common/chech-deadline';
import { first, last, take } from 'rxjs';
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(
    dto: CreateTaskDto,
    assignedByFirstname: string,
    assignedByLastname: string,
    assignedByRole: string,
  ) {
    const currentDate = new Date();
    const deadline = checkDeadline(dto.deadline, currentDate);
    // Ensure deadline is in the future
    if (deadline <= currentDate) {
      throw new HttpException(
        'Deadline must be in the future',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.checkExisitngEmployeeByNameForTask(
      dto.assignedToFirstname,
      dto.assignedToLastname,
    );
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        deadline,
        assignedToFirstname: dto.assignedToFirstname,
        assignedToLastname: dto.assignedToLastname,
        assignedByFirstname,
        assignedByLastname,
        assignedByRole: assignedByRole as Role,
      },
    });
  }
  async SubmitTask(firstname: string, lastname: string, id: number) {
    const currentDate = new Date();
    //find the task using the id
    const task = await this.prisma.task.findFirst({ where: { id } });
    if (!task) {
      throw new HttpException(
        `No task found with this id : ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      task.status === TaskStatus.Completed ||
      task.status === TaskStatus.OverDue
    ) {
      throw new HttpException(
        `Current Task with id : ${id} can\'t be submitted.Please contact supervisor`,
        HttpStatus.BAD_REQUEST,
      );
    }
    //validate that the user that is trying to submit is linked to the task he is submitting
    if (
      task.assignedToFirstname !== firstname &&
      task.assignedToLastname !== lastname
    ) {
      throw new HttpException(
        `The name provided : ${firstname} ${lastname} isn't the same as the task.Please contact supervisor`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (task.deadline <= currentDate) {
      throw new HttpException(
        "You didn't meet the deadline of this task",
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.task.update({
      where: { id },
      data: {
        status: TaskStatus.Completed,
      },
    });
  }
  async getTasksByEmployee(firstname: string, lastname: string) {
    const currentDate = new Date();
    const tasks = await this.prisma.task.findMany({
      where: {
        assignedToFirstname: firstname,
        assignedToLastname: lastname,
      },
      orderBy: {
        deadline: 'asc',
      },
    });
    // Update status for overdue tasks in-memory
    const updatedTasks = tasks.map((task) => {
      if (
        currentDate > new Date(task.deadline) &&
        task.status !== 'Completed'
      ) {
        return { ...task, status: 'Overdue' as TaskStatus };
      }
      return task;
    });

    return updatedTasks;
  }
  async DeleteCertainTask(id: number) {
    const task = await this.prisma.task.findFirst({ where: { id } });
    if (!task) {
      throw new HttpException(
        `No task found with this id : ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.task.delete({ where: { id } });
  }
  async GetTaskByEmployee(firstname: string, lastname: string) {
    const currentDate = new Date();
    const tasks = await this.prisma.task.findMany({
      where: {
        assignedToFirstname: firstname,
        assignedToLastname: lastname,
      },
    });
    if (!tasks || tasks.length === 0) {
      throw new HttpException(
        `There is no tasks for the user with the name : ${firstname} ${lastname}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Update status for overdue tasks in-memory
    const updatedTasks = tasks.map((task) => {
      if (
        currentDate > new Date(task.deadline) &&
        task.status !== 'Completed'
      ) {
        return { ...task, status: 'Overdue' as TaskStatus };
      }
      return task;
    });

    return updatedTasks;
  }
}
