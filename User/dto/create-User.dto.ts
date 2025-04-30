import { IsString, MinLength, IsEmail } from 'class-validator';

export class createUserDto {
  @IsString()
  @MinLength(3)
  username: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsString()
  employeeFirstname: string;
  @IsString()
  employeeLastname: string;
  @IsEmail()
  employeeEmail: string; //This is made to ensure that the user exists
}
