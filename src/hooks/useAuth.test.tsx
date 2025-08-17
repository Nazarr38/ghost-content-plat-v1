import { renderHook, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

let mockIsDemoMode = true
const mockSignInWithOtp = vi.fn().mockResolvedValue({ error: { message: 'fail' } })

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: (cb: any) => {
        cb('SIGNED_OUT', null)
        return { data: { subscription: { unsubscribe: vi.fn() } } }
      },
      signInWithOtp: mockSignInWithOtp,
      signUp: vi.fn().mockResolvedValue({ error: null }),
      signOut: vi.fn().mockResolvedValue({}),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
  },
  get isDemoMode() {
    return mockIsDemoMode
  },
}))

import { useAuth } from './useAuth'

describe('useAuth', () => {
  it('returns demo profile in demo mode', () => {
    mockIsDemoMode = true
    const { result } = renderHook(() => useAuth())
    expect(result.current.profile?.email).toBe('demo@ghostcontent.fr')
    expect(result.current.loading).toBe(false)
  })

  it('exposes error when signIn fails', async () => {
    mockIsDemoMode = false
    const { result } = renderHook(() => useAuth())
    await act(async () => {
      await result.current.signIn('test@example.com')
    })
    expect(result.current.error).toBe('fail')
  })
})
