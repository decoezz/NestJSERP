import{IsEnum,IsOptional,IsString} from 'class-validator'

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
  }

export class SortDto{
    @IsOptional()
    @IsString()
    sortBy?:string
    
    @IsOptional()
    @IsEnum(SortDirection)
    sortDirection?:SortDirection = SortDirection.ASC
    
    // Helper to get Prisma's orderBy object
    getOrderBy(): any {
        if (!this.sortBy) return undefined;
        return { [this.sortBy]: this.sortDirection };
    }
}