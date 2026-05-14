import { createSlice } from '@reduxjs/toolkit'
import type { Notification } from '@/types'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  isOpen: boolean
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isOpen: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter((n: Notification) => !n.isRead).length
    },
    toggleOpen: (state) => {
      state.isOpen = !state.isOpen
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification) {
        notification.isRead = true
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },
  },
})

export const { setNotifications, toggleOpen, markAsRead } = notificationSlice.actions
export default notificationSlice.reducer
