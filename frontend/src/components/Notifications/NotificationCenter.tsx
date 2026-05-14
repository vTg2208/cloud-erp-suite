import { useNotification } from '@/hooks/useNotification'
import { notificationService } from '@/services/notificationService'

export default function NotificationCenter() {
  const { notifications, isOpen, toggle } = useNotification()

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead()
    } catch {
      console.error('Failed to mark all as read')
    }
  }

  if (!isOpen) return null

  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold">Notifications</h3>
        <button onClick={handleMarkAllRead} className="text-sm text-primary-600 hover:underline">
          Mark all read
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-gray-500 text-sm">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={`p-4 border-b border-gray-100 ${n.isRead ? '' : 'bg-blue-50'}`}>
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-gray-500 mt-1">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.createdAt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
