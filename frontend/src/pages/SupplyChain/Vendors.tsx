import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import { useModal } from '@/hooks/useModal'

interface Vendor {
  id: string
  name: string
  contact: string
  email: string
  rating: number
  status: 'active' | 'inactive'
}

export default function SCVendors() {
  const modal = useModal()
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: 'VND-001', name: 'Acme Corp', contact: 'John Smith', email: 'john@acme.com', rating: 4.5, status: 'active' },
    { id: 'VND-002', name: 'Global Supplies', contact: 'Sarah Lee', email: 'sarah@global.com', rating: 4.0, status: 'active' },
    { id: 'VND-003', name: 'Tech Solutions', contact: 'Mike Brown', email: 'mike@tech.com', rating: 3.5, status: 'inactive' },
    { id: 'VND-004', name: 'Office Depot', contact: 'Amy White', email: 'amy@officedepot.com', rating: 4.2, status: 'active' },
    { id: 'VND-005', name: 'SteelWorks Inc', contact: 'Robert Green', email: 'robert@steelworks.com', rating: 3.8, status: 'active' },
  ])

  const [form, setForm] = useState({ name: '', contact: '', email: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = `VND-${String(vendors.length + 1).padStart(3, '0')}`
    const newVendor: Vendor = { id: num, name: form.name, contact: form.contact, email: form.email, rating: 0, status: 'active' }
    setVendors((prev) => [...prev, newVendor])
    setForm({ name: '', contact: '', email: '' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const deleteVendor = (id: string) => setVendors((prev) => prev.filter((v) => v.id !== id))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendors</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{vendors.length} vendors</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ Add Vendor</button>
      </div>

      <AdvancedTable
        data={vendors}
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'contact', label: 'Contact', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'rating', label: 'Rating', sortable: true, render: (v) => (
            <span className="text-yellow-500">{'★'.repeat(Math.floor(v.rating))}</span>
          )},
          { key: 'status', label: 'Status', sortable: true, render: (v) => (
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              v.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
              {v.status}
            </span>
          )},
        ]}
        searchFields={['name', 'contact', 'email']}
        renderActions={(v) => (
          <button onClick={() => deleteVendor(v.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Delete</button>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add New Vendor">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
            <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} className="input-default" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person</label>
            <input type="text" value={form.contact} onChange={(e) => updateField('contact', e.target.value)} className="input-default" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} className="input-default" required />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add Vendor</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
