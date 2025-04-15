import { IsEnum } from 'class-validator';
import { Brand } from '@prisma/client';

export class QueryBrandDto {
    @IsEnum(Brand)
    brand: Brand;
}