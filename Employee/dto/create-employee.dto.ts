import { IsString,IsEnum,IsEmail, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export class CreateEmployeeDto{
    @IsString()
    @MinLength(3)
    firstname:string
    @IsString()
    @MinLength(3)
    lastname:string
    @IsEnum(Role)
    role:Role
    @IsString()
    @IsEmail()
    email:string
}
