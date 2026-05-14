import api from './api'
import type { User, LoginCredentials, RegisterData } from '@/types'

interface AuthResponse {
  user: User
  token: string
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    localStorage.setItem('authToken', data.token)
    return data
  },

  register: async (userData: RegisterData) => {
    const { data } = await api.post<AuthResponse>('/auth/register', userData)
    localStorage.setItem('authToken', data.token)
    return data
  },

  logout: () => {
    localStorage.removeItem('authToken')
  },

  getCurrentUser: async () => {
    const { data } = await api.get<User>('/auth/me')
    return data
  },

  refreshToken: async () => {
    const { data } = await api.post<{ token: string }>('/auth/refresh')
    localStorage.setItem('authToken', data.token)
    return data
  },
}
