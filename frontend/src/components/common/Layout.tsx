import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import CommandPalette from './CommandPalette'

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  )
}
