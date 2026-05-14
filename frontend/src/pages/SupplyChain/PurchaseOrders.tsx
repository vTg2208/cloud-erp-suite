import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import { useModal } from '@/hooks/useModal'

interface PO {
  id: string
  number: string
  vendor: string
  amount: number
  orderDate: string
  status: 'draft' | 'approved' | 'shipped' | 'received' | 'cancelled'
}

export default function SCPurchaseOrders() {
  const modal = useModal()
  const [orders, setOrders] = useState<PO[]>([
    { id: 'PO-001', number: 'PO-001', vendor: 'Acme Corp', amount: 15000, orderDate: '2026-05-01', status: 'approved' },
    { id: 'PO-002', number: 'PO-002', vendor: 'Global Supplies', amount: 8500, orderDate: '2026-05-03', status: 'draft' },
    { id: 'PO-003', number: 'PO-003', vendor: 'Tech Solutions', amount: 22000, orderDate: '2026-05-05', status: 'shipped' },
    { id: 'PO-004', number: 'PO-004', vendor: 'Office Depot', amount: 1200, orderDate: '2026-05-07', status: 'received' },
    { id: 'PO-005', number: 'PO-005', vendor: 'SteelWorks Inc', amount: 45000, orderDate: '2026-05-08', status: 'approved' },
    { id: 'PO-006', number: 'PO-006', vendor: 'LogiTrans', amount: 3200, orderDate: '2026-05-09', status: 'draft' },
  ])

  const [form, setForm] = useState({ vendor: '', amount: '', items: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = `PO-${String(orders.length + 1).padStart(3, '0')}`
    const newPO: PO = { id: num, number: num, vendor: form.vendor, amount: parseFloat(form.amount), orderDate: new Date().toISOString().split('T')[0], status: 'draft' }
    setOrders((prev) => [...prev, newPO])
    setForm({ vendor: '', amount: '', items: '' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const deletePO = (id: string) => setOrders((prev) => prev.filter((o) => o.id !== id))
  const approvePO = (id: string) => setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: 'approved' as const } : o))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Purchase Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{orders.length} orders</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ Create PO</button>
      </div>

      <AdvancedTable
        data={orders}
        columns={[
          { key: 'number', label: 'PO #', sortable: true },
          { key: 'vendor', label: 'Vendor', sortable: true },
          { key: 'amount', label: 'Amount', sortable: true, render: (po) => (
            <span className="font-medium text-gray-900 dark:text-gray-100">${po.amount.toLocaleString()}</span>
          )},
          { key: 'orderDate', label: 'Date', sortable: true },
          { key: 'status', label: 'Status', sortable: true, render: (po) => (
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              po.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              po.status === 'draft' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
              po.status === 'shipped' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
              po.status === 'received' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
              'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
              {po.status}
            </span>
          )},
        ]}
        searchFields={['number', 'vendor']}
        renderActions={(po) => (
          <div className="space-x-2">
            {po.status === 'draft' && (
              <button onClick={() => approvePO(po.id)} className="text-green-600 hover:text-green-800 text-sm transition-colors">Approve</button>
            )}
            <button onClick={() => deletePO(po.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Delete</button>
          </div>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Create Purchase Order">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vendor</label>
            <select value={form.vendor} onChange={(e) => updateField('vendor', e.target.value)} className="input-default" required>
              <option value="">Select vendor</option>
              <option value="Acme Corp">Acme Corp</option>
              <option value="Global Supplies">Global Supplies</option>
              <option value="Tech Solutions">Tech Solutions</option>
              <option value="Office Depot">Office Depot</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
            <input type="number" step="0.01" value={form.amount} onChange={(e) => updateField('amount', e.target.value)} className="input-default" required placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Items Description</label>
            <textarea value={form.items} onChange={(e) => updateField('items', e.target.value)} className="input-default" rows={3} placeholder="List items..." />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Create PO</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
