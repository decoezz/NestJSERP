import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Employee } from '@prisma/client';
@Injectable()
export class UserHelper {
  constructor(private prisma: PrismaService) {}
  async checkExistingEmployeebyemail(email: string){
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { email },
    });
    if (!existingEmployee) {
      throw new HttpException(
        `No employee found with email ${email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return existingEmployee;
  }
  async checkExistingUserByName(firstname: string, lastname: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: { employeeFirstname: firstname, employeeLastname: lastname },
    });
    if (existingUser) {
      throw new HttpException(
        `A User already exists ${firstname} ${lastname}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async checkEisitingUserByUserName(username:string){
    const existingUser = await this.prisma.user.findUnique({where:{username}})
    if(existingUser){
      throw new HttpException(
        `A User already exists ${username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
