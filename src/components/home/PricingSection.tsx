import React from 'react'
import { motion } from 'framer-motion'
import { Check, Crown, Star, Zap } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { subscriptionPlans } from '../../lib/stripe'

const PlanCard: React.FC<{
  plan: typeof subscriptionPlans.starter
  planKey: 'starter' | 'pro' | 'elite'
  isPopular?: boolean
  index: number
}> = ({ plan, planKey, isPopular, index }) => {
  const icons = {
    starter: <Zap className="w-6 h-6" />,
    pro: <Star className="w-6 h-6" />,
    elite: <Crown className="w-6 h-6" />
  }

  const colors = {
    starter: 'from-blue-500 to-blue-600',
    pro: 'from-gold-500 to-gold-600',
    elite: 'from-purple-500 to-purple-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`relative ${isPopular ? 'scale-105' : ''}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            Le plus populaire
          </span>
        </div>
      )}

      <Card className={`p-8 h-full ${isPopular ? 'ring-2 ring-gold-500' : ''}`} hover>
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colors[planKey]} text-white rounded-full mb-4`}>
            {icons[planKey]}
          </div>
          
          <h3 className="text-2xl font-bold text-navy-900 mb-2">{plan.name}</h3>
          
          <div className="mb-4">
            <span className="text-4xl font-bold text-navy-900">{plan.price}€</span>
            <span className="text-gray-600">/mois</span>
          </div>
          
          <p className="text-gray-600">
            Commission: {(plan.commission * 100)}% par mission
          </p>
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={isPopular ? 'primary' : 'outline'}
          size="lg"
          className="w-full"
        >
          {isPopular ? 'Commencer maintenant' : 'Choisir ce plan'}
        </Button>
      </Card>
    </motion.div>
  )
}

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Choisissez votre plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des tarifs transparents adaptés à tous les besoins. 
            Commissions dégressives et support premium inclus.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PlanCard
            plan={subscriptionPlans.starter}
            planKey="starter"
            index={0}
          />
          <PlanCard
            plan={subscriptionPlans.pro}
            planKey="pro"
            isPopular={true}
            index={1}
          />
          <PlanCard
            plan={subscriptionPlans.elite}
            planKey="elite"
            index={2}
          />
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-primary-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-navy-900 mb-4">
              Informations importantes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <strong className="text-navy-900">Missions ponctuelles:</strong>
                <br />
                Minimum 150€ par projet
              </div>
              <div>
                <strong className="text-navy-900">Rush (+10%):</strong>
                <br />
                Livraison en moins de 24h
              </div>
              <div>
                <strong className="text-navy-900">Paiement:</strong>
                <br />
                Système d'escrow sécurisé
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}