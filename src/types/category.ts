// src/types/category.ts

/**
 * Categoría de gasto:
 * GET /expenses_category
 * → [{ id, name }, …]
 */
export interface Category {
  id: number
  name: string
}
