/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { RolesGuard } from 'src/Auth/roles.guards';
import { Role } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { Roles } from 'src/Auth/decorators/roles.decorator';
import { User } from 'src/Auth/decorators/user.decorator';
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post('')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager, Role.Store_Manager)
  async createTask(@Body() createTaskDto: CreateTaskDto, @User() user: any) {
    return this.taskService.createTask(
      createTaskDto,
      user.firstname,
      user.lastname,
      user.role,
    );
  }
  @Get(':firstname/:lastname')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager, Role.Store_Manager)
  async GetTasksByEmployee(
    @Param('firstname') firstname: string,
    @Param('lastname') lastname: string,
  ) {
    return this.taskService.getTasksByEmployee(firstname, lastname);
  }
}
