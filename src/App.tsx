import React from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/home/Hero'
import { CountersSection } from './components/home/CountersSection'
import { TestimonialsSection } from './components/home/TestimonialsSection'
import { PricingSection } from './components/home/PricingSection'
import { WhatsAppButton } from './components/widgets/WhatsAppButton'
import { FloatingCTA } from './components/widgets/FloatingCTA'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <CountersSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <FloatingCTA />
    </div>
  )
}

export default App