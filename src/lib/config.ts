import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url().optional(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  VITE_DEMO_MODE: z.string().optional(),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.warn('Invalid environment variables', parsed.error.flatten().fieldErrors)
}

const data = parsed.success ? parsed.data : {}

let demoMode = data.VITE_DEMO_MODE === 'true'
let supabaseUrl = data.VITE_SUPABASE_URL
let supabaseAnonKey = data.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase configuration missing. Running in demo mode. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable Supabase.'
  )
  demoMode = true
  supabaseUrl = supabaseUrl ?? 'https://demo.supabase.co'
  supabaseAnonKey = supabaseAnonKey ?? 'anon-key'
}

export const config = {
  supabaseUrl,
  supabaseAnonKey,
  demoMode,
}
