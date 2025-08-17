import React from 'react'

export const CheckoutCancel: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Paiement annulé</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">Votre transaction n'a pas été finalisée.</p>
      <a href="/" className="text-gold-600">Retour à l'accueil</a>
    </div>
  )
}
