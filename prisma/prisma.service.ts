/*
https://docs.nestjs.com/providers#services
*/

import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
  // Check for existing employee by email
  async checkExistingEmployeeByEmailForEmployeeController(
    email: string,
  ): Promise<void> {
    const existingEmployee = await this.employee.findUnique({
      where: { email },
    });
    if (existingEmployee) {
      throw new HttpException(
        `Employee with this email was already found : ${email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // Existing employee-related helpers
  async checkExistingEmployeeByEmail(email: string): Promise<void> {
    const existingEmployee = await this.employee.findUnique({
      where: { email },
    });
    if (!existingEmployee) {
      throw new HttpException(
        `No employee found with email ${email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
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
  async checkExistingUserByNameForEmployeeService(
    firstname: string,
    lastname: string,
  ): Promise<void> {
    const existingUser = await this.employee.findUnique({
      where: { Employee: { firstname: firstname, lastname: lastname } },
    });
    if (existingUser) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
  }
  async checkExistingUserByNameForUserService(
    firstname: string,
    lastname: string,
  ): Promise<void> {
    const existingUser = await this.employee.findUnique({
      where: { Employee: { firstname: firstname, lastname: lastname } },
    });
    if (!existingUser) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
  }
  //check if there is already a user for the employee that is being registerd
  async checkExistingUserByEmployee(
    firstname: string,
    lastname: string,
  ): Promise<void> {
    const existingUser = await this.user.findFirst({
      where: {
        employeeFirstname: firstname,
        employeeLastname: lastname,
      },
    });
    if (existingUser) {
      throw new HttpException(
        'Employee already has a User account',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async checkExisitngEmployeeByNameForTask(
    firstname: string,
    lastname: string,
  ): Promise<Employee> {
    const employee = await this.employee.findUnique({
      where: { Employee: { firstname, lastname } },
    });
    if (!employee || !employee.active) {
      throw new HttpException(
        'Employee not found or inactive',
        HttpStatus.BAD_REQUEST,
      );
    }
    return employee;
  }
  async checkExistingaTask(firstname: string, lastname: string): Promise<void> {
    const existingTask = await this.task.findFirst({
      where: {
        assignedToFirstname: firstname,
        assignedToLastname: lastname,
      },
    });
    if (existingTask) {
      throw new HttpException(
        'Task already exists for this employee',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
