// src/hooks/useGoals.ts
import { useState, useEffect } from 'react'
import {
  getGoals,
  createGoal,
  updateGoal,
} from '../api/goals.api'
import type { Goal } from '../types/goal'

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGoals = async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await getGoals()
      setGoals(list)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar metas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  const addGoal = async (goal: Omit<Goal, 'id'>) => {
    setLoading(true)
    setError(null)
    try {
      const created = await createGoal(goal)
      setGoals((prev) => [...prev, created])
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear meta')
    } finally {
      setLoading(false)
    }
  }

  const editGoal = async (
    id: number,
    updates: Partial<Omit<Goal, 'id'>>
  ) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await updateGoal(id, updates)
      setGoals((prev) =>
        prev.map((g) => (g.id === id ? updated : g))
      )
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar meta')
    } finally {
      setLoading(false)
    }
  }

  return {
    goals,
    loading,
    error,
    fetchGoals,
    addGoal,
    editGoal,
  }
}
