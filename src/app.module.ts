import { EmployeeModule } from './../Employee/employee.module';
import { EmployeeController } from '../Employee/employee.controller';
import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
        EmployeeModule, 
        PrismaModule, ],
//   controllers: [
//         EmployeeController, AppController],
//   providers: [
//         PrismaService, AppService],
})
export class AppModule {}
