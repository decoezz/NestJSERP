import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, // Strip properties not defined in DTO
        forbidNonWhitelisted: true, // Throw error if unknown properties are present
        transform: true, // Automatically transform payloads to DTO instances
    }),
);  await app.listen(3000);
}
bootstrap();
