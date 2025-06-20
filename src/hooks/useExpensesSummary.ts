// src/hooks/useExpensesSummary.ts
import { useState, useEffect } from 'react'
import { getExpensesSummary } from '../api/expenses.api'
import type { ExpenseSummary } from '../types/expense'
import { useNavigate } from 'react-router-dom'

export function useExpensesSummary(year: number, month: number) {
  const [data, setData] = useState<ExpenseSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setError(null)

    getExpensesSummary({ year, month })
      .then(setData)
      .catch((err: unknown) => {
        // Si viene un 401, redirige a login
        if (
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          // @ts-expect-error: puede no tener response en tipo unknown
          err.response?.status === 401
        ) {
          navigate('/login', { replace: true })
          return
        }
        // otro error
        // @ts-expect-error: puede no tener data.message en tipo unknown
        setError(err.response?.data?.message ?? 'Error al cargar resumen')
      })
      .finally(() => setLoading(false))
  }, [year, month, navigate])

  return { data, loading, error }
}
