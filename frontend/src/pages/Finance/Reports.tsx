export default function FinanceReceivables() {
  const invoices = [
    { id: 'INV-101', customer: 'Client A', amount: 12000, dueDate: '2026-05-20', status: 'pending' },
    { id: 'INV-102', customer: 'Client B', amount: 7500, dueDate: '2026-05-12', status: 'paid' },
    { id: 'INV-103', customer: 'Client C', amount: 3200, dueDate: '2026-04-28', status: 'overdue' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Accounts Receivable</h1>
        <button className="btn-primary">New Invoice</button>
      </div>

      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Invoice #</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Due Date</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{inv.id}</td>
                <td className="py-3 px-4 text-sm">{inv.customer}</td>
                <td className="py-3 px-4 text-sm text-right">${inv.amount.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm">{inv.dueDate}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      inv.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : inv.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
