import React from 'react'
import { motion } from 'framer-motion'

export const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-navy-900 mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Portfolio
        </motion.h2>
        <p className="text-center text-gray-600">Section à compléter.</p>
      </div>
    </section>
  )
}
