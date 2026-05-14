export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  appName: import.meta.env.VITE_APP_NAME || 'Amdox ERP',
  appVersion: import.meta.env.VITE_APP_VERSION || '0.1.0',
} as const

export default config
