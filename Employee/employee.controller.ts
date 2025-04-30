/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpCode,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { parseId } from 'src/Helpers/ParseNumberQuery';
import { updateEmployeeDto } from './dto/update-employee.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/Auth/roles.guards';
import { Roles } from 'src/Auth/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  
  @Post('')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Inventory_Manager)
  async createEmployee(@Body() dto : CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }
  
  @Get('getAllEmployees')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Inventory_Manager)
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }
  @Get('GetInactiveEmployye')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.Inventory_Manager)
  async GetInactiveEmployees(){
    return this.employeeService.getAllInactiveEmployees()
  }
  // @Get('getEmployeeWithID')
  // @HttpCode(200)
  // async getEmployee(@Query('id') id:string ){
  //     const employeeid = parseId(id)
  //    return this.Employee.getCertainEmployeeWithId(employeeid)
  // }

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
