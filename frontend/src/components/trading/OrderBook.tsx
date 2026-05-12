import React from 'react'
import { Order } from '../../types'
import { useTradeStore } from '../../store/useTradeStore'
import { formatPrice } from '../../utils'
import './OrderBook.css'

// Generate a mock order book from the current market price
function generateLevels(basePrice: number, side: 'ask' | 'bid', count = 10) {
  return Array.from({ length: count }, (_, i) => {
    const offset = (i + 1) * basePrice * 0.0003
    const price  = side === 'ask' ? basePrice + offset : basePrice - offset
    const qty    = parseFloat((Math.random() * 2 + 0.01).toFixed(4))
    return { price, qty, total: price * qty }
  })
}

interface OrderBookProps {
  currentPrice: number
  symbol: string
}

const OrderBook: React.FC<OrderBookProps> = ({ currentPrice, symbol }) => {
  if (!currentPrice) return null

  const asks   = generateLevels(currentPrice, 'ask').reverse()
  const bids   = generateLevels(currentPrice, 'bid')
  const maxVol = Math.max(...asks.map((a) => a.qty), ...bids.map((b) => b.qty))

  return (
    <div className="order-book card">
      <div className="order-book__header">
        <h3 className="order-book__title">Order Book</h3>
        <span className="order-book__symbol">{symbol}</span>
      </div>

      {/* Column labels */}
      <div className="order-book__labels">
        <span>Price (USDT)</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      {/* Asks (sells) */}
      <div className="order-book__section">
        {asks.map((row, i) => (
          <div key={i} className="order-book__row order-book__row--ask">
            <div
              className="order-book__depth order-book__depth--ask"
              style={{ width: `${(row.qty / maxVol) * 100}%` }}
            />
            <span className="order-book__price text-down text-mono">{formatPrice(row.price)}</span>
            <span className="order-book__qty text-mono">{row.qty.toFixed(4)}</span>
            <span className="order-book__total text-mono">{row.total.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Mid price */}
      <div className="order-book__mid">
        <span className="text-mono" style={{ fontSize: 16, fontWeight: 700 }}>
          {formatPrice(currentPrice)}
        </span>
        <span className="order-book__mid-label">Last price</span>
      </div>

      {/* Bids (buys) */}
      <div className="order-book__section">
        {bids.map((row, i) => (
          <div key={i} className="order-book__row order-book__row--bid">
            <div
              className="order-book__depth order-book__depth--bid"
              style={{ width: `${(row.qty / maxVol) * 100}%` }}
            />
            <span className="order-book__price text-up text-mono">{formatPrice(row.price)}</span>
            <span className="order-book__qty text-mono">{row.qty.toFixed(4)}</span>
            <span className="order-book__total text-mono">{row.total.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderBook
