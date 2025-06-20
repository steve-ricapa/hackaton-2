// src/components/Goals/GoalForm.tsx
import React, { useState, FormEvent } from 'react'
import type { Goal } from '../../types/goal'

interface GoalFormProps {
  /** onSave recibe un objeto sin id: { year, month, amount } */
  onSave: (newGoal: Omit<Goal, 'id'>) => void
}

export default function GoalForm({ onSave }: GoalFormProps) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [amount, setAmount] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (amount <= 0) {
      setError('El monto debe ser mayor que cero')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await onSave({ year, month, amount })
      // resetear formulario
      setAmount(0)
    } catch (err: any) {
      setError(err.message || 'Error al guardar la meta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
    >
      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
      <div className="flex space-x-2">
        <div>
          <label className="block text-sm font-medium">Año</label>
          <input
            type="number"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            required
            className="mt-1 w-full border rounded px-2 py-1 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mes</label>
          <input
            type="number"
            value={month}
            min={1}
            max={12}
            onChange={e => setMonth(Number(e.target.value))}
            required
            className="mt-1 w-full border rounded px-2 py-1 focus:outline-none focus:ring"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Monto (S/)</label>
        <input
          type="number"
          value={amount}
          min="0"
          step="0.01"
          onChange={e => setAmount(parseFloat(e.target.value))}
          required
          className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Guardar Meta'}
      </button>
    </form>
  )
}
