import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  department: string;

  @IsString()
  designation: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}