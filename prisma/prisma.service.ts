/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, OnModuleInit, OnModuleDestroy,HttpException,HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Employee } from '@prisma/client';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
  // Existing employee-related helpers
  async checkExistingEmployeeByEmail(email: string): Promise<Employee> {
    const existingEmployee = await this.employee.findUnique({ where: { email } });
    if (!existingEmployee) {
      throw new HttpException(
        `No employee found with email ${email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return existingEmployee;
  }
  // Add user-related helpers
  async checkExistingUserByUsername(username: string): Promise<void> {
    const existingUser = await this.user.findUnique({ where: { username } });
    if (existingUser) {
      throw new HttpException(
        `A User already exists with username ${username}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async checkExistingUserByName(firstname: string, lastname: string): Promise<void> {
    const existingUser = await this.user.findFirst({
      where: { employeeFirstname: firstname, employeeLastname: lastname },
    });
    if (existingUser) {
      throw new HttpException(
        `A User already exists ${firstname} ${lastname}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
