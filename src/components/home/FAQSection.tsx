import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: "Comment fonctionne la plateforme ?", a: "Nous vous connectons aux meilleurs freelances selon vos besoins." },
  { q: "Quels sont les délais moyens ?", a: "La plupart des projets sont livrés en moins de 72h." },
  { q: "Puis-je annuler à tout moment ?", a: "Oui, les abonnements sont sans engagement." }
]

export const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-primary-50 dark:bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          FAQ
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-gray-200 dark:border-navy-600 py-4"
            >
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-navy-900 dark:text-white">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-navy-900 dark:text-white transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 text-gray-600 dark:text-gray-300"
                >
                  {item.a}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
