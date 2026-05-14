import api from './api'

export const reportService = {
  generate: (reportType: string, params: Record<string, unknown>) =>
    api.post('/reports/generate', { type: reportType, params }),
  list: () => api.get('/reports'),
  download: (id: string, format: string) =>
    api.get(`/reports/${id}/download?format=${format}`, { responseType: 'blob' }),
  schedule: (config: { type: string; schedule: string; recipients: string[] }) =>
    api.post('/reports/schedule', config),
}
