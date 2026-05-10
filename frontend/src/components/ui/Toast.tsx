import React from 'react'
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react'
import './Toast.css'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type?: ToastType
  onClose?: () => void
}

const icons = {
  success: CheckCircle,
  error:   XCircle,
  info:    Info,
  warning: AlertCircle,
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  const Icon = icons[type]
  return (
    <div className={`toast toast--${type} fade-in`}>
      <Icon size={16} />
      <span>{message}</span>
      {onClose && (
        <button className="toast__close" onClick={onClose}><X size={14} /></button>
      )}
    </div>
  )
}

export default Toast
