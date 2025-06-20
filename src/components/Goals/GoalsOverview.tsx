// src/components/Goals/GoalsOverview.tsx
import React from 'react'
import type { Goal } from '../../types/goal'
import { format } from 'date-fns'

interface GoalsOverviewProps {
  goals: Goal[]
  /** onEdit recibe (id, { year?, month?, amount? }) */
  onEdit?: (id: number, updates: Partial<Omit<Goal, 'id'>>) => void
}

export default function GoalsOverview({ goals, onEdit }: GoalsOverviewProps) {
  if (goals.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-300">
        No hay metas registradas.
      </p>
    )
  }

  return (
    <ul className="space-y-4">
      {goals.map(goal => (
        <li
          key={goal.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(goal.year, goal.month - 1, 1), 'MM/yyyy')}
            </p>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Meta: S/ {goal.amount.toFixed(2)}
            </p>
          </div>
          {onEdit && (
            <button
              onClick={() => {
                const nuevoMonto = parseFloat(
                  prompt('Nuevo monto:', String(goal.amount)) || ''
                )
                if (!isNaN(nuevoMonto)) {
                  onEdit(goal.id, { amount: nuevoMonto })
                }
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Editar
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
