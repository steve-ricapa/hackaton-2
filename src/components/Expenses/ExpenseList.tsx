// src/components/Expenses/ExpenseList.tsx
import React from 'react'
import type { ExpenseDetail } from '../../types/expense'
import ExpenseItem from './ExpenseItem'

interface ExpenseListProps {
  expenses: ExpenseDetail[]
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <ul className="space-y-4">
      {expenses.map(exp => (
        <ExpenseItem key={exp.id} expense={exp} />
      ))}
    </ul>
  )
}
