import { AuthModule } from './Auth/auth.module';
import { UserModule } from './../User/user.module';
import { ProductModule } from '../Product/product.module';
import { ProductController } from '../Product/product.controller';
import { EmployeeModule } from './../Employee/employee.module';
import { EmployeeController } from '../Employee/employee.controller';
import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from './../prisma/prisma.service';
import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    EmployeeModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }), // Make ConfigModule global
  ],
})
export class AppModule{}
