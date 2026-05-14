import { FiDollarSign, FiUser, FiPackage, FiCheck, FiAlertCircle } from 'react-icons/fi'

const activities = [
  { id: '1', icon: <FiDollarSign />, color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', text: 'Payment of $5,000 received from Client A', time: '2 min ago' },
  { id: '2', icon: <FiUser />, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', text: 'New employee Sarah Williams onboarded', time: '15 min ago' },
  { id: '3', icon: <FiPackage />, color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', text: 'Purchase Order PO-0042 approved', time: '1 hour ago' },
  { id: '4', icon: <FiCheck />, color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', text: 'Leave request approved for John Doe', time: '2 hours ago' },
  { id: '5', icon: <FiAlertCircle />, color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400', text: 'Inventory alert: Widget B below reorder level', time: '3 hours ago' },
  { id: '6', icon: <FiDollarSign />, color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400', text: 'Invoice INV-003 is overdue', time: '5 hours ago' },
  { id: '7', icon: <FiPackage />, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', text: 'New vendor Tech Solutions added', time: 'Yesterday' },
]

export default function ActivityFeed() {
  return (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
            {activity.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 dark:text-gray-100">{activity.text}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
