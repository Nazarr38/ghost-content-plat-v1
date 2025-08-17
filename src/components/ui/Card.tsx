import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glass = false 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300'
  
  const glassClasses = glass 
    ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-glass' 
    : 'bg-white border border-gray-200 shadow-lg'
    
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
    : ''

  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}