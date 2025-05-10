import { IsEnum, IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  deadline: string;

  @IsNotEmpty()
  @IsString()
  assignedToFirstname: string;

  @IsNotEmpty()
  @IsString()
  assignedToLastname: string;
}
