import api from './api'
import type { Notification, NotificationPreferences } from '@/types'

export const notificationService = {
  list: () => api.get<Notification[]>('/notifications'),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  getPreferences: () => api.get<NotificationPreferences>('/notifications/preferences'),
  updatePreferences: (prefs: NotificationPreferences) =>
    api.put('/notifications/preferences', prefs),
  getUnreadCount: () => api.get<{ count: number }>('/notifications/unread-count'),
}
