import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import { useModal } from '@/hooks/useModal'

interface InventoryItem {
  id: string
  name: string
  sku: string
  quantity: number
  reorder: number
  warehouse: string
}

export default function SCInventory() {
  const modal = useModal()
  const [items, setItems] = useState<InventoryItem[]>([
    { id: 'ITM-001', name: 'Widget A', sku: 'WDG-A', quantity: 150, reorder: 50, warehouse: 'WH-1' },
    { id: 'ITM-002', name: 'Widget B', sku: 'WDG-B', quantity: 25, reorder: 50, warehouse: 'WH-1' },
    { id: 'ITM-003', name: 'Gadget C', sku: 'GDG-C', quantity: 200, reorder: 30, warehouse: 'WH-2' },
    { id: 'ITM-004', name: 'Component D', sku: 'CMP-D', quantity: 500, reorder: 100, warehouse: 'WH-1' },
    { id: 'ITM-005', name: 'Material E', sku: 'MAT-E', quantity: 15, reorder: 25, warehouse: 'WH-3' },
    { id: 'ITM-006', name: 'Assembly F', sku: 'ASM-F', quantity: 75, reorder: 20, warehouse: 'WH-2' },
  ])

  const [form, setForm] = useState({ name: '', sku: '', quantity: '', reorder: '', warehouse: 'WH-1' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = `ITM-${String(items.length + 1).padStart(3, '0')}`
    const newItem: InventoryItem = { id: num, name: form.name, sku: form.sku, quantity: parseInt(form.quantity), reorder: parseInt(form.reorder), warehouse: form.warehouse }
    setItems((prev) => [...prev, newItem])
    setForm({ name: '', sku: '', quantity: '', reorder: '', warehouse: 'WH-1' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const deleteItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  const lowStockCount = items.filter((i) => i.quantity < i.reorder).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inventory</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{items.length} items · <span className="text-red-500 font-medium">{lowStockCount} low stock</span></p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ Add Item</button>
      </div>

      <AdvancedTable
        data={items}
        columns={[
          { key: 'sku', label: 'SKU', sortable: true, render: (item) => <span className="font-mono text-sm">{item.sku}</span> },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'quantity', label: 'Quantity', sortable: true, render: (item) => (
            <span className={item.quantity < item.reorder ? 'text-red-600 dark:text-red-400 font-bold' : 'text-gray-900 dark:text-gray-100'}>
              {item.quantity}
            </span>
          )},
          { key: 'reorder', label: 'Reorder Level', sortable: true },
          { key: 'warehouse', label: 'Warehouse', sortable: true },
        ]}
        searchFields={['name', 'sku', 'warehouse']}
        renderActions={(item) => (
          <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Delete</button>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add Inventory Item">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} className="input-default" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
            <input type="text" value={form.sku} onChange={(e) => updateField('sku', e.target.value)} className="input-default" required placeholder="e.g. WDG-D" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
              <input type="number" value={form.quantity} onChange={(e) => updateField('quantity', e.target.value)} className="input-default" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reorder Level</label>
              <input type="number" value={form.reorder} onChange={(e) => updateField('reorder', e.target.value)} className="input-default" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warehouse</label>
            <select value={form.warehouse} onChange={(e) => updateField('warehouse', e.target.value)} className="input-default">
              <option value="WH-1">Warehouse 1</option>
              <option value="WH-2">Warehouse 2</option>
              <option value="WH-3">Warehouse 3</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add Item</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
