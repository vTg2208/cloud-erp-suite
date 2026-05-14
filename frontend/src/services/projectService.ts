import api from './api'
import type { Project, Task, Resource } from '@/types'

export const projectService = {
  projects: {
    list: () => api.get<Project[]>('/projects'),
    create: (project: Partial<Project>) => api.post('/projects', project),
    update: (id: string, project: Partial<Project>) => api.put(`/projects/${id}`, project),
    delete: (id: string) => api.delete(`/projects/${id}`),
    getById: (id: string) => api.get<Project>(`/projects/${id}`),
  },

  tasks: {
    list: (projectId: string) => api.get<Task[]>(`/projects/${projectId}/tasks`),
    create: (projectId: string, task: Partial<Task>) => api.post(`/projects/${projectId}/tasks`, task),
    update: (projectId: string, id: string, task: Partial<Task>) =>
      api.put(`/projects/${projectId}/tasks/${id}`, task),
    delete: (projectId: string, id: string) => api.delete(`/projects/${projectId}/tasks/${id}`),
  },

  resources: {
    list: () => api.get<Resource[]>('/projects/resources'),
    allocate: (data: { resourceId: string; projectId: string; allocation: number }) =>
      api.post('/projects/resources/allocate', data),
  },
}
