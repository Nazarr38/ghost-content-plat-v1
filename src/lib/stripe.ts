import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null> | null = null

export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.error('Missing VITE_STRIPE_PUBLISHABLE_KEY')
      return null
    }
    stripePromise = loadStripe(key).catch((err) => {
      console.error('Failed to load Stripe', err)
      return null
    })
  }
  return stripePromise
}

const requiredEnv = (name: string): string => {
  const value = import.meta.env[name]
  if (!value) {
    console.warn(`Missing env var: ${name}`)
    return ''
  }
  return value
}

export const subscriptionPlans = {
  starter: {
    id: requiredEnv('VITE_STRIPE_STARTER_PLAN_ID'),
    name: 'Starter',
    price: 299,
    commission: 0.30,
    features: [
      "Jusqu'à 5 projets par mois",
      'Matching automatique',
      'Support par email',
      'Templates de brief',
    ]
  },
  pro: {
    id: requiredEnv('VITE_STRIPE_PRO_PLAN_ID'),
    name: 'Pro',
    price: 799,
    commission: 0.25,
    features: [
      "Jusqu'à 20 projets par mois",
      'Matching premium',
      'Support prioritaire',
      'Révisions illimitées',
      'Manager dédié',
    ]
  },
  elite: {
    id: requiredEnv('VITE_STRIPE_ELITE_PLAN_ID'),
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

export const redirectToCheckout = async (planKey: 'starter' | 'pro' | 'elite') => {
  const stripe = await getStripe()
  if (!stripe) return

  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: subscriptionPlans[planKey].id })
    })
    const data = await res.json()
    const { error } = await stripe.redirectToCheckout({ sessionId: data.id })
    if (error) {
      console.error('Stripe redirect error', error)
    }
  } catch (err) {
    console.error('Checkout session error', err)
  }
}
