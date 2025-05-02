/*
https://docs.nestjs.com/providers#services
*/
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Role } from '@prisma/client';
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
    if (new Date(dto.deadline) <= currentDate) {
      throw new HttpException(
        'Deadline must be in the future',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.checkExisitngEmployeeByNameForTask(
      dto.assignedToFirstname,
      dto.assignedToLastname,
    );
    await this.prisma.checkExistingaTask(
      dto.assignedToFirstname,
      dto.assignedToLastname,
      dto.title,
    );
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        deadline: new Date(dto.deadline),
        assignedToFirstname: dto.assignedToFirstname,
        assignedToLastname: dto.assignedToLastname,
        assignedByFirstname,
        assignedByLastname,
        assignedByRole: assignedByRole as Role,
      },
    });
  }
  async getTasksByEmployee(firstname: string, lastname: string) {
    return this.prisma.task.findMany({
      where: {
        assignedToFirstname: firstname,
        assignedToLastname: lastname,
      },
      orderBy: {
        deadline: 'asc',
      },
    });
  }
}
