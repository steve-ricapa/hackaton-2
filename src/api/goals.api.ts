// src/api/goals.api.ts
import Api from './api';
import type { Goal } from '../types/goal';

const api = Api.getInstance();

/** Obtener metas de ahorro */
export async function getGoals(): Promise<Goal[]> {
  return api.get<Goal[]>('/goals');
}

/** Crear nueva meta */
export async function createGoal(goal: Omit<Goal, 'id'>): Promise<Goal> {
  return api.post<Goal>('/goals', goal);
}

/** Actualizar meta existente */
export async function updateGoal(
  id: number,
  updates: Partial<Omit<Goal, 'id'>>
): Promise<Goal> {
  return api.patch<Goal>(`/goals/${id}`, updates);
}
