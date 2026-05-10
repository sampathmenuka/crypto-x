import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react'
import Spinner from '../components/ui/Spinner'
import './Auth.css'

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

  return (
    <div className="auth-page">
      <div className="auth-blob auth-blob--1" />
      <div className="auth-blob auth-blob--2" />

      <div className="auth-card card fade-in">
        <div className="auth-card__logo">
          <div className="auth-card__logo-icon"><Zap size={20} /></div>
          <span className="auth-card__logo-text">Crypto<span>X</span></span>
        </div>

        <h1 className="auth-card__title">Create account</h1>
        <p className="auth-card__sub">Join thousands of traders on Crypto-X</p>

        {displayError && (
          <div className="auth-card__error">{displayError}</div>
        )}

        <form id="register-form" className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-form__field">
            <span>Username</span>
            <input
              id="register-username"
              className="input"
              type="text"
              placeholder="satoshi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label className="auth-form__field">
            <span>Email address</span>
            <input
              id="register-email"
              className="input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="auth-form__field">
            <span>Password</span>
            <div className="auth-form__pw-wrap">
              <input
                id="register-password"
                className="input"
                type={showPw ? 'text' : 'password'}
                placeholder="min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: 40 }}
              />
              <button
                type="button"
                className="auth-form__pw-toggle"
                onClick={() => setShowPw((v) => !v)}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </label>

          <label className="auth-form__field">
            <span>Confirm Password</span>
            <input
              id="register-confirm"
              className="input"
              type={showPw ? 'text' : 'password'}
              placeholder="repeat password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </label>

          <button
            id="btn-register-submit"
            type="submit"
            className="btn btn-primary btn-lg auth-form__submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size={18} /> : <>Create Account <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="auth-card__footer">
          Already have an account?{' '}
          <Link id="link-login" to="/login" className="auth-card__link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
