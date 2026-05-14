import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials, setLoading, setError } from '@/store/authSlice'
import { authService } from '@/services/authService'

export default function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const { user, token } = await authService.login({ email, password })
      dispatch(setCredentials({ user, token }))
      navigate('/dashboard')
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : 'Login failed. Please try again.')
      )
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-default"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-default"
          required
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Sign In
      </button>
    </form>
  )
}
