import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  status?: TaskStatus;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
