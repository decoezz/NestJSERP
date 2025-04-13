/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateEntity } from 'src/Helpers/update-entity';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class EmployeeService {
    constructor(private prisma:PrismaService) {}
    
    async getAllEmployees(){
        const result = await this.prisma.employee.findMany()
        if(result.length === 0){
            throw new HttpException('Error no users found',HttpStatus.NOT_FOUND)
        }
        return result
    }
    async getCertainEmployeeWithId(id : number){
        const user = await this.prisma.employee.findUnique({where:{id}})
        if(!user){
            throw new HttpException('Error user not found',HttpStatus.NOT_FOUND)
        }
        return user
    }
    async createEmployee(name : string,role :string,email:string){
        return await this.prisma.employee.create({data:{name,role,email}})
    }
    async updateEmployee(id:number,name?:string,email?:string){
        return updateEntity(this.prisma.employee,id,{name,email},'Employee')
    }
    async DeleteEmployeeById(id:number){
        const user =await this.prisma.employee.findFirst({where:{id}})
        if(!user){
            throw new HttpException('Error user not found',HttpStatus.NOT_FOUND)
        }
        return this.prisma.employee.delete({where:{id:user.id}})
    }
}
