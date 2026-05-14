import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import { useModal } from '@/hooks/useModal'

interface Invoice {
  id: string
  vendor: string
  amount: number
  dueDate: string
  status: 'pending' | 'paid' | 'overdue'
}

export default function FinancePayables() {
  const modal = useModal()
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 'INV-001', vendor: 'Acme Corp', amount: 5000, dueDate: '2026-05-15', status: 'pending' },
    { id: 'INV-002', vendor: 'Global Supplies', amount: 2500, dueDate: '2026-05-10', status: 'overdue' },
    { id: 'INV-003', vendor: 'Tech Solutions', amount: 8000, dueDate: '2026-04-30', status: 'paid' },
    { id: 'INV-004', vendor: 'Office Depot', amount: 450, dueDate: '2026-05-20', status: 'pending' },
    { id: 'INV-005', vendor: 'AWS Cloud', amount: 1200, dueDate: '2026-05-01', status: 'paid' },
    { id: 'INV-006', vendor: 'Legal Services', amount: 3000, dueDate: '2026-05-25', status: 'pending' },
  ])

  const [form, setForm] = useState({ vendor: '', amount: '', dueDate: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = `INV-${String(invoices.length + 1).padStart(3, '0')}`
    const newInv: Invoice = { id: num, vendor: form.vendor, amount: parseFloat(form.amount), dueDate: form.dueDate, status: 'pending' }
    setInvoices((prev) => [newInv, ...prev])
    setForm({ vendor: '', amount: '', dueDate: '' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const deleteInvoice = (id: string) => setInvoices((prev) => prev.filter((i) => i.id !== id))
  const markPaid = (id: string) => setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status: 'paid' } : i))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accounts Payable</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{invoices.length} invoices</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ New Invoice</button>
      </div>

      <AdvancedTable
        data={invoices}
        columns={[
          { key: 'id', label: 'Invoice #', sortable: true },
          { key: 'vendor', label: 'Vendor', sortable: true },
          { key: 'amount', label: 'Amount', sortable: true, render: (inv) => (
            <span className="font-medium text-gray-900 dark:text-gray-100">${inv.amount.toLocaleString()}</span>
          )},
          { key: 'dueDate', label: 'Due Date', sortable: true },
          { key: 'status', label: 'Status', sortable: true, render: (inv) => (
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              inv.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              inv.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {inv.status}
            </span>
          )},
        ]}
        searchFields={['id', 'vendor']}
        renderActions={(inv) => (
          <div className="space-x-2">
            {inv.status === 'pending' && (
              <button onClick={() => markPaid(inv.id)} className="text-green-600 hover:text-green-800 text-sm transition-colors">Mark Paid</button>
            )}
            <button onClick={() => deleteInvoice(inv.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Delete</button>
          </div>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="New Invoice">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vendor</label>
            <select value={form.vendor} onChange={(e) => updateField('vendor', e.target.value)} className="input-default" required>
              <option value="">Select vendor</option>
              <option value="Acme Corp">Acme Corp</option>
              <option value="Global Supplies">Global Supplies</option>
              <option value="Tech Solutions">Tech Solutions</option>
              <option value="Office Depot">Office Depot</option>
              <option value="AWS Cloud">AWS Cloud</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
            <input type="number" step="0.01" value={form.amount} onChange={(e) => updateField('amount', e.target.value)} className="input-default" required placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
            <input type="date" value={form.dueDate} onChange={(e) => updateField('dueDate', e.target.value)} className="input-default" required />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add Invoice</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
