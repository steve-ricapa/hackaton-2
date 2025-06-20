// src/types/expense.ts
export interface ExpenseSummary {
  categoryId: number
  categoryName: string
  total: number
}

export interface ExpenseDetail {
  id: number
  year: number
  month: number
  day: number
  categoryId: number
  amount: number
  description: string
}
