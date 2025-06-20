// src/components/Expenses/ExpenseItem.tsx
import React from 'react'
import type { ExpenseDetail } from '../../types/expense'
import { format } from 'date-fns'

interface ExpenseItemProps {
  expense: ExpenseDetail
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  const date = format(
    new Date(expense.year, expense.month - 1, expense.day),
    'dd/MM/yyyy'
  )
  return (
    <li className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        <p className="text-base font-medium text-gray-900 dark:text-gray-100">
          {expense.description}
        </p>
      </div>
      <p className="text-lg font-semibold text-red-600 dark:text-red-400">
        - S/ {expense.amount.toFixed(2)}
      </p>
    </li>
  )
}
