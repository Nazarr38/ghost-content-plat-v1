import { createClient } from '@supabase/supabase-js'
import { config } from './config'

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey)
export const isDemoMode = config.demoMode

export type Counters = {
  freelancesActifs: number
  projetsRealises: number
  clientsSatisfaits: number
  heuresMoyennesLivraison: number
}

export type Testimonial = {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export const fetchCounters = async (): Promise<Counters> => {
  if (isDemoMode) {
    return {
      freelancesActifs: 0,
      projetsRealises: 0,
      clientsSatisfaits: 0,
      heuresMoyennesLivraison: 0,
    }
  }

  const { data, error } = await supabase.from('counters').select('*').single()
  if (error) throw error
  return data as Counters
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  if (isDemoMode) {
    return []
  }

  const { data, error } = await supabase.from('testimonials').select('*')
  if (error) throw error
  return data as Testimonial[]
}
