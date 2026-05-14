import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiDollarSign,
  FiUsers,
  FiPackage,
  FiBriefcase,
  FiBarChart2,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
} from 'react-icons/fi'

interface MenuItem {
  label: string
  icon: React.ReactNode
  path?: string
  children?: { label: string; path: string }[]
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <FiHome />,
    path: '/dashboard',
  },
  {
    label: 'Finance',
    icon: <FiDollarSign />,
    children: [
      { label: 'General Ledger', path: '/finance/ledger' },
      { label: 'Payables', path: '/finance/payables' },
      { label: 'Receivables', path: '/finance/receivables' },
      { label: 'Reports', path: '/finance/reports' },
    ],
  },
  {
    label: 'HR',
    icon: <FiUsers />,
    children: [
      { label: 'Employees', path: '/hr/employees' },
      { label: 'Payroll', path: '/hr/payroll' },
      { label: 'Leave', path: '/hr/leave' },
      { label: 'Attendance', path: '/hr/attendance' },
    ],
  },
  {
    label: 'Supply Chain',
    icon: <FiPackage />,
    children: [
      { label: 'Purchase Orders', path: '/supply-chain/purchase-orders' },
      { label: 'Inventory', path: '/supply-chain/inventory' },
      { label: 'Vendors', path: '/supply-chain/vendors' },
      { label: 'Forecasting', path: '/supply-chain/forecasting' },
    ],
  },
  {
    label: 'Projects',
    icon: <FiBriefcase />,
    children: [
      { label: 'Projects', path: '/projects' },
      { label: 'Resource Planning', path: '/projects/resource-planning' },
    ],
  },
  {
    label: 'Reports',
    icon: <FiBarChart2 />,
    path: '/reports',
  },
  {
    label: 'Settings',
    icon: <FiSettings />,
    children: [
      { label: 'General', path: '/settings/general' },
      { label: 'Users', path: '/settings/users' },
      { label: 'Roles', path: '/settings/roles' },
      { label: 'Integrations', path: '/settings/integrations' },
    ],
  },
]

export default function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  return (
    <aside className="w-64 bg-sidebar dark:bg-gray-900 text-white flex-shrink-0 overflow-y-auto transition-colors duration-200 border-r border-gray-800">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Amdox ERP</h2>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.path ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-sidebar-active text-white' : 'text-gray-300 hover:bg-sidebar-hover'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              ) : (
                <div>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-sidebar-hover transition-colors"
                  >
                    <span className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </span>
                    {expandedItems.includes(item.label) ? <FiChevronDown /> : <FiChevronRight />}
                  </button>

                  {expandedItems.includes(item.label) && item.children && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? 'bg-sidebar-active text-white'
                                  : 'text-gray-400 hover:text-white hover:bg-sidebar-hover'
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
