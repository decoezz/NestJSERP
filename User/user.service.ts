/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createUserDto } from 'src/Helpers/create-User.dto';
import { LoginUserDto } from './dto/login-User.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async createUser(dto:createUserDto){
    const employee = await this.prisma.checkExistingEmployeeByEmail(dto.employeeEmail)
    await this.prisma.checkExistingUserByName(dto.employeeFirstname,dto.employeeLastname)
    await this.prisma.checkExistingUserByUsername(dto.username)
    const saltrounds = 10
    const hasedPassword : string = await bcrypt.hash(dto.password,saltrounds) //when hashing the password try to remember to turn it to string
    return this.prisma.user.create({
      data:{
        username:dto.username,
        password:hasedPassword,
        employeeFirstname:employee.firstname,
        employeeLastname:employee.lastname,
      }
    })
    }
  async getAllUsers() {
    return this.prisma.user.findMany();
  }
  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
      include: { employee: true },
    });
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!user.employee) {
      throw new HttpException(
          'User has no associated employee',
          HttpStatus.UNAUTHORIZED,
      );
  }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password); //validating the password
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { //sending the token
      sub: user.userid,
      username: user.username,
      role: user.employee.role,
    };
    const token = this.jwtService.sign(payload);//Siging the token
    return {
      token,
      user: {
        id: user.userid,
        username: user.username,
        role: user.employee.role,
      },
    };
  }
}
