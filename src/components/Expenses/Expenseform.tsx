// src/components/Expenses/ExpenseForm.tsx
import React, { useState, FormEvent } from 'react'
import { addExpense } from '../../api/expenses.api'
import type { Expense } from '../../types/expense'

interface ExpenseFormProps {
  onAdd?: (expense: Expense) => void
  categoryId?: number
}

export default function ExpenseForm({ onAdd, categoryId }: ExpenseFormProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = {
        year,
        month,
        day,
        categoryId: categoryId ?? 0,
        amount: parseFloat(amount),
        description,
      }
      const newExp = await addExpense(payload)
      onAdd?.(newExp)
      setAmount('')
      setDescription('')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al agregar gasto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {error && (
        <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium">Monto (S/)</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Agregando...' : 'Agregar Gasto'}
      </button>
    </form>
  )
}
