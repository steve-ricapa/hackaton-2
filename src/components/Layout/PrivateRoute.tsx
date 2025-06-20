// src/components/Layout/PrivateRoute.tsx
import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useToken } from '../../contexts/TokenContext'

interface PrivateRouteProps {
  children: ReactElement
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { token } = useToken()
  return token ? children : <Navigate to="/login" replace />
}
