import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

export const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // Affiche après 5 secondes

    return () => clearTimeout(timer)
  }, [])

  const handleHide = () => {
    setIsHidden(true)
    setTimeout(() => setIsVisible(false), 300)
  }

  if (!isVisible || isHidden) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/90 backdrop-blur-md border border-gold-200 rounded-2xl shadow-2xl p-6">
          <button
            onClick={handleHide}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-navy-900 mb-2">
              🚀 Prêt à commencer ?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Trouvez le freelance parfait en moins de 24h
            </p>
            
            <Button size="sm" className="w-full group">
              Démarrer maintenant
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}