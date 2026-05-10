import apiClient from './api'

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  email: string
  password: string
  username: string
}

interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    username: string
  }
}

export const authService = {
  // User login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials)
    const { token } = response.data
    localStorage.setItem('authToken', token)
    return response.data
  },

  // User registration
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', userData)
    const { token } = response.data
    localStorage.setItem('authToken', token)
    return response.data
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },

  // User logout
  logout: (): void => {
    localStorage.removeItem('authToken')
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken')
  },
}

export default authService
