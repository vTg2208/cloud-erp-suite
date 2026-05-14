export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  hireDate: string
  status: 'active' | 'inactive' | 'on_leave'
}

export interface Leave {
  id: string
  employeeId: string
  type: 'annual' | 'sick' | 'personal' | 'other'
  startDate: string
  endDate: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface Attendance {
  id: string
  employeeId: string
  date: string
  checkIn: string
  checkOut: string
  hours: number
}

export interface Payroll {
  id: string
  employeeId: string
  period: string
  grossPay: number
  deductions: number
  netPay: number
  status: 'draft' | 'processed' | 'paid'
}
