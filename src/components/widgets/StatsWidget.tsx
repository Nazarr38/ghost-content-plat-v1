import React from 'react'

type Stat = { label: string; value: string | number }

export const StatsWidget: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white dark:bg-navy-800 rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
          <p className="text-2xl font-bold text-navy-900 dark:text-white">{s.value}</p>
        </div>
      ))}
    </div>
  )
}
