export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Amdox ERP'

export const PAGINATION_LIMIT = 10
export const DEBOUNCE_DELAY = 500

export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  draft: 'bg-gray-100 text-gray-700',
  posted: 'bg-blue-100 text-blue-700',
  paid: 'bg-green-100 text-green-700',
  overdue: 'bg-red-100 text-red-700',
} as const
