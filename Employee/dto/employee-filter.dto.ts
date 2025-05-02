import { IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { filterDto } from '../../src/common/dto/filter.dto';
import { Role } from '@prisma/client';

export class EmployeeFilterDto extends filterDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  active?: Boolean;

  getWhere(): any {
    const where: any = {};

    if (this.role) {
      where.role = this.role;
    }

    if (typeof this.active === 'boolean') {
      where.active = this.active;
    }

    if (this.search) {
      where.OR = [
        { firstname: { contains: this.search, mode: 'insensitive' } },
        { lastname: { contains: this.search, mode: 'insensitive' } },
        { email: { contains: this.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }
}
