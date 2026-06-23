import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  eid: string;

  @IsNotEmpty()
  @IsString()
  employee_name: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsDateString()
  doj: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}