/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createUserDto } from 'User/dto/create-User.dto';
import { LoginUserDto } from './dto/login-User.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { dot } from 'node:test/reporters';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async createUser(dto:createUserDto){
    //check if there is already a user with the same username
    await this.prisma.checkExistingUserByUsername(dto.username)
    //check if there is a user by the given name
    await this.prisma.checkExistingUserByNameForUserService(dto.employeeFirstname,dto.employeeLastname)
    //check if there is an Employee that has this email
    await this.prisma.checkExistingEmployeeByEmail(dto.employeeEmail)
    //check if there is already a user for this employee through name
    await this.prisma.checkExistingUserByEmployee(dto.employeeFirstname,dto.employeeLastname)
    //hash the password
    const saltrounds = 10
    const hashedPassword : string = await bcrypt.hash(dto.password,saltrounds) //when hashing the password try to remember to turn it to string
    return this.prisma.user.create({
      data:{
        username:dto.username,
        password:hashedPassword,
        employeeFirstname:dto.employeeFirstname,
        employeeLastname:dto.employeeLastname,
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
      role: user.employee?.role,
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
  async getUserWithId(userid : number){
    const result = await this.prisma.user.findUnique({where:{userid}})
    if(!result){
      throw new HttpException(`No User found with this id ${userid}`,HttpStatus.BAD_REQUEST)
    }
    return result
  }
  async deleteUserWithID(userid:number){
    const result = await this.prisma.user.findUnique({where:{userid}})
    if(!result){
      throw new HttpException(`No User found with this id ${userid}`,HttpStatus.BAD_REQUEST)
    }
    await this.prisma.user.delete({where:{userid}})
    await this.prisma.employee.update({where:{Employee:{firstname:result.employeeFirstname,lastname:result.employeeLastname}},data:{active:false}})
    return { message: 'User deleted and Employee marked as inactive' }
  }
  
}
