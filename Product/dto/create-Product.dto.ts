import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsPositive,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { Brand } from '@prisma/client';

export class CreateProductDto {
  @IsEnum(Brand)
  brand: Brand;
  @IsString()
  modelnumber: string;
  @IsNumber()
  @IsPositive()
  coolingCapacity: number;
  @IsNumber()
  @IsPositive()
  powerConsumption: number;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNumber()
  @IsPositive()
  inventoryStock: number;
  @IsNumber()
  @IsPositive()
  StoreStock: number;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  unitSold?: number;
  @IsBoolean()
  @IsOptional()
  inStore?: boolean;
  @IsUrl()
  @IsOptional()
  photo?: string;
}
