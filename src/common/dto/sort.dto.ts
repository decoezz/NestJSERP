import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class SortDto {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection = SortDirection.ASC;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  // Helper to get Prisma's orderBy object
  getOrderBy(): any {
    if (!this.sortBy) return undefined;
    return { [this.sortBy]: this.sortDirection };
  }
}
