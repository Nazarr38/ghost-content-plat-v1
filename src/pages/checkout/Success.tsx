import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

export const CheckoutSuccess: React.FC = () => {
  const { profile } = useAuth()

  useEffect(() => {
    const update = async () => {
      if (profile) {
        await supabase.from('profiles').update({ subscription_active: true }).eq('id', profile.id)
      }
    }
    update()
  }, [profile])

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Paiement confirmé</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">Merci pour votre abonnement.</p>
      <a href="/" className="text-gold-600">Retour à l'accueil</a>
    </div>
  )
}
