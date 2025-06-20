import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToken } from '../../contexts/TokenContext'
import { login as loginApi } from '../../api/auth.api'
import axios from 'axios'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { saveToken } = useToken()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const token = await loginApi({ email, passwd })
      saveToken(token)
      navigate('/dashboard')
    } catch (err: unknown) {
      // Manejo de errores sin usar any
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? 'Error al iniciar sesión')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error al iniciar sesión')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
      {error && (
        <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <input
          type="password"
          value={passwd}
          onChange={e => setPasswd(e.target.value)}
          required
          minLength={12}
          className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  )
}
