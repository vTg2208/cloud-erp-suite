import { createContext, useContext, useState, useCallback } from 'react'
import { EMPLOYEES as SEED_EMP, PROJECTS as SEED_PROJ, INVENTORY as SEED_INV, TASKS as SEED_TASKS } from '../data/mockData'

const DataContext = createContext(null)

let _empId  = 101
let _projId = 31
let _invId  = 51
let _taskId = 201

export function DataProvider({ children }) {
  const [employees,  setEmployees]  = useState(SEED_EMP)
  const [projects,   setProjects]   = useState(SEED_PROJ)
  const [inventory,  setInventory]  = useState(SEED_INV)
  const [tasks,      setTasks]      = useState(SEED_TASKS)
  const [toast,      setToast]      = useState(null)

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // ── Employees ──────────────────────────────────────────────────────
  const addEmployee = useCallback(data => {
    const id = `EMP${String(_empId++).padStart(3, '0')}`
    const initials = (data.firstName[0] + data.lastName[0]).toUpperCase()
    const COLORS = ['#4f8ef7','#22c55e','#a78bfa','#f59e0b','#ec4899','#14b8a6','#f97316','#06b6d4']
    const newEmp = {
      id, ...data,
      name:     `${data.firstName} ${data.lastName}`,
      email:    data.email || `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}@amdox.com`,
      avatar:   initials,
      color:    COLORS[Math.floor(Math.random() * COLORS.length)],
      score:    Number(data.score) || 80,
      salary:   Number(data.salary) || 60000,
      salaryFmt:`$${Math.round(Number(data.salary)/1000)}K`,
      status:   data.status || 'Active',
      attendance: Number(data.attendance) || 95,
      leaveBalance: Number(data.leaveBalance) || 12,
      projects: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month:'short', year:'numeric' }),
    }
    setEmployees(e => [newEmp, ...e])
    showToast(`Employee ${newEmp.name} added successfully`)
    return newEmp
  }, [showToast])

  const updateEmployee = useCallback((id, data) => {
    setEmployees(e => e.map(emp => emp.id === id
      ? { ...emp, ...data, name: `${data.firstName||emp.firstName} ${data.lastName||emp.lastName}` }
      : emp
    ))
    showToast('Employee updated successfully')
  }, [showToast])

  const deleteEmployee = useCallback(id => {
    setEmployees(e => e.filter(emp => emp.id !== id))
    showToast('Employee removed', 'warning')
  }, [showToast])

  // ── Projects ───────────────────────────────────────────────────────
  const addProject = useCallback(data => {
    const id = `PRJ-${String(_projId++).padStart(3, '0')}`
    const DEPT_COLORS = { Engineering:'#4f8ef7', Sales:'#22c55e', Finance:'#a78bfa', HR:'#f59e0b', Marketing:'#ec4899', Product:'#14b8a6', Design:'#f97316', Operations:'#06b6d4' }
    const newProj = {
      id, ...data,
      budget:    Number(data.budget) || 0,
      budgetFmt: `$${Math.round(Number(data.budget)/1000)}K`,
      budgetUsed: 0,
      deptColor: DEPT_COLORS[data.department] || '#8b5cf6',
      health:    'On Track',
      startDate: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }),
      tasks:     { total: 0, done: 0 },
      team:      Number(data.team) || 1,
    }
    setProjects(p => [newProj, ...p])
    showToast(`Project "${newProj.name}" created`)
    return newProj
  }, [showToast])

  const updateProject = useCallback((id, data) => {
    setProjects(p => p.map(proj => proj.id === id ? { ...proj, ...data } : proj))
    showToast('Project updated successfully')
  }, [showToast])

  const deleteProject = useCallback(id => {
    setProjects(p => p.filter(proj => proj.id !== id))
    showToast('Project deleted', 'warning')
  }, [showToast])

  // ── Inventory ──────────────────────────────────────────────────────
  const addInventoryItem = useCallback(data => {
    const id = `INV-${String(_invId++).padStart(3, '0')}`
    const stock = Number(data.stock) || 0
    const price = Number(data.price) || 0
    const status = stock === 0 ? 'Out of Stock' : stock < 8 ? 'Critical' : stock < 20 ? 'Low Stock' : 'In Stock'
    const newItem = { id, ...data, stock, price, value: stock * price, status }
    setInventory(i => [newItem, ...i])
    showToast(`Item "${newItem.name}" added to inventory`)
    return newItem
  }, [showToast])

  const updateInventoryItem = useCallback((id, data) => {
    setInventory(i => i.map(item => {
      if (item.id !== id) return item
      const stock  = Number(data.stock)  ?? item.stock
      const price  = Number(data.price)  ?? item.price
      const status = stock === 0 ? 'Out of Stock' : stock < 8 ? 'Critical' : stock < 20 ? 'Low Stock' : 'In Stock'
      return { ...item, ...data, stock, price, value: stock * price, status }
    }))
    showToast('Inventory item updated')
  }, [showToast])

  const deleteInventoryItem = useCallback(id => {
    setInventory(i => i.filter(item => item.id !== id))
    showToast('Item removed from inventory', 'warning')
  }, [showToast])

  // ── Tasks ──────────────────────────────────────────────────────────
  const addTask = useCallback(data => {
    const id = `TSK-${String(_taskId++).padStart(4, '0')}`
    setTasks(t => [{ id, ...data, status: data.status || 'todo' }, ...t])
    showToast('Task created')
  }, [showToast])

  const updateTask = useCallback((id, data) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, ...data } : task))
  }, [])

  const deleteTask = useCallback(id => {
    setTasks(t => t.filter(task => task.id !== id))
    showToast('Task deleted', 'warning')
  }, [showToast])

  const moveTask = useCallback((id, newStatus) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, status: newStatus } : task))
  }, [])

  return (
    <DataContext.Provider value={{
      employees, addEmployee, updateEmployee, deleteEmployee,
      projects,  addProject,  updateProject,  deleteProject,
      inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem,
      tasks,     addTask, updateTask, deleteTask, moveTask,
      toast, showToast,
    }}>
      {children}
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 999,
          background: toast.type === 'warning' ? 'var(--amber)' : toast.type === 'error' ? 'var(--red)' : 'var(--green)',
          color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500,
          boxShadow: '0 8px 30px rgba(0,0,0,.3)', animation: 'pageEnter .2s ease',
          display: 'flex', alignItems: 'center', gap: 8, maxWidth: 340,
        }}>
          <span>{toast.type === 'warning' ? '⚠️' : toast.type === 'error' ? '❌' : '✅'}</span>
          {toast.msg}
        </div>
      )}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
