import { useState } from 'react'
import MetricsCard from '@/components/Dashboard/MetricsCard'
import { FiDollarSign, FiUsers, FiPackage, FiTrendingUp, FiActivity, FiClock } from 'react-icons/fi'
import RevenueChart from '@/components/Dashboard/RevenueChart'
import ActivityFeed from '@/components/Dashboard/ActivityFeed'

const defaultMetrics = [
  { label: 'Revenue', value: 125000, change: 12.5, changeType: 'increase' as const },
  { label: 'Employees', value: 142, change: 3.2, changeType: 'increase' as const },
  { label: 'Open Orders', value: 38, change: -5.1, changeType: 'decrease' as const },
  { label: 'Profit Margin', value: 24.5, change: 2.1, changeType: 'increase' as const },
]

export default function Dashboard() {
  const [isLoading] = useState(false)
  const icons = [<FiDollarSign />, <FiUsers />, <FiPackage />, <FiTrendingUp />]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <FiClock />
          <span>Last updated: Today at 10:30 AM</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultMetrics.map((metric, index) => (
            <MetricsCard key={metric.label} metric={metric} icon={icons[index]} />
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
            <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <RevenueChart />
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Feed</h2>
            <FiActivity className="text-gray-400" />
          </div>
          <ActivityFeed />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-left">
              <FiDollarSign size={20} className="mb-2" />
              <p className="text-sm font-medium">Create Invoice</p>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left">
              <FiUsers size={20} className="mb-2" />
              <p className="text-sm font-medium">Add Employee</p>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left">
              <FiPackage size={20} className="mb-2" />
              <p className="text-sm font-medium">New PO</p>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-left">
              <FiTrendingUp size={20} className="mb-2" />
              <p className="text-sm font-medium">Run Report</p>
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            {[
              { task: 'Review Q2 Financial Report', due: 'Today', priority: 'high' },
              { task: 'Approve 3 leave requests', due: 'Today', priority: 'medium' },
              { task: 'Vendor meeting - Acme Corp', due: 'Tomorrow', priority: 'high' },
              { task: 'Update inventory levels', due: 'May 10', priority: 'low' },
              { task: 'Process monthly payroll', due: 'May 15', priority: 'high' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.task}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Due: {item.due}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.priority === 'high'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : item.priority === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
