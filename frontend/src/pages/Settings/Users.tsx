import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import { useModal } from '@/hooks/useModal'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

export default function SettingsUsers() {
  const modal = useModal()
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Admin User', email: 'admin@amdox.com', role: 'Admin', status: 'active' },
    { id: '2', name: 'John Doe', email: 'john@amdox.com', role: 'Manager', status: 'active' },
    { id: '3', name: 'Jane Smith', email: 'jane@amdox.com', role: 'User', status: 'inactive' },
    { id: '4', name: 'Mike Johnson', email: 'mike@amdox.com', role: 'User', status: 'active' },
    { id: '5', name: 'Sarah Williams', email: 'sarah@amdox.com', role: 'Manager', status: 'active' },
    { id: '6', name: 'Tom Wilson', email: 'tom@amdox.com', role: 'Viewer', status: 'inactive' },
  ])

  const [form, setForm] = useState({ name: '', email: '', role: 'User' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: User = { id: Date.now().toString(), ...form, status: 'active' }
    setUsers((prev) => [...prev, newUser])
    setForm({ name: '', email: '', role: 'User' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const deleteUser = (id: string) => setUsers((prev) => prev.filter((u) => u.id !== id))
  const toggleStatus = (id: string) => setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{users.length} users</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ Add User</button>
      </div>

      <AdvancedTable
        data={users}
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'role', label: 'Role', sortable: true },
          { key: 'status', label: 'Status', sortable: true, render: (u) => (
            <button onClick={() => toggleStatus(u.id)} className={`inline-block px-2 py-1 text-xs rounded-full transition-colors ${
              u.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
            }`}>
              {u.status}
            </button>
          )},
        ]}
        searchFields={['name', 'email']}
        renderActions={(u) => (
          <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Delete</button>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add New User">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} className="input-default" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} className="input-default" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
            <select value={form.role} onChange={(e) => updateField('role', e.target.value)} className="input-default">
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add User</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
