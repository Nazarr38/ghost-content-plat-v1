import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Bonjour ! Je suis intéressé(e) par Ghost Content. Pouvez-vous m'en dire plus ?"
    )
    window.open(`https://wa.me/33123456789?text=${message}`, '_blank')
  }

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={handleWhatsAppClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  )
}