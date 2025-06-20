// src/components/Layout/Navbar.tsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToken } from '../../contexts/TokenContext'

export default function Navbar() {
  const { token, removeToken } = useToken()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400">
          Ahorrista
        </Link>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-300">
                Dashboard
              </Link>
              <Link to="/goals" className="hover:text-blue-300">
                Metas
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-300">
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
