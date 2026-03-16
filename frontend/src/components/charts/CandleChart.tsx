import React, { useEffect, useRef } from 'react'
import { CandleData } from '../../types'
import './CandleChart.css'

interface CandleChartProps {
  candles: CandleData[]
  width?: number
  height?: number
}

const PADDING = { top: 20, right: 16, bottom: 28, left: 60 }

const CandleChart: React.FC<CandleChartProps> = ({ candles, width = 800, height = 320 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || candles.length === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // DPI scaling
    const dpr = window.devicePixelRatio || 1
    canvas.width  = width  * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width  = `${width}px`
    canvas.style.height = `${height}px`

    ctx.clearRect(0, 0, width, height)

    const chartW = width  - PADDING.left - PADDING.right
    const chartH = height - PADDING.top  - PADDING.bottom

    const highs = candles.map((c) => c.high)
    const lows  = candles.map((c) => c.low)
    const maxP  = Math.max(...highs)
    const minP  = Math.min(...lows)
    const range = maxP - minP || 1

    const toX = (i: number) => PADDING.left + (i / (candles.length - 1)) * chartW
    const toY = (p: number) => PADDING.top  + ((maxP - p) / range) * chartH

    // Grid lines
    ctx.strokeStyle = 'rgba(30,45,74,.6)'
    ctx.lineWidth   = 1
    for (let i = 0; i <= 4; i++) {
      const y = PADDING.top + (i / 4) * chartH
      ctx.beginPath()
      ctx.moveTo(PADDING.left, y)
      ctx.lineTo(width - PADDING.right, y)
      ctx.stroke()

      const price = maxP - (i / 4) * range
      ctx.fillStyle = 'rgba(148,163,184,.6)'
      ctx.font      = '10px Inter, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(price.toFixed(price >= 1000 ? 0 : 2), PADDING.left - 6, y + 4)
    }

    // Candle width
    const candleW = Math.max(2, (chartW / candles.length) * 0.6)

    candles.forEach((c, i) => {
      const x      = toX(i)
      const openY  = toY(c.open)
      const closeY = toY(c.close)
      const highY  = toY(c.high)
      const lowY   = toY(c.low)
      const isUp   = c.close >= c.open

      const color = isUp ? '#22c55e' : '#ef4444'

      // Wick
      ctx.strokeStyle = color
      ctx.lineWidth   = 1
      ctx.beginPath()
      ctx.moveTo(x, highY)
      ctx.lineTo(x, lowY)
      ctx.stroke()

      // Body
      ctx.fillStyle = color
      const bodyTop = Math.min(openY, closeY)
      const bodyH   = Math.max(Math.abs(closeY - openY), 1)
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH)
    })

    // X-axis labels
    const step = Math.max(1, Math.floor(candles.length / 6))
    ctx.fillStyle = 'rgba(148,163,184,.6)'
    ctx.font      = '10px Inter, sans-serif'
    ctx.textAlign = 'center'
    candles.forEach((c, i) => {
      if (i % step === 0) {
        const x = toX(i)
        const d = new Date(c.timestamp)
        ctx.fillText(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), x, height - 8)
      }
    })
  }, [candles, width, height])

  return (
    <div className="candle-chart">
      {candles.length === 0 ? (
        <div className="candle-chart__empty">No chart data available</div>
      ) : (
        <canvas ref={canvasRef} />
      )}
    </div>
  )
}

export default CandleChart
