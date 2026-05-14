import { FiBell } from 'react-icons/fi'

export default function NotificationBell({ count }: { count: number }) {
  return (
    <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
      <FiBell size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
