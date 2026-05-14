import type { Metric } from '@/types'
import { FiArrowUp, FiArrowDown } from 'react-icons/fi'

export default function MetricsCard({
  metric,
  icon,
}: {
  metric: Metric
  icon: React.ReactNode
}) {
  return (
    <div className="card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm">{metric.label}</span>
        <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
          {icon}
        </div>
      </div>

      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {metric.value.toLocaleString()}
      </p>

      <div className="flex items-center mt-3">
        {metric.changeType === 'increase' ? (
          <FiArrowUp className="text-green-500" size={16} />
        ) : (
          <FiArrowDown className="text-red-500" size={16} />
        )}
        <span
          className={`text-sm font-medium ml-1 ${
            metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {metric.change}%
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  )
}
