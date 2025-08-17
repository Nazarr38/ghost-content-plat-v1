import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, CheckCircle, Clock, Star } from 'lucide-react'
import { mockCounters } from '../../lib/mockData'

const useCounter = (endValue: number, duration: number = 2000) => {
  const [count, setCount] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  const startCounting = () => {
    if (isStarted) return
    setIsStarted(true)

    const startTime = Date.now()
    const startValue = 0

    const updateCount = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function pour un effet plus naturel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }

  return { count, startCounting, isStarted }
}

const CounterCard: React.FC<{
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
}> = ({ icon, value, label, suffix = '' }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })
  const { count, startCounting } = useCounter(value)

  useEffect(() => {
    if (isInView) {
      startCounting()
    }
  }, [isInView, startCounting])

  return (
    <motion.div
      ref={ref}
      className="text-center p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 text-gold-600 rounded-full mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold text-navy-900 mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  )
}

export const CountersSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Pourquoi choisir Ghost Content ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des chiffres qui parlent d'eux-mêmes. Rejoignez des centaines de clients satisfaits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CounterCard
            icon={<Users className="w-8 h-8" />}
            value={mockCounters.freelancesActifs}
            label="Freelances actifs"
          />
          
          <CounterCard
            icon={<CheckCircle className="w-8 h-8" />}
            value={mockCounters.projetsRealises}
            label="Projets réalisés"
          />
          
          <CounterCard
            icon={<Star className="w-8 h-8" />}
            value={mockCounters.clientsSatisfaits}
            label="Clients satisfaits"
          />
          
          <CounterCard
            icon={<Clock className="w-8 h-8" />}
            value={mockCounters.heuresMoyennesLivraison}
            label="Heures de livraison moyenne"
            suffix="h"
          />
        </div>
      </div>
    </section>
  )
}