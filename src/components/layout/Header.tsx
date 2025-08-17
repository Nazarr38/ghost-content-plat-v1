import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { scrollToContact } from '../../lib/navigation'

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { profile, signOut, signIn, isDemoMode } = useAuth()

  const navigation = [
    { name: 'Accueil', href: '#home' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'Comment ça marche', href: '#how-it-works' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isDemoMode && (
        <div className="bg-gold-500 text-white px-4 py-2 text-center text-sm">
          <strong>Mode Démo</strong> - Configurez vos variables d'environnement pour activer le mode production
        </div>
      )}
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/logo.svg" alt="GhostContent" className="h-8" />
          </motion.div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-navy-700 hover:text-gold-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {profile ? (
              <div className="flex items-center space-x-4">
                <a
                  href={profile.user_type === 'client' ? '/dashboard/client' : '/dashboard/freelancer'}
                  className="text-sm text-navy-700 hover:text-gold-600 transition-colors"
                >
                  Dashboard
                </a>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-navy-700" />
                  <span className="text-sm text-navy-700">{profile.full_name || profile.email}</span>
                  {profile.subscription_plan && (
                    <span className="px-2 py-1 text-xs bg-gold-100 text-gold-800 rounded-full capitalize">
                      {profile.subscription_plan}
                    </span>
                  )}
                </div>
                <button
                  onClick={signOut}
                  className="text-navy-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signIn('demo@ghostcontent.fr')}
                >
                  Se connecter
                </Button>
                <Button size="sm" onClick={scrollToContact}>
                  Trouver un freelance
                </Button>
              </>
            )}
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-navy-700" />
            ) : (
              <Menu className="w-6 h-6 text-navy-700" />
            )}
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-navy-700 hover:text-gold-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {profile ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-navy-700">{profile.full_name || profile.email}</p>
                    <a
                      href={profile.user_type === 'client' ? '/dashboard/client' : '/dashboard/freelancer'}
                      className="block text-sm text-navy-700 hover:text-gold-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </a>
                    <Button variant="outline" size="sm" onClick={signOut} className="w-full">
                      Se déconnecter
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => signIn('demo@ghostcontent.fr')}
                    >
                      Se connecter
                    </Button>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        scrollToContact()
                        setIsMenuOpen(false)
                      }}
                    >
                      Trouver un freelance
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}