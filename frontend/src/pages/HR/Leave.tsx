import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import { useModal } from '@/hooks/useModal'

interface Leave {
  id: string
  employee: string
  type: string
  start: string
  end: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function HRLeave() {
  const modal = useModal()
  const [leaves, setLeaves] = useState<Leave[]>([
    { id: 'LV-001', employee: 'John Doe', type: 'Annual', start: '2026-05-10', end: '2026-05-14', status: 'approved' },
    { id: 'LV-002', employee: 'Jane Smith', type: 'Sick', start: '2026-05-05', end: '2026-05-06', status: 'approved' },
    { id: 'LV-003', employee: 'Mike Johnson', type: 'Personal', start: '2026-05-20', end: '2026-05-21', status: 'pending' },
    { id: 'LV-004', employee: 'Sarah Williams', type: 'Annual', start: '2026-06-01', end: '2026-06-05', status: 'pending' },
    { id: 'LV-005', employee: 'Tom Wilson', type: 'Sick', start: '2026-04-28', end: '2026-04-29', status: 'rejected' },
  ])

  const [form, setForm] = useState({ employee: '', type: 'Annual', start: '', end: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = `LV-${String(leaves.length + 1).padStart(3, '0')}`
    const newLeave: Leave = { id: num, ...form, status: 'pending' }
    setLeaves((prev) => [...prev, newLeave])
    setForm({ employee: '', type: 'Annual', start: '', end: '' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const approveLeave = (id: string) => setLeaves((prev) => prev.map((l) => l.id === id ? { ...l, status: 'approved' } : l))
  const rejectLeave = (id: string) => setLeaves((prev) => prev.map((l) => l.id === id ? { ...l, status: 'rejected' } : l))
  const deleteLeave = (id: string) => setLeaves((prev) => prev.filter((l) => l.id !== id))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{leaves.length} requests</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ Request Leave</button>
      </div>

      <AdvancedTable
        data={leaves}
        columns={[
          { key: 'employee', label: 'Employee', sortable: true },
          { key: 'type', label: 'Type', sortable: true },
          { key: 'start', label: 'Start Date', sortable: true },
          { key: 'end', label: 'End Date', sortable: true },
          { key: 'status', label: 'Status', sortable: true, render: (l) => (
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              l.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              l.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {l.status}
            </span>
          )},
        ]}
        searchFields={['employee', 'type']}
        renderActions={(l) => (
          <div className="space-x-2">
            {l.status === 'pending' && (
              <>
                <button onClick={() => approveLeave(l.id)} className="text-green-600 hover:text-green-800 text-sm transition-colors">Approve</button>
                <button onClick={() => rejectLeave(l.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Reject</button>
              </>
            )}
            <button onClick={() => deleteLeave(l.id)} className="text-gray-400 hover:text-red-500 text-sm transition-colors">Delete</button>
          </div>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Request Leave">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leave Type</label>
            <select value={form.type} onChange={(e) => updateField('type', e.target.value)} className="input-default">
              <option value="Annual">Annual</option>
              <option value="Sick">Sick</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
              <input type="date" value={form.start} onChange={(e) => updateField('start', e.target.value)} className="input-default" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
              <input type="date" value={form.end} onChange={(e) => updateField('end', e.target.value)} className="input-default" required />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Submit Request</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
