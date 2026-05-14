export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  isRead: boolean
  createdAt: string
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  inApp: boolean
}
