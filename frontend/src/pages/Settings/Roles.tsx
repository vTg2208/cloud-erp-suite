import { useState } from 'react'
import Modal from '@/components/common/Modal'
import AdvancedTable from '@/components/common/AdvancedTable'
import { useModal } from '@/hooks/useModal'

interface Role {
  id: string
  name: string
  permissions: string
  users: number
}

export default function SettingsRoles() {
  const modal = useModal()
  const [roles, setRoles] = useState<Role[]>([
    { id: '1', name: 'Admin', permissions: 'Full Access', users: 2 },
    { id: '2', name: 'Manager', permissions: 'Manage Teams, Reports', users: 5 },
    { id: '3', name: 'User', permissions: 'View, Create', users: 20 },
    { id: '4', name: 'Viewer', permissions: 'View Only', users: 10 },
  ])

  const [form, setForm] = useState({ name: '', permissions: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRole: Role = { id: Date.now().toString(), name: form.name, permissions: form.permissions, users: 0 }
    setRoles((prev) => [...prev, newRole])
    setForm({ name: '', permissions: '' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const deleteRole = (id: string) => setRoles((prev) => prev.filter((r) => r.id !== id))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roles & Permissions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{roles.length} roles</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ Add Role</button>
      </div>

      <AdvancedTable
        data={roles}
        columns={[
          { key: 'name', label: 'Role', sortable: true },
          { key: 'permissions', label: 'Permissions', sortable: false },
          { key: 'users', label: 'Users', sortable: true },
        ]}
        searchFields={['name', 'permissions']}
        renderActions={(r) => (
          <button onClick={() => deleteRole(r.id)} className="text-red-500 hover:text-red-700 text-sm transition-colors">Delete</button>
        )}
      />

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Add New Role">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Name</label>
            <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} className="input-default" required placeholder="e.g. Analyst" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Permissions</label>
            <textarea value={form.permissions} onChange={(e) => updateField('permissions', e.target.value)} className="input-default" rows={3} placeholder="e.g. View Reports, Manage Data" required />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Add Role</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
