// src/components/Auth/RegisterForm.tsx
import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as registerApi } from '../../api/auth.api'
import axios from 'axios'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await registerApi({ name, email, passwd })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 1000)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? 'Error al registrarse')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error al registrarse')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Registro</h2>
      {error && (
        <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600 text-sm bg-green-100 p-2 rounded">
          Registro exitoso. Redirigiendo…
        </div>
      )}
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
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
        disabled={loading || success}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  )
}
