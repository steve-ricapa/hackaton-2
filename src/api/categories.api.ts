// src/api/categories.api.ts
import Api from './api';
import type { Category } from '../types/category';

const api = Api.getInstance();

/** Listado de categorías de gasto */
export async function getCategories(): Promise<Category[]> {
  return api.get<Category[]>('/expenses_category');
}
