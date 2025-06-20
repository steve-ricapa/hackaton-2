// src/types/goal.ts

/**
 * Meta de ahorro mensual:
 * GET /goals
 * → [{ id, year, month, amount }, …]
 * POST /goals        crea una nueva meta
 * PATCH /goals/:id   actualiza la meta
 */
export interface Goal {
  id: number
  year: number
  month: number
  amount: number
}
