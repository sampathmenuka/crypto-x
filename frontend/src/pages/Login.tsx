import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import Spinner from '../components/ui/Spinner'
import './Login.css'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      // error is already in store
    }
  }

  return (
    <div className="login-page-alt">
      <div className="login-card-alt fade-in">
        
        <div className="login-avatar">
          <User size={40} />
        </div>

        <h1 className="login-title">LOGIN NOW</h1>

        {error && (
          <div className="login-error-alt">{error}</div>
        )}

        <form id="login-form" className="login-form-alt" onSubmit={handleSubmit}>
          
          <div className="login-input-group">
            <div className="login-input-icon">
              <Mail size={18} />
            </div>
            <input
              id="login-email"
              className="login-input-field"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="login-input-group">
            <div className="login-input-icon">
              <Lock size={18} />
            </div>
            <input
              id="login-password"
              className="login-input-field"
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-pw-toggle"
              onClick={() => setShowPw((v) => !v)}
              tabIndex={-1}
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            id="btn-login-submit"
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size={18} /> : 'SUBMIT'}
          </button>
        </form>

        <Link id="link-register" to="/register" className="login-footer-link">
          Don't have an account? Create one
        </Link>
      </div>
    </div>
  )
}

export default Login
