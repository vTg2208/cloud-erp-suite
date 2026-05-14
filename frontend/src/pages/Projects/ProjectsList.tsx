import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '@/components/common/Modal'
import { useModal } from '@/hooks/useModal'

interface Project {
  id: string
  name: string
  startDate: string
  endDate: string
  budget: number
  status: 'planning' | 'active' | 'completed' | 'cancelled'
}

export default function ProjectsList() {
  const modal = useModal()
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Website Redesign', startDate: '2026-03-01', endDate: '2026-06-30', budget: 50000, status: 'active' },
    { id: '2', name: 'Mobile App', startDate: '2026-04-15', endDate: '2026-09-30', budget: 75000, status: 'planning' },
    { id: '3', name: 'ERP Integration', startDate: '2026-01-01', endDate: '2026-04-30', budget: 100000, status: 'completed' },
  ])

  const [form, setForm] = useState({ name: '', budget: '', endDate: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: Project = {
      id: Date.now().toString(),
      name: form.name,
      startDate: new Date().toISOString().split('T')[0],
      endDate: form.endDate,
      budget: parseFloat(form.budget),
      status: 'planning',
    }
    setProjects((prev) => [...prev, newProject])
    setForm({ name: '', budget: '', endDate: '' })
    modal.close()
  }

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const deleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{projects.length} projects</p>
        </div>
        <button onClick={modal.open} className="btn-primary">+ New Project</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
            <div className="flex items-start justify-between mb-3">
              <Link to={`/projects/${p.id}`} className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                {p.name}
              </Link>
              <button onClick={() => deleteProject(p.id)} className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                ✕
              </button>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Timeline</span>
                <span className="text-gray-600 dark:text-gray-300">{p.startDate} → {p.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Budget</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">${p.budget.toLocaleString()}</span>
              </div>
            </div>
            <span className={`inline-block mt-3 px-2 py-1 text-xs rounded-full ${
              p.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              p.status === 'planning' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
              p.status === 'completed' ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' :
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}>
              {p.status}
            </span>
          </div>
        ))}
      </div>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title="New Project">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
            <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} className="input-default" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label>
            <input type="number" step="0.01" value={form.budget} onChange={(e) => updateField('budget', e.target.value)} className="input-default" required placeholder="0.00" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input type="date" value={form.endDate} onChange={(e) => updateField('endDate', e.target.value)} className="input-default" required />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={modal.close} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Create Project</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
