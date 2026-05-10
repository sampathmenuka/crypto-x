import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Zap, ArrowRight } from 'lucide-react'
import Spinner from '../components/ui/Spinner'
import './Auth.css'

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
    <div className="auth-page">
      {/* Animated background blobs */}
      <div className="auth-blob auth-blob--1" />
      <div className="auth-blob auth-blob--2" />

      <div className="auth-card card fade-in">
        {/* Logo */}
        <div className="auth-card__logo">
          <div className="auth-card__logo-icon"><Zap size={20} /></div>
          <span className="auth-card__logo-text">Crypto<span>X</span></span>
        </div>

        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__sub">Sign in to your trading account</p>

        {error && (
          <div className="auth-card__error">{error}</div>
        )}

        <form id="login-form" className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-form__field">
            <span>Email address</span>
            <input
              id="login-email"
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
                id="login-password"
                className="input"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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

          <button
            id="btn-login-submit"
            type="submit"
            className="btn btn-primary btn-lg auth-form__submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size={18} /> : <>Sign In <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="auth-card__footer">
          Don't have an account?{' '}
          <Link id="link-register" to="/register" className="auth-card__link">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
