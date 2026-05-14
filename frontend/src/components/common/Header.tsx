import { useTheme } from '@/context/ThemeContext'
import NotificationBell from '../Notifications/NotificationBell'
import AIChatWidget from '../common/AIChatWidget'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Amdox ERP</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            title="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <NotificationBell count={3} />

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Demo User</span>
          </div>

          <AIChatWidget />
        </div>
      </div>
    </header>
  )
}
