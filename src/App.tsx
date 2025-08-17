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

function App() {
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