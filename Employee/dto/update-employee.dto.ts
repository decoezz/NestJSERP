import { IsString, IsOptional, IsEmail } from 'class-validator';

export class updateEmployeeDto{
    @IsString()
    @IsOptional()
    name?:string
    
    @IsString()
    @IsOptional()
    @IsEmail()
    email?:string
}