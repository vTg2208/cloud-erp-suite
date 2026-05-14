import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiX } from 'react-icons/fi'

interface CommandItem {
  label: string
  path: string
  category: string
  icon: string
}

const commands: CommandItem[] = [
  { label: 'Dashboard', path: '/dashboard', category: 'Navigation', icon: '📊' },
  { label: 'General Ledger', path: '/finance/ledger', category: 'Finance', icon: '💰' },
  { label: 'Payables', path: '/finance/payables', category: 'Finance', icon: '💵' },
  { label: 'Receivables', path: '/finance/receivables', category: 'Finance', icon: '💳' },
  { label: 'Finance Reports', path: '/finance/reports', category: 'Finance', icon: '📈' },
  { label: 'Employees', path: '/hr/employees', category: 'HR', icon: '👥' },
  { label: 'Payroll', path: '/hr/payroll', category: 'HR', icon: '💼' },
  { label: 'Leave Management', path: '/hr/leave', category: 'HR', icon: '📅' },
  { label: 'Attendance', path: '/hr/attendance', category: 'HR', icon: '⏰' },
  { label: 'Purchase Orders', path: '/supply-chain/purchase-orders', category: 'Supply Chain', icon: '📦' },
  { label: 'Inventory', path: '/supply-chain/inventory', category: 'Supply Chain', icon: '🏪' },
  { label: 'Vendors', path: '/supply-chain/vendors', category: 'Supply Chain', icon: '🏢' },
  { label: 'Forecasting', path: '/supply-chain/forecasting', category: 'Supply Chain', icon: '🔮' },
  { label: 'Projects', path: '/projects', category: 'Projects', icon: '📋' },
  { label: 'Resource Planning', path: '/projects/resource-planning', category: 'Projects', icon: '📊' },
  { label: 'General Settings', path: '/settings/general', category: 'Settings', icon: '⚙️' },
  { label: 'User Management', path: '/settings/users', category: 'Settings', icon: '👤' },
  { label: 'Roles & Permissions', path: '/settings/roles', category: 'Settings', icon: '🔐' },
]

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  )

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {})

  const selectCommand = (cmd: CommandItem) => {
    navigate(cmd.path)
    setIsOpen(false)
    setQuery('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 animate-fade-in overflow-hidden">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4">
          <FiSearch className="text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 px-3 py-4 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
            autoFocus
          />
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
            <FiX size={18} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-2">
              <p className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {category}
              </p>
              {items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => selectCommand(item)}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-gray-900 dark:text-gray-100">{item.label}</span>
                </button>
              ))}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
              No results found
            </p>
          )}
        </div>

        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+K</kbd> to open</span>
          <span><kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  )
}
