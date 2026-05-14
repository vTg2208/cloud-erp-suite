import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import type { JournalEntry } from '@/types'
import { useModal } from '@/hooks/useModal'

export default function FinanceLedger() {
  const modal = useModal()
  const [entries, setEntries] = useState<JournalEntry[]>([
    { id: '1', date: '2026-05-01', description: 'Office Supplies', debitAccount: '6100', creditAccount: '1010', amount: 250, currency: 'USD', status: 'posted' },
    { id: '2', date: '2026-05-03', description: 'Client Payment - ABC Corp', debitAccount: '1010', creditAccount: '4000', amount: 5000, currency: 'USD', status: 'posted' },
    { id: '3', date: '2026-05-05', description: 'Software License', debitAccount: '6200', creditAccount: '1010', amount: 1200, currency: 'USD', status: 'draft' },
    { id: '4', date: '2026-05-06', description: 'Consulting Fee', debitAccount: '5100', creditAccount: '2010', amount: 3500, currency: 'USD', status: 'posted' },
    { id: '5', date: '2026-05-07', description: 'Rent Payment', debitAccount: '6300', creditAccount: '1010', amount: 4000, currency: 'USD', status: 'posted' },
    { id: '6', date: '2026-05-08', description: 'Insurance Premium', debitAccount: '6400', creditAccount: '1010', amount: 800, currency: 'USD', status: 'draft' },
    { id: '7', date: '2026-05-09', description: 'Sales Revenue', debitAccount: '1010', creditAccount: '4000', amount: 12000, currency: 'USD', status: 'posted' },
    { id: '8', date: '2026-05-10', description: 'Equipment Purchase', debitAccount: '1500', creditAccount: '1010', amount: 3200, currency: 'USD', status: 'posted' },
  ])

  const [form, setForm] = useState({ description: '', debitAccount: '', creditAccount: '', amount: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...form,
      amount: parseFloat(form.amount),
      currency: 'USD',
      status: 'draft',
    }
    setEntries((prev) => [newEntry, ...prev])
    setForm({ description: '', debitAccount: '', creditAccount: '', amount: '' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const deleteEntry = (id: string) => setEntries((prev) => prev.filter((entry) => entry.id !== id))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">General Ledger</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{entries.length} entries</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ New Entry</button>
      </div>

      <AdvancedTable
        data={entries}
        columns={[
          { key: 'date', label: 'Date', sortable: true },
          { key: 'description', label: 'Description', sortable: true },
          { key: 'debitAccount', label: 'Debit Account', sortable: true },
          { key: 'creditAccount', label: 'Credit Account', sortable: true },
          { key: 'amount', label: 'Amount', sortable: true, render: (entry) => (
            <span className="font-medium text-gray-900 dark:text-gray-100">${entry.amount.toLocaleString()}</span>
          )},
          { key: 'status', label: 'Status', sortable: true, render: (entry) => (
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              entry.status === 'posted' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              entry.status === 'draft' ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' :
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {entry.status}
            </span>
          )},
        ]}
        searchFields={['description', 'debitAccount', 'creditAccount']}
        renderActions={(entry) => (
          <button onClick={() => deleteEntry(entry.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Delete</button>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="New Ledger Entry">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <input type="text" value={form.description} onChange={(e) => updateField('description', e.target.value)} className="input-default" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Debit Account</label>
              <input type="text" value={form.debitAccount} onChange={(e) => updateField('debitAccount', e.target.value)} className="input-default" required placeholder="e.g. 6100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credit Account</label>
              <input type="text" value={form.creditAccount} onChange={(e) => updateField('creditAccount', e.target.value)} className="input-default" required placeholder="e.g. 1010" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
            <input type="number" step="0.01" value={form.amount} onChange={(e) => updateField('amount', e.target.value)} className="input-default" required placeholder="0.00" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add Entry</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
