import React, { useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { useTradeStore } from '../../store/useTradeStore'
import { useMarketStore } from '../../store/useMarketStore'
import { formatPrice } from '../../utils'
import Spinner from '../ui/Spinner'
import Toast from '../ui/Toast'
import './OrderForm.css'

type Side = 'BUY' | 'SELL'
type OType = 'MARKET' | 'LIMIT'

const OrderForm: React.FC = () => {
  const { selectedMarket }       = useMarketStore()
  const { wallet, addOrder }     = useTradeStore()
  const [side, setSide]          = useState<Side>('BUY')
  const [orderType, setOrderType] = useState<OType>('LIMIT')
  const [price, setPrice]        = useState('')
  const [quantity, setQuantity]  = useState('')
  const [loading, setLoading]    = useState(false)
  const [toast, setToast]        = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const symbol = selectedMarket?.symbol ?? 'BTC/USDT'
  const currentPrice = selectedMarket?.price ?? 0

  const total = orderType === 'MARKET'
    ? currentPrice * parseFloat(quantity || '0')
    : parseFloat(price || '0') * parseFloat(quantity || '0')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quantity || parseFloat(quantity) <= 0) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800)) // simulate network

    addOrder({
      id: Date.now().toString(),
      symbol,
      type: side,
      price: orderType === 'MARKET' ? currentPrice : parseFloat(price),
      quantity: parseFloat(quantity),
      total,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    })

    setLoading(false)
    setQuantity('')
    setPrice('')
    setToast({ msg: `${side} order placed for ${quantity} ${symbol}`, type: 'success' })
    setTimeout(() => setToast(null), 3000)
  }

  const pct = (p: number) => {
    const avail = wallet.available
    if (!avail) return
    const qty = (avail * p) / (orderType === 'LIMIT' && parseFloat(price) ? parseFloat(price) : currentPrice || 1)
    setQuantity(qty.toFixed(6))
  }

  return (
    <form className="order-form card" onSubmit={handleSubmit} id="order-form">
      <h3 className="order-form__title">Place Order</h3>
      <p className="order-form__symbol">{symbol}</p>

      {/* Buy / Sell toggle */}
      <div className="order-form__side">
        <button
          type="button"
          id="btn-order-buy"
          className={`order-form__side-btn ${side === 'BUY' ? 'order-form__side-btn--buy' : ''}`}
          onClick={() => setSide('BUY')}
        >
          <ArrowUp size={14} /> Buy
        </button>
        <button
          type="button"
          id="btn-order-sell"
          className={`order-form__side-btn ${side === 'SELL' ? 'order-form__side-btn--sell' : ''}`}
          onClick={() => setSide('SELL')}
        >
          <ArrowDown size={14} /> Sell
        </button>
      </div>

      {/* Order type tabs */}
      <div className="tabs" style={{ marginBottom: 14 }}>
        {(['LIMIT', 'MARKET'] as OType[]).map((t) => (
          <button
            key={t}
            type="button"
            className={`tab ${orderType === t ? 'active' : ''}`}
            onClick={() => setOrderType(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Price */}
      {orderType === 'LIMIT' && (
        <label className="order-form__field">
          <span>Price (USDT)</span>
          <input
            id="order-price"
            className="input"
            type="number"
            step="any"
            min="0"
            placeholder={formatPrice(currentPrice)}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
      )}

      {/* Quantity */}
      <label className="order-form__field">
        <span>Amount ({symbol.split('/')[0]})</span>
        <input
          id="order-quantity"
          className="input"
          type="number"
          step="any"
          min="0"
          placeholder="0.00"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </label>

      {/* Percent shortcuts */}
      <div className="order-form__pcts">
        {[0.25, 0.5, 0.75, 1].map((p) => (
          <button
            key={p}
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => pct(p)}
          >
            {p * 100}%
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="order-form__total">
        <span>Total</span>
        <span className="text-mono">{total.toFixed(2)} USDT</span>
      </div>

      {/* Available */}
      <div className="order-form__available">
        <span>Available</span>
        <span className="text-mono">{wallet.available.toFixed(2)} USDT</span>
      </div>

      <button
        id="btn-submit-order"
        type="submit"
        className={`btn btn-lg ${side === 'BUY' ? 'btn-success' : 'btn-danger'}`}
        disabled={loading}
        style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
      >
        {loading ? <Spinner size={16} /> : `${side} ${symbol.split('/')[0]}`}
      </button>

      {toast && (
        <div style={{ marginTop: 10 }}>
          <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
    </form>
  )
}

export default OrderForm
