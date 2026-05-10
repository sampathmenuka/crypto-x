import React from 'react'
import './Spinner.css'

interface SpinnerProps {
  size?: number
  className?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, className = '' }) => (
  <div className={`spinner ${className}`} style={{ width: size, height: size }} />
)

export default Spinner
