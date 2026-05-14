export default function ResourcePlanning() {
  const resources = [
    { id: '1', name: 'Alice', type: 'human', allocation: 80, availability: '20%' },
    { id: '2', name: 'Bob', type: 'human', allocation: 60, availability: '40%' },
    { id: '3', name: 'Design Server', type: 'equipment', allocation: 45, availability: '55%' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resource Planning</h1>
        <button className="btn-primary">Add Resource</button>
      </div>

      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Allocation</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Availability</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium">{r.name}</td>
                <td className="py-3 px-4 text-sm capitalize">{r.type}</td>
                <td className="py-3 px-4 text-sm">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${r.allocation > 80 ? 'bg-red-500' : 'bg-primary-500'}`}
                      style={{ width: `${r.allocation}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{r.allocation}%</span>
                </td>
                <td className="py-3 px-4 text-sm">{r.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
