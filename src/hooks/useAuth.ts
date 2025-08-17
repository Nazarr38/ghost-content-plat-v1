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
  const [error, setError] = useState<string | null>(null)

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setUser(session?.user ?? null)

        if (session?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (error) throw error
          setProfile(data as Profile)
        } else {
          setProfile(null)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (
    email: string,
    userData: { full_name: string; user_type: 'client' | 'freelancer' }
  ) => {
    if (isDemoMode) {
      return { error: null }
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        options: {
          data: userData,
          emailRedirectTo: window.location.origin,
        },
      })
      if (error) {
        setError(error.message)
      }
      return { error }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      return { error: err as unknown }
    }
  }

  const signIn = async (email: string) => {
    if (isDemoMode) {
      return { error: null }
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) {
        setError(error.message)
      }
      return { error }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      return { error: err as unknown }
    }
  }

  const signOut = async () => {
    if (isDemoMode) {
      setProfile(null)
      return
    }

    try {
      await supabase.auth.signOut()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!profile,
    isDemoMode,
  }
}
