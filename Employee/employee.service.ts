/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { updateEntity } from 'src/Helpers/update-entity';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';
@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async getAllEmployees() {
    const result = await this.prisma.employee.findMany();
    if (result.length === 0) {
      throw new HttpException('Error no users found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  // async getCertainEmployeeWithId(id : number){
  //     const user = await this.prisma.employee.findUnique({where:{id}})
  //     if(!user){
  //         throw new HttpException('Error user not found',HttpStatus.NOT_FOUND)
  //     }
  //     return user
  // }
  // async createEmployee(dto: {
  //   firstname: string;
  //   lastname: string;
  //   role: Role;
  //   email: string;
  // }) {
  //   if (dto.role === 'Inventory_Manager') {
  //     //to ensure that the inventory_Manager can't be created through normal ways
  //     throw new HttpException(
  //       "Inventory_Manager can't be created through this endpoint.",
  //       HttpStatus.FORBIDDEN,
  //     );
  //   }
  //   checkExistingEmployeeByName(dto.firstname, dto.lastname);
  //   checkExistingEmployeeByEmail(dto.email);
  //   return this.prisma.employee.create({
  //     data: {
  //       firstname: dto.firstname,
  //       lastname: dto.lastname,
  //       role: dto.role,
  //       email: dto.email,
  //     },
  //   });
  // }
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
