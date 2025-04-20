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
@Controller('employees')
export class EmployeeController {
  constructor(private readonly Employee: EmployeeService) {}
  @Get('getAllEmployees')
  @HttpCode(200)
  async getAllEmployees() {
    return this.Employee.getAllEmployees();
  }
  // @Get('getEmployeeWithID')
  // @HttpCode(200)
  // async getEmployee(@Query('id') id:string ){
  //     const employeeid = parseId(id)
  //    return this.Employee.getCertainEmployeeWithId(employeeid)
  // }
  // @Post('CreateEmployee')
  // @HttpCode(201)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('Inventory_Manager')
  // async createEmployee(
  //   @Body()
  //   body: {
  //     firstname: string;
  //     lastname: string;
  //     role: Role;
  //     email: string;
  //   },
  // ) {
  //   return this.Employee.createEmployee(body);
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
