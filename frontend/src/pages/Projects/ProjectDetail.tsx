import { useParams, Link } from 'react-router-dom'

export default function ProjectDetail() {
  const { id } = useParams()

  const project = {
    id,
    name: 'Website Redesign',
    description: 'Complete redesign of the company website',
    startDate: '2026-03-01',
    endDate: '2026-06-30',
    budget: 50000,
    status: 'active',
  }

  const tasks = [
    { id: '1', title: 'Wireframes', assignee: 'Alice', status: 'done', priority: 'high' },
    { id: '2', title: 'UI Design', assignee: 'Bob', status: 'in_progress', priority: 'high' },
    { id: '3', title: 'Frontend Dev', assignee: 'Charlie', status: 'todo', priority: 'medium' },
  ]

  return (
    <div>
      <Link to="/projects" className="text-primary-600 hover:underline mb-4 inline-block">
        &larr; Back to Projects
      </Link>

      <div className="card mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h1>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Start</span>
            <p className="font-medium">{project.startDate}</p>
          </div>
          <div>
            <span className="text-gray-500">End</span>
            <p className="font-medium">{project.endDate}</p>
          </div>
          <div>
            <span className="text-gray-500">Budget</span>
            <p className="font-medium">${project.budget.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-gray-500">Status</span>
            <p className="font-medium capitalize">{project.status}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Tasks</h2>
        <div className="space-y-2">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="text-sm text-gray-500">Assignee: {t.assignee}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    t.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {t.priority}
                </span>
                <span className="capitalize text-sm">{t.status.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
