/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateEntity } from 'src/common/update-entity';
import { PrismaService } from 'prisma/prisma.service';
import { QueryDto } from '../src/common/dto/query.dto';
import { PaginationDto } from '../src/common/dto/pagination.dto';
import { SortDto } from '../src/common/dto/sort.dto';
import { EmployeeFilterDto } from './dto/employee-filter.dto';
import { Role } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async getAllEmployees(
    pagination: PaginationDto,
    sort: SortDto,
    filter: EmployeeFilterDto,
  ) {
    const query = new QueryDto(pagination, sort, filter);
    const findManyArgs = query.getFindManyArgs();

    // Fetch the employees and total count for pagination metadata
    const [employees, total] = await Promise.all([
      this.prisma.employee.findMany({
        ...findManyArgs,
        include: { User: true },
      }),
      this.prisma.employee.count({
        where: findManyArgs.where,
      }),
    ]);
    return {
      data: employees,
      meta: {
        total,
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalPages: Math.ceil(total / pagination.pageSize),
      },
    };
  }
  async getCertainEmployeeWithName(firstname: string, lastname: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { Employee: { firstname, lastname }, active: true },
    });
    if (!employee) {
      throw new HttpException('Error employee not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }
  async createEmployee(dto: CreateEmployeeDto) {
    if (dto.role === 'Inventory_Manager') {
      //to ensure that the inventory_Manager can't be created through normal ways
      throw new HttpException(
        "Inventory_Manager can't be created through this endpoint.",
        HttpStatus.FORBIDDEN,
      );
    }
    //check if there is already an user with the provided email
    await this.prisma.checkExistingEmployeeByEmailForEmployeeController(
      dto.email,
    );
    // Check for existing employee by firstname and lastname (composite key)
    await this.prisma.checkExistingUserByNameForEmployeeService(
      dto.firstname,
      dto.lastname,
    );
    return this.prisma.employee.create({
      data: {
        firstname: dto.firstname,
        lastname: dto.lastname,
        role: dto.role,
        email: dto.email,
      },
    });
  }
  async getAllInactiveEmployees() {
    return this.prisma.employee.findMany({
      where: { active: false },
      include: { User: true },
    });
  }
  // async updateEmployee(id:number,name?:string,email?:string){
  //     return updateEntity(this.prisma.employee,id,{name,email},'Employee')
  // }
  // async DeleteEmployeeById(id:number){
  //     const user =await this.prisma.employee.findFirst({where:{id}})
  //     if(!user){
  //         throw new HttpException('Error user not found',HttpStatus.NOT_FOUND)
  //     }
  //     return this.prisma.employee.delete({where:{id:user.id}})
  // }
}
