import api from './api'
import type { Employee, Leave, Attendance, Payroll } from '@/types'

export const hrService = {
  employees: {
    list: () => api.get<Employee[]>('/hr/employees'),
    create: (employee: Partial<Employee>) => api.post('/hr/employees', employee),
    update: (id: string, employee: Partial<Employee>) => api.put(`/hr/employees/${id}`, employee),
    delete: (id: string) => api.delete(`/hr/employees/${id}`),
    getById: (id: string) => api.get<Employee>(`/hr/employees/${id}`),
  },

  leave: {
    list: () => api.get<Leave[]>('/hr/leave'),
    request: (leave: Partial<Leave>) => api.post('/hr/leave', leave),
    approve: (id: string) => api.put(`/hr/leave/${id}/approve`),
    reject: (id: string) => api.put(`/hr/leave/${id}/reject`),
  },

  attendance: {
    list: (employeeId?: string) => api.get<Attendance[]>(`/hr/attendance${employeeId ? `?employeeId=${employeeId}` : ''}`),
    checkIn: (data: { employeeId: string }) => api.post('/hr/attendance/check-in', data),
    checkOut: (data: { employeeId: string }) => api.post('/hr/attendance/check-out', data),
  },

  payroll: {
    list: (period?: string) => api.get<Payroll[]>(`/hr/payroll${period ? `?period=${period}` : ''}`),
    process: (period: string) => api.post('/hr/payroll/process', { period }),
    getPayslip: (employeeId: string, period: string) =>
      api.get(`/hr/payroll/payslip/${employeeId}?period=${period}`),
  },
}
