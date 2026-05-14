export interface Project {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  budget: number
  status: 'planning' | 'active' | 'completed' | 'cancelled'
  managerId: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  assigneeId: string
  startDate: string
  dueDate: string
  status: 'todo' | 'in_progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high'
}

export interface Resource {
  id: string
  name: string
  type: 'human' | 'equipment' | 'material'
  allocation: number
  availability: string
}
