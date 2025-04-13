/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller,Get,Post,Body, Res, HttpCode, Delete, Query, HttpException, HttpStatus ,Patch} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { parseId } from 'src/Helpers/ParseNumberQuery';
import { updateEmployeeDto } from './dto/update-employee.dto';
@Controller('employees')
export class EmployeeController {
    constructor(private readonly Employee:EmployeeService){}
    @Get('getAllEmployees')
    @HttpCode(200)
    async getAllEmployees(){
        return this.Employee.getAllEmployees()
    }
    @Get('getEmployeeWithID')
    @HttpCode(200)
    async getEmployee(@Query('id') id:string ){
        const employeeid = parseId(id)
       return this.Employee.getCertainEmployeeWithId(employeeid)
    }
    @Post('CreateEmployee')
    @HttpCode(201)
    async createEmployee(@Body() body:{name:string,role:string,email:string}){
        return this.Employee.createEmployee(body.name,body.email,body.role)
    }
    @Patch('UpdateEmployee')
    @HttpCode(200)
    async updateEmployee(@Body() body:updateEmployeeDto,@Query('id') id:string){
        const employeeid = parseId(id)
        return this.Employee.updateEmployee(employeeid,body.name,body.email)
    }
    @Delete('DeleteEmployee')
    @HttpCode(204)
    async DeleteEmployee(@Query('id') id:string){
        const employeeid = parseId(id)
        return this.Employee.DeleteEmployeeById(employeeid)
    }
}
