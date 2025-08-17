import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'demo-key'

export const stripe = await loadStripe(stripePublishableKey)

export const subscriptionPlans = {
  starter: {
    id: import.meta.env.STRIPE_STARTER_PLAN_ID || 'demo-starter',
    name: 'Starter',
    price: 299,
    commission: 0.30,
    features: [
      'Jusqu\'à 5 projets par mois',
      'Matching automatique',
      'Support par email',
      'Templates de brief',
    ]
  },
  pro: {
    id: import.meta.env.STRIPE_PRO_PLAN_ID || 'demo-pro',
    name: 'Pro',
    price: 799,
    commission: 0.25,
    features: [
      'Jusqu\'à 20 projets par mois',
      'Matching premium',
      'Support prioritaire',
      'Révisions illimitées',
      'Manager dédié',
    ]
  },
  elite: {
    id: import.meta.env.STRIPE_ELITE_PLAN_ID || 'demo-elite',
    name: 'Elite',
    price: 1499,
    commission: 0.20,
    features: [
      'Projets illimités',
      'Freelances VIP exclusifs',
      'Support 24/7',
      'Concierge personnel',
      'SLA garanti 24h',
    ]
  }
}