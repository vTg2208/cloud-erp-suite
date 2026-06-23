import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [role,  setRole]  = useState('admin')   // admin | manager | employee
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Low Stock Alert',        desc: '8 items below reorder threshold',     time: '2m ago',   unread: true,  type: 'warning' },
    { id: 2, title: 'Project Atlas Milestone',desc: 'Phase 2 completed ahead of schedule', time: '1h ago',   unread: true,  type: 'success' },
    { id: 3, title: 'New Employee Onboarding',desc: '3 new employees starting Monday',     time: '3h ago',   unread: true,  type: 'info' },
    { id: 4, title: 'Q2 Budget Review',       desc: 'Finance report ready for approval',   time: 'Yesterday',unread: false, type: 'info' },
    { id: 5, title: 'Monthly Report Ready',   desc: 'May 2025 comprehensive report done',  time: '2d ago',   unread: false, type: 'info' },
  ])
  const [cmdOpen,  setCmdOpen]  = useState(false)
  const [notifOpen,setNotifOpen]= useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [loading,  setLoading]  = useState(false)

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.className = next
      return next
    })
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(n => n.map(x => ({ ...x, unread: false })))
  }, [])

  const unreadCount = notifications.filter(n => n.unread).length

  const value = {
    theme, toggleTheme,
    role, setRole,
    notifications, markAllRead, unreadCount,
    cmdOpen, setCmdOpen,
    notifOpen, setNotifOpen,
    sidebarCollapsed, setSidebarCollapsed,
    loading, setLoading,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
