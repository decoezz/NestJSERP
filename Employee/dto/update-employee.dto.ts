import { IsString, IsOptional } from 'class-validator';

export class updateEmployeeDto{
    @IsString()
    @IsOptional()
    name?:string
    
    @IsString()
    @IsOptional()
    email?:string
}