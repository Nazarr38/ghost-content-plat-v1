import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { ProjectList } from '../../components/widgets/ProjectList'
import { StatsWidget } from '../../components/widgets/StatsWidget'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'

export const FreelancerDashboard: React.FC = () => {
  const { profile } = useAuth()
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('freelancer_id', profile?.id)
        .limit(5)
      if (data) setProjects(data)
    }
    load()
  }, [profile])

  const stats = [
    { label: 'Missions', value: projects.length },
    { label: 'Revenus', value: '0€' }
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Tableau de bord Freelance</h1>
      <p className="text-gray-700 dark:text-gray-300">Bienvenue {profile?.full_name || profile?.email}</p>
      <StatsWidget stats={stats} />
      <ProjectList title="Projets en cours" projects={projects} />
      <div>
        <h3 className="text-lg font-semibold mb-2 text-navy-900 dark:text-white">Actions rapides</h3>
        <Button>Parcourir les missions</Button>
      </div>
    </div>
  )
}
