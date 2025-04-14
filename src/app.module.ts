import { ProductModule } from '../Product/product.module';
import { ProductController } from '../Product/product.controller';
import { EmployeeModule } from './../Employee/employee.module';
import { EmployeeController } from '../Employee/employee.controller';
import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
        ProductModule, 
        EmployeeModule, 
        PrismaModule, ],

})
export class AppModule {}
