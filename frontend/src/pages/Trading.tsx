import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useMarketStore } from '../store/useMarketStore'
import { useTradeStore } from '../store/useTradeStore'
import CandleChart from '../components/charts/CandleChart'
import OrderForm from '../components/trading/OrderForm'
import OrderBook from '../components/trading/OrderBook'
import { formatPrice, formatPercent, formatCompact } from '../utils'
import { TrendingUp, TrendingDown, Clock } from 'lucide-react'
import './Trading.css'

const INTERVALS = ['1m', '5m', '15m', '1h', '4h', '1d'] as const

const Trading: React.FC = () => {
  const location = useLocation()
  const passedSymbol: string | undefined = (location.state as any)?.symbol

  const {
    markets, selectedMarket, candles,
    fetchMarkets, fetchMarket, fetchCandles,
    setSelectedMarket, setSelectedInterval, selectedInterval,
  } = useMarketStore()
  const { orders } = useTradeStore()
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialise
  useEffect(() => {
    fetchMarkets(20)
  }, [fetchMarkets])

  useEffect(() => {
    if (markets.length === 0) return
    const target = passedSymbol
      ? markets.find((m) => m.symbol === passedSymbol)
      : markets[0]
    if (target) {
      setSelectedMarket(target)
      fetchCandles(target.symbol, selectedInterval)
    }
  }, [markets])

  const handleSelectMarket = (symbol: string) => {
    const m = markets.find((x) => x.symbol === symbol)
    if (m) {
      setSelectedMarket(m)
      fetchCandles(m.symbol, selectedInterval)
    }
  }

  const handleInterval = (iv: string) => {
    setSelectedInterval(iv)
    if (selectedMarket) fetchCandles(selectedMarket.symbol, iv)
  }

  const openOrders = orders.filter((o) => o.status === 'PENDING')

  return (
    <div className="trading fade-in">
      {/* Top bar: symbol selector + stats */}
      <div className="trading__topbar">
        <div className="trading__symbol-select-wrap">
          <select
            id="trading-symbol-select"
            className="input-field trading__symbol-select bg-background/80"
            style={{ minWidth: '180px' }}
            value={selectedMarket?.symbol ?? ''}
            onChange={(e) => handleSelectMarket(e.target.value)}
          >
            {markets.map((m) => (
              <option key={m.symbol} value={m.symbol} className="bg-background text-text-primary">
                {m.symbol}
              </option>
            ))}
          </select>
        </div>

        {selectedMarket && (
          <div className="trading__stats">
            <div className="trading__stat">
              <span className="trading__stat-label">Price</span>
              <span className="trading__stat-value text-mono" style={{ fontSize: 18, fontWeight: 800 }}>
                {formatPrice(selectedMarket.price)}
              </span>
            </div>
            <div className="trading__stat">
              <span className="trading__stat-label">24h Change</span>
              <span className={`trading__stat-value ${selectedMarket.change24h >= 0 ? 'text-up' : 'text-down'}`}>
                {selectedMarket.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {formatPercent(selectedMarket.change24h)}
              </span>
            </div>
            <div className="trading__stat">
              <span className="trading__stat-label">24h Volume</span>
              <span className="trading__stat-value text-mono">${formatCompact(selectedMarket.volume24h)}</span>
            </div>
            <div className="trading__stat">
              <span className="trading__stat-label">Market Cap</span>
              <span className="trading__stat-value text-mono">${formatCompact(selectedMarket.marketCap)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main grid */}
      <div className="trading__grid" ref={containerRef}>
        {/* Chart column */}
        <div className="trading__chart-col">
          {/* Interval selector */}
          <div className="trading__intervals card" style={{ padding: '8px 14px' }}>
            <Clock size={13} style={{ color: 'var(--color-text-3)' }} />
            {INTERVALS.map((iv) => (
              <button
                key={iv}
                id={`btn-interval-${iv}`}
                className={`trading__interval-btn ${selectedInterval === iv ? 'trading__interval-btn--active' : ''}`}
                onClick={() => handleInterval(iv)}
              >
                {iv}
              </button>
            ))}
          </div>

          {/* Candle chart */}
          <div className="card trading__chart-card">
            <CandleChart candles={candles} height={340} />
          </div>

          {/* Open orders */}
          {openOrders.length > 0 && (
            <div className="card trading__open-orders">
              <p className="trading__open-orders-title">Open Orders ({openOrders.length})</p>
              <table className="trading__orders-table">
                <thead>
                  <tr>
                    <th>Symbol</th><th>Side</th><th>Price</th><th>Qty</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {openOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="text-mono">{o.symbol}</td>
                      <td><span className={`badge ${o.type === 'BUY' ? 'badge-green' : 'badge-red'}`}>{o.type}</span></td>
                      <td className="text-mono">{o.price.toFixed(2)}</td>
                      <td className="text-mono">{o.quantity}</td>
                      <td><span className="badge badge-blue">{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="trading__right-col">
          <OrderBook
            currentPrice={selectedMarket?.price ?? 0}
            symbol={selectedMarket?.symbol ?? '—'}
          />
          <OrderForm />
        </div>
      </div>
    </div>
  )
}

export default Trading
