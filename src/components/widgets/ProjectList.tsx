import React from 'react'

type Project = { id: string; name: string; status: string }

export const ProjectList: React.FC<{ title: string; projects: Project[] }> = ({ title, projects }) => {
  return (
    <div className="bg-white dark:bg-navy-800 rounded-xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-2 text-navy-900 dark:text-white">{title}</h3>
      {projects.length ? (
        <ul className="space-y-2">
          {projects.map((p) => (
            <li key={p.id} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
              <span>{p.name}</span>
              <span className="capitalize">{p.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">Aucun projet.</p>
      )}
    </div>
  )
}
