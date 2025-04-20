/*
https://docs.nestjs.com/modules
*/
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
