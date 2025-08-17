import React from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="GhostContent" className="h-8" />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              La plateforme qui connecte les clients premium avec les meilleurs freelances créatifs.
              Ton contenu. Sans effort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-gold-500 transition-colors">Accueil</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-gold-500 transition-colors">Tarifs</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-gold-500 transition-colors">Comment ça marche</a></li>
              <li><a href="#portfolio" className="text-gray-300 hover:text-gold-500 transition-colors">Portfolio</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-gold-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-500" />
                <span className="text-gray-300">hello@ghostcontent.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-500" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gold-500" />
                <span className="text-gray-300">Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Ghost Content. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">
              Politique de confidentialité
            </a>
            <a href="/terms" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}