/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { Roles } from 'src/Auth/decorators/roles.decorator';
import { RolesGuard } from 'src/Auth/roles.guards';
import { parseId } from 'src/common/ParseNumberQuery';
import { PaginationDto } from '../src/common/dto/pagination.dto';
import { QueryDto } from '../src/common/dto/query.dto';
import { SortDto } from '../src/common/dto/sort.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeFilterDto } from './dto/employee-filter.dto';
import { updateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager)
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }
  @Get('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager)
  async getAllEmployees(
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
    @Query() filter: EmployeeFilterDto,
  ) {
    return this.employeeService.getAllEmployees(pagination, sort, filter);
  }
  @Get('GetInactiveEmployees')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager)
  async GetInactiveEmployees() {
    return this.employeeService.getAllInactiveEmployees();
  }
  @Get(':firstname/:lastname')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager)
  @HttpCode(200)
  async getEmployee(
    @Param('firstname') firstname: string,
    @Param('lastname') lastname: string,
  ) {
    return this.employeeService.getCertainEmployeeWithName(firstname, lastname);
  }

  // @Patch('UpdateEmployee')
  // @HttpCode(200)
  // async updateEmployee(@Body() body:updateEmployeeDto,@Query('id') id:string){
  //     const employeeid = parseId(id)
  //     return this.Employee.updateEmployee(employeeid,body.name,body.email)
  // }
  // @Delete('DeleteEmployee')
  // @HttpCode(204)
  // async DeleteEmployee(@Query('id') id:string){
  //     const employeeid = parseId(id)
  //     return this.Employee.DeleteEmployeeById(employeeid)
  // }
}
