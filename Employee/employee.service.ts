/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class EmployeeService {
    constructor(private prisma:PrismaService) {}
    
    async getAllEmployees(){
        return this.prisma.employee.findMany()
    }
    async createEmployee(name : string,role :string,email:string){
        return this.prisma.employee.create({data:{name,role,email}})
    }
    
}
