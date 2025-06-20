// src/pages/CategoryPage.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import ExpenseList from '../components/Expenses/ExpenseList'
import { useExpensesDetail } from '../hooks/useExpensesDetail'

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const id = parseInt(categoryId || '', 10)
  const { data: details, loading, error } = useExpensesDetail(year, month, id)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Detalle de categoría {categoryId}
      </h1>

      {loading && <p>Cargando detalle...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && <ExpenseList expenses={details} />}
    </div>
  )
}

export default CategoryPage
