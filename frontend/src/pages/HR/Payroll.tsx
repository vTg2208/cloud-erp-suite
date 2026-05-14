import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import { useModal } from '@/hooks/useModal'

interface Payroll {
  id: string
  employee: string
  period: string
  grossPay: number
  netPay: number
  status: 'draft' | 'processed' | 'paid'
}

export default function HRPayroll() {
  const modal = useModal()
  const [payrolls, setPayrolls] = useState<Payroll[]>([
    { id: 'PR-001', employee: 'John Doe', period: 'April 2026', grossPay: 5000, netPay: 4200, status: 'paid' },
    { id: 'PR-002', employee: 'Jane Smith', period: 'April 2026', grossPay: 6000, netPay: 5100, status: 'processed' },
    { id: 'PR-003', employee: 'Mike Johnson', period: 'April 2026', grossPay: 4500, netPay: 3800, status: 'draft' },
    { id: 'PR-004', employee: 'Sarah Williams', period: 'April 2026', grossPay: 5500, netPay: 4650, status: 'paid' },
    { id: 'PR-005', employee: 'Tom Wilson', period: 'April 2026', grossPay: 7000, netPay: 5900, status: 'processed' },
  ])

  const [form, setForm] = useState({ employee: '', grossPay: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const gross = parseFloat(form.grossPay)
    const net = gross * 0.84
    const num = `PR-${String(payrolls.length + 1).padStart(3, '0')}`
    const newPayroll: Payroll = { id: num, employee: form.employee, period: 'May 2026', grossPay: gross, netPay, status: 'draft' }
    setPayrolls((prev) => [...prev, newPayroll])
    setForm({ employee: '', grossPay: '' })
    modal.close()
  }

  const processPayroll = (id: string) => setPayrolls((prev) => prev.map((p) => p.id === id ? { ...p, status: 'processed' } : p))
  const markPaid = (id: string) => setPayrolls((prev) => prev.map((p) => p.id === id ? { ...p, status: 'paid' } : p))
  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{payrolls.length} payrolls</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ Add Payroll</button>
      </div>

      <AdvancedTable
        data={payrolls}
        columns={[
          { key: 'id', label: 'ID', sortable: true },
          { key: 'employee', label: 'Employee', sortable: true },
          { key: 'period', label: 'Period', sortable: true },
          { key: 'grossPay', label: 'Gross Pay', sortable: true, render: (p) => <span className="text-gray-900 dark:text-gray-100">${p.grossPay.toLocaleString()}</span> },
          { key: 'netPay', label: 'Net Pay', sortable: true, render: (p) => <span className="font-medium text-green-600 dark:text-green-400">${p.netPay.toLocaleString()}</span> },
          { key: 'status', label: 'Status', sortable: true, render: (p) => (
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              p.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              p.status === 'processed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
              'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
              {p.status}
            </span>
          )},
        ]}
        searchFields={['id', 'employee', 'period']}
        renderActions={(p) => (
          <div className="space-x-2">
            {p.status === 'draft' && (
              <button onClick={() => processPayroll(p.id)} className="text-blue-600 hover:text-blue-800 text-sm transition-colors">Process</button>
            )}
            {p.status === 'processed' && (
              <button onClick={() => markPaid(p.id)} className="text-green-600 hover:text-green-800 text-sm transition-colors">Mark Paid</button>
            )}
          </div>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add Payroll Entry">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee</label>
            <select value={form.employee} onChange={(e) => updateField('employee', e.target.value)} className="input-default" required>
              <option value="">Select employee</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
              <option value="Sarah Williams">Sarah Williams</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gross Pay</label>
            <input type="number" step="0.01" value={form.grossPay} onChange={(e) => updateField('grossPay', e.target.value)} className="input-default" required placeholder="0.00" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add Payroll</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
