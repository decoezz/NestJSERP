/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  HttpCode,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { createUserDto } from 'User/dto/create-User.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-User.dto';
import { NotAuthenticatedGuard } from 'middleware/not-authenticated.middleware';
import { Role } from '@prisma/client';
import { Roles } from 'src/Auth/decorators/roles.decorator';
import { RolesGuard } from 'src/Auth/roles.guards';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('Register')
  @HttpCode(201)
  async Register(@Body() dto: createUserDto) {
    const user = await this.userService.createUser(dto);
    return {
      id: user.userid,
      username: user.username,
      employeeFirstname: user.employeeFirstname,
      employeeLastname: user.employeeLastname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  @Post('login')
  @HttpCode(200)
  @UseGuards(NotAuthenticatedGuard)
  async Login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }
  @Get('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager)
  async GetAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('me')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async GetCurrentUser(@Request() req) {
    return {
      data: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role,
      },
    };
  }
  @Get('/:userid')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager)
  async GetUserWithID(@Param('userid') userid: number) {
    return this.userService.getUserWithId(userid);
  }
  @Delete('/:userid')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager)
  async DeleteUserWithId(@Param('userid') userid: number) {
    return this.userService.deleteUserWithID(userid);
  }
}
