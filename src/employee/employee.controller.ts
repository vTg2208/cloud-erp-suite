import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  create(@Body() body: CreateEmployeeDto) {
    return this.employeeService.createEmployee(body);
  }

  @Get()
  findAll() {
    return this.employeeService.getEmployees();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(Number(id));
  }
}