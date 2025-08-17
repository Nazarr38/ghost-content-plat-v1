import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, isDemoMode } from '../lib/supabase'

export interface Profile {
  id: string
  email: string
  full_name?: string
  user_type: 'client' | 'freelancer' | 'admin'
  subscription_plan?: 'starter' | 'pro' | 'elite'
  created_at: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemoMode) {
      // Mode démo - utilisateur factice
      const demoUser = {
        id: 'demo-user-id',
        email: 'demo@ghostcontent.fr',
        full_name: 'Utilisateur Démo',
        user_type: 'client' as const,
        subscription_plan: 'pro' as const,
        created_at: new Date().toISOString(),
      }
      setProfile(demoUser)
      setLoading(false)
      return
    }

    // Mode production
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        setProfile(profile)
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, userData: { full_name: string, user_type: 'client' | 'freelancer' }) => {
    if (isDemoMode) {
      return { error: null }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: 'temp-password', // En production, utiliser magic link
      options: {
        data: userData
      }
    })
    return { error }
  }

  const signIn = async (email: string) => {
    if (isDemoMode) {
      return { error: null }
    }

    const { error } = await supabase.auth.signInWithOtp({ email })
    return { error }
  }

  const signOut = async () => {
    if (isDemoMode) {
      setProfile(null)
      return
    }

    await supabase.auth.signOut()
  }

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!profile,
    isDemoMode
  }
}