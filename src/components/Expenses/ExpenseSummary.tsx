import React from 'react'
import { Link } from 'react-router-dom'
import type { ExpenseSummary as ES } from '../../types/expense'

interface Props {
  summary: ES[]
}

export default function ExpenseSummary({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {summary.map(item => (
        <Link
          key={item.categoryId}
          to={`/category/${item.categoryId}`}
          className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {item.categoryName}
          </h3>
          <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
            S/ {item.total.toFixed(2)}
          </p>
        </Link>
      ))}
    </div>
  )
}
