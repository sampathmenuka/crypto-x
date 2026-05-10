import { create } from 'zustand'
import { authService } from '../services/authService'

interface User {
  id: string
  email: string
  username: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem('authToken'),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.login({ email, password })
      set({
        user: response.user,
        token: response.token,
        isLoading: false,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  register: async (email: string, password: string, username: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.register({ email, password, username })
      set({
        user: response.user,
        token: response.token,
        isLoading: false,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  logout: () => {
    authService.logout()
    set({ user: null, token: null })
  },

  setUser: (user: User | null) => {
    set({ user })
  },

  setToken: (token: string | null) => {
    set({ token })
    if (token) {
      localStorage.setItem('authToken', token)
    } else {
      localStorage.removeItem('authToken')
    }
  },

  isAuthenticated: () => {
    return !!get().token
  },
}))

export default useAuthStore
