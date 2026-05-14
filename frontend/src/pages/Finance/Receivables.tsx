export default function FinanceReceivables() {
  const invoices = [
    { id: 'INV-101', customer: 'Client A', amount: 12000, dueDate: '2026-05-20', status: 'pending' },
    { id: 'INV-102', customer: 'Client B', amount: 7500, dueDate: '2026-05-12', status: 'paid' },
    { id: 'INV-103', customer: 'Client C', amount: 3200, dueDate: '2026-04-28', status: 'overdue' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accounts Receivable</h1>
        <button className="btn-primary">New Invoice</button>
      </div>

      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Invoice #</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{inv.id}</td>
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{inv.customer}</td>
                <td className="py-3 px-4 text-sm text-right text-gray-900 dark:text-gray-100">${inv.amount.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{inv.dueDate}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    inv.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    inv.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
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
