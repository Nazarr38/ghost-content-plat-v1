import React from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/home/Hero'
import { PricingSection } from './components/home/PricingSection'
import { HowItWorksSection } from './components/home/HowItWorksSection'
import { PortfolioSection } from './components/home/PortfolioSection'
import { FAQSection } from './components/home/FAQSection'
import { ContactSection } from './components/home/ContactSection'
import { WhatsAppButton } from './components/widgets/WhatsAppButton'
import { FloatingCTA } from './components/widgets/FloatingCTA'
import { ClientDashboard } from './pages/dashboard/ClientDashboard'
import { FreelancerDashboard } from './pages/dashboard/FreelancerDashboard'
import { useAuth } from './hooks/useAuth'

function App() {
  const { profile } = useAuth()
  const path = window.location.pathname

  if (path.startsWith('/dashboard')) {
    if (!profile) {
      return <div className="p-6">Veuillez vous connecter.</div>
    }
    if (path === '/dashboard/client' && profile.user_type === 'client') {
      return <ClientDashboard />
    }
    if (path === '/dashboard/freelancer' && profile.user_type === 'freelancer') {
      return <FreelancerDashboard />
    }
    return <div className="p-6">Accès non autorisé.</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <PricingSection />
        <HowItWorksSection />
        <PortfolioSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <FloatingCTA />
    </div>
  )
}

export default App