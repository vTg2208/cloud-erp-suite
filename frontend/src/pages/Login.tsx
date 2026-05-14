import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/Auth/LoginForm'
import RegisterForm from '@/components/Auth/RegisterForm'
import { useState } from 'react'

export default function Login() {
  const { isAuthenticated } = useAuth()
  const [isRegister, setIsRegister] = useState(false)

  if (isAuthenticated) {
    window.location.href = '/dashboard'
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Amdox ERP</h1>
          <p className="text-gray-600 mt-2">
            {isRegister ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        <div className="card">
          {isRegister ? <RegisterForm /> : <LoginForm />}

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
