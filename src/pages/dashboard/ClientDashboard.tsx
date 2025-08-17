import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export const ClientDashboard: React.FC = () => {
  const { profile } = useAuth()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Client</h1>
      <p className="text-gray-700">Bienvenue {profile?.full_name || profile?.email}</p>
    </div>
  )
}
