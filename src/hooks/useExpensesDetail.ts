// src/hooks/useExpensesDetail.ts
import { useState, useEffect } from 'react'
import { getExpensesDetail } from '../api/expenses.api'
import type { ExpenseDetail } from '../types/expense'

export function useExpensesDetail(
  year: number,
  month: number,
  categoryId: number
) {
  const [data, setData] = useState<ExpenseDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!categoryId) {
      setData([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    getExpensesDetail(year, month, categoryId)
      .then((res) => setData(res))
      .catch((err: any) => {
        setError(err.response?.data?.message || 'Error al cargar detalle')
      })
      .finally(() => setLoading(false))
  }, [year, month, categoryId])

  return { data, loading, error }
}
