import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async createEmployee(data: any) {
    return this.prisma.employee.create({
      data,
    });
  }

  async getEmployees() {
    return this.prisma.employee.findMany();
  }

  async updateEmployee(id: number, data: any) {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async deleteEmployee(id: number) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}