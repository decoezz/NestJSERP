/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, HttpCode, Post, Get,Body, UseGuards } from '@nestjs/common';
import { createUserDto } from 'src/Helpers/create-User.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-User.dto';
import { NotAuthenticatedGuard } from 'middleware/not-authenticated.middleware';
import { Role } from '@prisma/client';
import { Roles } from 'src/Auth/roles.decorator';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('Register')
  @HttpCode(201)
  async Register(@Body() dto: createUserDto) {
    const user = await this.userService.createUser(dto);
    return{
      id:user.userid,
      username:user.username,
      employeeFirstname:user.employeeFirstname,
      employeeLastname:user.employeeLastname,
      createdAt:user.createdAt,
      updatedAt:user.updatedAt
    }
  }
  @Post('login')
  @HttpCode(200)
  @UseGuards(NotAuthenticatedGuard)
  async Login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }
  @Get('')
  @HttpCode(200)
  @Roles(Role.Inventory_Manager)
  async GetAllUsers() {
    return this.userService.getAllUsers();
  }
}
