import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import api from '../api'

const DataContext = createContext(null)
const API_URL = 'http://127.0.0.1:8000'

export function DataProvider({ children }) {
  const [employees,  setEmployees]  = useState([])
  const [projects,   setProjects]   = useState([])
  const [inventory,  setInventory]  = useState([])
  const [tasks,      setTasks]      = useState([])
  const [transactions, setTransactions] = useState([])
  const [toast,      setToast]      = useState(null)

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // Initial Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, projRes, invRes, taskRes, finRes] = await Promise.all([
          api.get(`${API_URL}/employees/`),
          api.get(`${API_URL}/projects/`),
          api.get(`${API_URL}/inventory/`),
          api.get(`${API_URL}/tasks/`),
          api.get(`${API_URL}/finance/`)
        ])
        
        // Map Employees
        setEmployees(empRes.data.map(e => ({
          id: e.eid,
          firstName: e.employee_name.split(' ')[0] || '',
          lastName: e.employee_name.split(' ').slice(1).join(' ') || '',
          name: e.employee_name,
          department: e.department,
          email: e.email,
          salary: e.salary,
          salaryFmt: `$${Math.round(Number(e.salary)/1000)}K`,
          joinDate: e.doj,
          avatar: (e.employee_name.split(' ')[0]?.[0] || '') + (e.employee_name.split(' ').slice(1).join(' ')?.[0] || ''),
          color: '#4f8ef7',
          score: 80,
          status: 'Active',
          attendance: 95,
          leaveBalance: 12,
          projects: 0
        })))

        // Map Projects
        setProjects(projRes.data.map(p => ({
          id: p.p_id,
          name: p.project_name,
          department: p.department,
          budget: p.budget,
          budgetFmt: `$${Math.round(Number(p.budget)/1000)}K`,
          team: p.team,
          status: p.status,
          startDate: p.start_date,
          health: 'On Track',
          budgetUsed: 0,
          deptColor: '#4f8ef7',
          tasks: { total: 0, done: 0 }
        })))

        // Map Inventory
        setInventory(invRes.data.map(i => ({
          id: i.item_id,
          name: i.item_name,
          stock: i.quantity,
          price: i.price,
          value: i.quantity * i.price,
          status: i.quantity === 0 ? 'Out of Stock' : i.quantity < 8 ? 'Critical' : i.quantity < 20 ? 'Low Stock' : 'In Stock'
        })))

        // Map Tasks
        setTasks(taskRes.data.map(t => ({
          id: t.t_id,
          title: t.title,
          assignee: t.assignee,
          projectId: t.project_id,
          priority: t.priority,
          status: t.status
        })))
        
        // Map Transactions
        setTransactions(finRes.data.map(f => ({
          id: f.f_id,
          desc: f.description,
          date: f.date,
          type: f.type === 'Income' ? 'credit' : 'debit',
          category: f.catergory,
          amount: f.amount,
          status: f.status
        })))

      } catch (err) {
        console.error("Error fetching data:", err)
        showToast("Error connecting to backend API", "error")
      }
    }
    fetchData()
  }, [showToast])

  // ── Employees ──────────────────────────────────────────────────────
  const addEmployee = useCallback(async (data) => {
    const id = `EMP${Math.floor(Math.random()*10000).toString().padStart(4, '0')}`
    const payload = {
      eid: id,
      employee_name: `${data.firstName} ${data.lastName}`,
      department: data.department || 'General',
      salary: Number(data.salary) || 60000,
      doj: new Date().toISOString().split('T')[0],
      email: data.email || `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}@amdox.com`,
      password: 'defaultpassword123'
    }
    try {
      await api.post(`${API_URL}/employees/`, payload)
      const initials = (data.firstName[0] + data.lastName[0]).toUpperCase()
      const newEmp = {
        id, ...data,
        name: payload.employee_name,
        email: payload.email,
        avatar: initials,
        color: '#4f8ef7',
        score: 80,
        salary: payload.salary,
        salaryFmt: `$${Math.round(payload.salary/1000)}K`,
        status: 'Active',
        attendance: 95,
        leaveBalance: 12,
        projects: 0,
        joinDate: payload.doj,
      }
      setEmployees(e => [newEmp, ...e])
      showToast(`Employee ${newEmp.name} added successfully`)
      return newEmp
    } catch (err) {
      showToast("Error adding employee", "error")
    }
  }, [showToast])

  const updateEmployee = useCallback(async (id, data) => {
    // Backend doesn't have PUT /employees/{id} right now. We'll skip real API call for now or mock it.
    setEmployees(e => e.map(emp => emp.id === id
      ? { ...emp, ...data, name: `${data.firstName||emp.firstName} ${data.lastName||emp.lastName}` }
      : emp
    ))
    showToast('Employee updated successfully (Local Only)')
  }, [showToast])

  const deleteEmployee = useCallback(async (id) => {
    try {
      await api.delete(`${API_URL}/employees/${id}`)
      setEmployees(e => e.filter(emp => emp.id !== id))
      showToast('Employee removed', 'warning')
    } catch (err) {
      showToast('Error deleting employee', 'error')
    }
  }, [showToast])

  // ── Projects ───────────────────────────────────────────────────────
  const addProject = useCallback(async (data) => {
    const id = `PRJ-${Math.floor(Math.random()*1000).toString().padStart(3, '0')}`
    const payload = {
      p_id: id,
      project_name: data.name,
      department: data.department || 'Engineering',
      budget: Number(data.budget) || 0,
      team: Number(data.team) || 1,
      status: 'Active',
      start_date: new Date().toISOString().split('T')[0]
    }
    try {
      await api.post(`${API_URL}/projects/`, payload)
      const newProj = {
        id, ...data,
        budget: payload.budget,
        budgetFmt: `$${Math.round(payload.budget/1000)}K`,
        budgetUsed: 0,
        deptColor: '#4f8ef7',
        health: 'On Track',
        startDate: payload.start_date,
        tasks: { total: 0, done: 0 },
        team: payload.team,
      }
      setProjects(p => [newProj, ...p])
      showToast(`Project "${newProj.name}" created`)
      return newProj
    } catch (err) {
      showToast("Error creating project", "error")
    }
  }, [showToast])

  const updateProject = useCallback((id, data) => {
    setProjects(p => p.map(proj => proj.id === id ? { ...proj, ...data } : proj))
    showToast('Project updated (Local Only)')
  }, [showToast])

  const deleteProject = useCallback(async (id) => {
    try {
      await api.delete(`${API_URL}/projects/${id}`)
      setProjects(p => p.filter(proj => proj.id !== id))
      showToast('Project deleted', 'warning')
    } catch (err) {
      showToast('Error deleting project', 'error')
    }
  }, [showToast])

  // ── Inventory ──────────────────────────────────────────────────────
  const addInventoryItem = useCallback(async (data) => {
    const id = `INV-${Math.floor(Math.random()*1000).toString().padStart(3, '0')}`
    const payload = {
      item_id: id,
      item_name: data.name,
      quantity: Number(data.stock) || 0,
      price: Number(data.price) || 0
    }
    try {
      await api.post(`${API_URL}/inventory/`, payload)
      const stock = payload.quantity
      const price = payload.price
      const status = stock === 0 ? 'Out of Stock' : stock < 8 ? 'Critical' : stock < 20 ? 'Low Stock' : 'In Stock'
      const newItem = { id, ...data, stock, price, value: stock * price, status }
      setInventory(i => [newItem, ...i])
      showToast(`Item "${newItem.name}" added to inventory`)
      return newItem
    } catch (err) {
      showToast("Error adding inventory", "error")
    }
  }, [showToast])

  const updateInventoryItem = useCallback(async (id, data) => {
    try {
      const stock = Number(data.stock)
      const price = Number(data.price)
      await api.put(`${API_URL}/inventory/${id}`, {
        item_name: data.name,
        quantity: stock,
        price: price
      })
      setInventory(i => i.map(item => {
        if (item.id !== id) return item
        const s = stock ?? item.stock
        const p = price ?? item.price
        const status = s === 0 ? 'Out of Stock' : s < 8 ? 'Critical' : s < 20 ? 'Low Stock' : 'In Stock'
        return { ...item, ...data, stock: s, price: p, value: s * p, status }
      }))
      showToast('Inventory item updated')
    } catch (err) {
      showToast('Error updating inventory', 'error')
    }
  }, [showToast])

  const deleteInventoryItem = useCallback(async (id) => {
    try {
      await api.delete(`${API_URL}/inventory/${id}`)
      setInventory(i => i.filter(item => item.id !== id))
      showToast('Item removed from inventory', 'warning')
    } catch (err) {
      showToast('Error deleting inventory item', 'error')
    }
  }, [showToast])

  // ── Tasks ──────────────────────────────────────────────────────────
  const addTask = useCallback(async (data) => {
    const id = `TSK-${Math.floor(Math.random()*10000).toString().padStart(4, '0')}`
    const payload = {
      t_id: id,
      title: data.title,
      assignee: data.assignee || 'Unassigned',
      project_id: data.projectId || '',
      priority: data.priority || 'Medium',
      status: data.status || 'todo'
    }
    try {
      await api.post(`${API_URL}/tasks/`, payload)
      setTasks(t => [{ id, ...data, status: payload.status }, ...t])
      showToast('Task created')
    } catch (err) {
      showToast('Error creating task', 'error')
    }
  }, [showToast])

  const updateTask = useCallback((id, data) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, ...data } : task))
  }, [])

  const deleteTask = useCallback(async (id) => {
    try {
      await api.delete(`${API_URL}/tasks/${id}`)
      setTasks(t => t.filter(task => task.id !== id))
      showToast('Task deleted', 'warning')
    } catch (err) {
      showToast('Error deleting task', 'error')
    }
  }, [showToast])

  const moveTask = useCallback(async (id, newStatus) => {
    try {
      await api.put(`${API_URL}/tasks/${id}?status=${newStatus}`)
      setTasks(t => t.map(task => task.id === id ? { ...task, status: newStatus } : task))
    } catch (err) {
      showToast('Error moving task', 'error')
    }
  }, [showToast])

  // ── Finance ────────────────────────────────────────────────────────
  const addTransaction = useCallback(async (data) => {
    const id = `TXN-${Math.floor(Math.random()*10000).toString().padStart(4, '0')}`
    const payload = {
      f_id: id,
      description: data.desc,
      date: data.date || new Date().toISOString().split('T')[0],
      type: data.type === 'credit' ? 'Income' : 'Expense',
      catergory: data.category,
      amount: Number(data.amount),
      status: data.status || 'Completed'
    }
    try {
      await api.post(`${API_URL}/finance/`, payload)
      setTransactions(t => [{ id, ...data, amount: payload.amount }, ...t])
      showToast('Transaction recorded')
    } catch (err) {
      showToast('Error recording transaction', 'error')
    }
  }, [showToast])

  const deleteTransaction = useCallback(async (id) => {
    try {
      await api.delete(`${API_URL}/finance/${id}`)
      setTransactions(t => t.filter(tx => tx.id !== id))
      showToast('Transaction deleted', 'warning')
    } catch (err) {
      showToast('Error deleting transaction', 'error')
    }
  }, [showToast])

  return (
    <DataContext.Provider value={{
      employees, addEmployee, updateEmployee, deleteEmployee,
      projects,  addProject,  updateProject,  deleteProject,
      inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem,
      tasks,     addTask, updateTask, deleteTask, moveTask,
      transactions, addTransaction, deleteTransaction,
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
