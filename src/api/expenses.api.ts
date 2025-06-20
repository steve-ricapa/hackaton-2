// src/api/expenses.api.ts
import Api from './api'
import type { ExpenseSummary, ExpenseDetail } from '../types/expense'

interface RawExpense {
  id: number
  expenseCategory: { id: number; name: string }
  year: number
  month: number
  amount: number
}

interface ApiResponse<T> {
  status: number
  message: string
  result?: T
}

const api = Api.getInstance()

/**
 * Llama al endpoint, filtra por año/mes, y agrupa por categoría.
 */
export async function getExpensesSummary(
  params?: { year: number; month: number }
): Promise<ExpenseSummary[]> {
  const res = await api.get<ApiResponse<RawExpense[]>>(
    '/expenses_summary',
    { params }
  )
  const raw = res.result ?? []

  // 1️⃣ Filtrar solo el mes & año indicado
  const filtered = params
    ? raw.filter(e => e.year === params.year && e.month === params.month)
    : raw

  // 2️⃣ Agrupar y sumar
  const map: Record<number, ExpenseSummary> = {}
  for (const e of filtered) {
    const cid = e.expenseCategory.id
    const cname = e.expenseCategory.name
    if (!map[cid]) {
      map[cid] = { categoryId: cid, categoryName: cname, total: 0 }
    }
    map[cid].total += e.amount
  }

  // 3️⃣ Devolver un array limpio
  return Object.values(map)
}

/** Detalle de gastos por categoría (idem que antes) */
export async function getExpensesDetail(
  year: number,
  month: number,
  categoryId: number
): Promise<ExpenseDetail[]> {
  const res = await api.get<ApiResponse<ExpenseDetail[]>>(
    '/expenses/detail',
    { params: { year, month, categoryId } }
  )
  return res.result ?? []
}
