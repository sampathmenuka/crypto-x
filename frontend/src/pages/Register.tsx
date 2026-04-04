import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import Spinner from '../components/ui/Spinner'
import './Login.css'

const Register: React.FC = () => {
  const navigate  = useNavigate()
  const { register, isLoading, error } = useAuthStore()
  const [username, setUsername] = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [localErr, setLocalErr] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setLocalErr('Passwords do not match.'); return }
    if (password.length < 8)  { setLocalErr('Password must be at least 8 characters.'); return }
    setLocalErr('')
    try {
      await register(email, password, username)
      navigate('/dashboard')
    } catch {
      // error already in store
    }
  }

  const displayError = localErr || error

  const isFormValid = username.length >= 3 && email.includes('@') && password.length >= 8 && password === confirm

  return (
    <div className="login-page-alt">
      <div className="login-card-alt fade-in">
        
        <div className="login-avatar">
          <User size={40} />
        </div>

        <h1 className="login-title">REGISTER NOW</h1>

        {displayError && (
          <div className="login-error-alt" role="alert">{displayError}</div>
        )}

        <form id="register-form" className="login-form-alt" onSubmit={handleSubmit} noValidate>
          
          <div className="login-input-group">
            <div className="login-input-icon">
              <User size={18} />
            </div>
            <input
              id="register-username"
              className="login-input-field"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              autoComplete="username"
            />
          </div>

          <div className="login-input-group">
            <div className="login-input-icon">
              <Mail size={18} />
            </div>
            <input
              id="register-email"
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
              id="register-password"
              className="login-input-field"
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
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

          <div className="login-input-group">
            <div className="login-input-icon">
              <Lock size={18} />
            </div>
            <input
              id="register-confirm"
              className="login-input-field"
              type={showPw ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <button
            id="btn-register-submit"
            type="submit"
            className="login-submit-btn"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? <Spinner size={18} /> : 'SUBMIT'}
          </button>
        </form>

        <Link id="link-login" to="/login" className="login-footer-link">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  )
}

export default Register
