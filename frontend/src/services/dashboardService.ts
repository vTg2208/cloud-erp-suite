import api from './api'
import type { Dashboard, Metric } from '@/types'

export const dashboardService = {
  getDashboard: () => api.get<Dashboard>('/dashboard'),
  getMetrics: () => api.get<{ metrics: Metric[] }>('/dashboard/metrics'),
  getWidgets: () => api.get('/dashboard/widgets'),
  saveLayout: (layout: unknown) => api.put('/dashboard/layout', { layout }),
}
