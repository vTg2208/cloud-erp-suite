import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth)
  return { user, isAuthenticated, isLoading, error }
}
