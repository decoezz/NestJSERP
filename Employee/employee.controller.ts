/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller,Get,Post,Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
@Controller('employees')
export class EmployeeController {
    constructor(private readonly Employee:EmployeeService){}
    @Get('getAllEmployees')
    async getAllEmployees(){
        return this.Employee.getAllEmployees()
    }
    @Post('CreateEmployee')
    async createEmployee(@Body() body:{name:string,role:string,email:string}){
        return this.Employee.createEmployee(body.name,body.email,body.role)
    }
}
