// src/pages/GoalsPage.tsx
import React from 'react'
import GoalsOverview from '../components/Goals/GoalsOverview'
import GoalForm from '../components/Goals/GoalForm'
import { useGoals } from '../hooks/useGoals'

const GoalsPage: React.FC = () => {
  const { goals, loading, error, addGoal, editGoal } = useGoals()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Metas de Ahorro</h1>

      {loading && <p>Cargando metas...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="mb-6">
        <GoalForm onSave={addGoal} />
      </div>

      {!loading && !error && (
        <GoalsOverview goals={goals} onEdit={editGoal} />
      )}
    </div>
  )
}

export default GoalsPage
