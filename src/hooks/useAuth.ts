// src/hooks/useAuth.ts
import { useState } from 'react'
import { login as loginApi, register as registerApi } from '../api/auth.api'
import { useToken } from '../contexts/TokenContext'

export function useAuth() {
  const { saveToken, removeToken, token } = useToken()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, passwd: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const jwt = await loginApi({ email, passwd })
      saveToken(jwt)
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, passwd: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      await registerApi({ email, passwd })
      return true
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    removeToken()
  }

  const isAuthenticated = Boolean(token)

  return {
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
  }
}
