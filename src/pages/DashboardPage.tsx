import React from 'react'
import { useExpensesSummary } from '../hooks/useExpensesSummary'
import ExpenseSummary from '../components/Expenses/ExpenseSummary'

export default function DashboardPage() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const { data: summary, loading, error } = useExpensesSummary(year, month)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Resumen de {month}/{year}
      </h1>

      {loading && <p>Cargando resumen…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && summary.length > 0 && (
        <ExpenseSummary summary={summary} />
      )}

      {!loading && !error && summary.length === 0 && (
        <p>No hay gastos registrados este mes.</p>
      )}
    </div>
  )
}
