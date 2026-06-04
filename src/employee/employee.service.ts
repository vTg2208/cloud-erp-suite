import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  private excludePassword(employee: { password?: string; [key: string]: any }) {
    const { password, ...result } = employee;
    return result;
  }

  async createEmployee(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const employee = await this.prisma.employee.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return this.excludePassword(employee);
  }

  async getEmployees() {
    const employees = await this.prisma.employee.findMany();
    return employees.map((employee) => this.excludePassword(employee));
  }
  async findOne(id: number) {
  const employee = await this.prisma.employee.findUnique({
    where: { id },
  });

  if (!employee) {
    return null;
  }

  return this.excludePassword(employee);
}
  async updateEmployee(id: number, data: any) {
    const updateData = { ...data };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const employee = await this.prisma.employee.update({
      where: { id },
      data: updateData,
    });

    return this.excludePassword(employee);
  }

  async deleteEmployee(id: number) {
    const employee = await this.prisma.employee.delete({
      where: { id },
    });

    return this.excludePassword(employee);
  }

  async findByEmail(email: string) {
    return this.prisma.employee.findUnique({
      where: { email },
    });
  }
}