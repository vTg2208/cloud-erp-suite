import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import type { Employee } from '@/types'
import { useModal } from '@/hooks/useModal'

export default function HREmployees() {
  const modal = useModal()
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@amdox.com', department: 'Engineering', position: 'Senior Developer', hireDate: '2024-03-15', status: 'active' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@amdox.com', department: 'Finance', position: 'Accountant', hireDate: '2024-06-01', status: 'active' },
    { id: '3', firstName: 'Mike', lastName: 'Johnson', email: 'mike@amdox.com', department: 'HR', position: 'HR Manager', hireDate: '2023-11-20', status: 'on_leave' },
    { id: '4', firstName: 'Sarah', lastName: 'Williams', email: 'sarah@amdox.com', department: 'Marketing', position: 'Marketing Lead', hireDate: '2025-01-10', status: 'active' },
  ])

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...form,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'active',
    }
    setEmployees((prev) => [...prev, newEmployee])
    setForm({ firstName: '', lastName: '', email: '', department: '', position: '' })
    modal.close()
  }

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const removeEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employees</h1>
        </div>
        <button onClick={modal.open} className="btn-primary">+ Add Employee</button>
      </div>

      <div className="card">
        <AdvancedTable
          data={employees}
          columns={[
            { key: 'firstName', label: 'Name', sortable: true, render: (emp) => `${emp.firstName} ${emp.lastName}` },
            { key: 'email', label: 'Email', sortable: true },
            { key: 'department', label: 'Department', sortable: true },
            { key: 'position', label: 'Position', sortable: true },
            { key: 'status', label: 'Status', sortable: true, render: (emp) => (
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                emp.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                emp.status === 'inactive' ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' :
                'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
              }`}>
                {emp.status.replace('_', ' ')}
              </span>
            )},
          ]}
          searchFields={['firstName', 'lastName', 'email', 'department', 'position']}
          renderActions={(emp) => (
            <button onClick={() => removeEmployee(emp.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Delete</button>
          )}
        />
      </div>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add New Employee">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                className="input-default"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className="input-default"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="input-default"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
            <select
              value={form.department}
              onChange={(e) => updateField('department', e.target.value)}
              className="input-default"
              required
            >
              <option value="">Select department</option>
              <option value="Engineering">Engineering</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label>
            <input
              type="text"
              value={form.position}
              onChange={(e) => updateField('position', e.target.value)}
              className="input-default"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add Employee</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
