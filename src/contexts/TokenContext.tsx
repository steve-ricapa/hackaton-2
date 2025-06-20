// src/contexts/TokenContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import Api from '../api/api'

type TokenContextType = {
  token: string | null
  saveToken: (userToken: string) => void
  removeToken: () => void
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

type TokenProviderProps = {
  children: ReactNode
}

export function TokenProvider({ children }: TokenProviderProps) {
  const [token, setToken] = useState<string | null>(null)

  // Al montar, hidratamos el token en state y en el singleton
  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
    Api.getInstance().setToken(t)
  }, [])

  const saveToken = (userToken: string) => {
    localStorage.setItem('token', userToken)
    setToken(userToken)
    Api.getInstance().setToken(userToken)
  }

  const removeToken = () => {
    localStorage.removeItem('token')
    setToken(null)
    Api.getInstance().setToken(null)
  }

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export function useToken(): TokenContextType {
  const ctx = useContext(TokenContext)
  if (!ctx) throw new Error('useToken must be used within TokenProvider')
  return ctx
}
