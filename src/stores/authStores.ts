import { create } from 'zustand'
import { fakeApi } from '../lib/fakeApi'
import type { User } from '../types/user'


type AuthStore = {
  user: User | null
  otpSent: boolean
  countryCode: string
  phone: string
  authLoadingProvider: 'phone' | 'google' | 'facebook' | null
  login: (email: string) => Promise<void>
  signup: (name: string, email: string) => Promise<void>
  verifyOtp: () => Promise<void>
  setLocation: (location: string) => void
  setCountryCode: (countryCode: string) => void
  setPhone: (phone: string) => void
  signInWithPhone: (fullPhone: string) => Promise<void>
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  otpSent: false,
  countryCode: '+880',
  phone: '',
  authLoadingProvider: null,
  login: async (email) => {
    await fakeApi(true)
    set({ user: { name: 'Guest User', email, location: '', verified: false }, otpSent: true })
  },
  signup: async (name, email) => {
    await fakeApi(true)
    set({ user: { name, email, location: '', verified: false }, otpSent: true })
  },
  verifyOtp: async () => {
    await fakeApi(true)
    set((state) => (state.user ? { user: { ...state.user, verified: true } } : state))
  },
  setLocation: (location) => set((state) => (state.user ? { user: { ...state.user, location } } : state)),
  setCountryCode: (countryCode) => set({ countryCode }),
  setPhone: (phone) => set({ phone }),
  signInWithPhone: async (fullPhone) => {
    set({ authLoadingProvider: 'phone' })
    await fakeApi(fullPhone)
    set({ authLoadingProvider: null, otpSent: true })
  },
  signInWithProvider: async (provider) => {
    set({ authLoadingProvider: provider })
    await fakeApi(true)
    set({ authLoadingProvider: null })
  },
}))
