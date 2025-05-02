import{IsInt,IsOptional,Min} from 'class-validator'
import{Type} from 'class-transformer'

export class PaginationDto{
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(()=> Number) // Transform string to number
    page?: number = 1
    
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(()=> Number)
    pageSize?: number = 10
    
    // Helper to calculate Prisma's skip and take
    getSkip(): number {
        return (this.page - 1) * this.pageSize;
      }
      getTake(): number {
        return this.pageSize;
      }
}