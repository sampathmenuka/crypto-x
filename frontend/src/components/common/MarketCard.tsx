import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Market } from '../../types'
import { formatPrice, formatPercent, formatCompact } from '../../utils'
import { useFlash } from '../../hooks'
import './MarketCard.css'

interface MarketCardProps {
  market: Market
  onClick?: (market: Market) => void
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => {
  const isPositive = market.change24h >= 0
  const flashing   = useFlash(market.price)

  return (
    <div
      id={`market-card-${market.symbol.toLowerCase()}`}
      className={`market-card card ${flashing ? 'market-card--flash' : ''}`}
      onClick={() => onClick?.(market)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(market)}
    >
      <div className="market-card__header">
        <div className="market-card__identity">
          <div className="market-card__avatar">
            {market.symbol.slice(0, 2)}
          </div>
          <div>
            <p className="market-card__symbol">{market.symbol}</p>
            <p className="market-card__name">{market.name}</p>
          </div>
        </div>
        <span className={`badge ${isPositive ? 'badge-green' : 'badge-red'}`}>
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {formatPercent(market.change24h)}
        </span>
      </div>

      <div className="market-card__price text-mono">
        {formatPrice(market.price)}
      </div>

      <div className="market-card__stats">
        <div className="market-card__stat">
          <span className="market-card__stat-label">Vol 24h</span>
          <span className="market-card__stat-value">{formatCompact(market.volume24h)}</span>
        </div>
        <div className="market-card__stat">
          <span className="market-card__stat-label">Mkt Cap</span>
          <span className="market-card__stat-value">{formatCompact(market.marketCap)}</span>
        </div>
      </div>

      {/* Mini sparkline bar */}
      <div className="market-card__bar">
        <div
          className={`market-card__bar-fill ${isPositive ? 'market-card__bar-fill--up' : 'market-card__bar-fill--down'}`}
          style={{ width: `${Math.min(Math.abs(market.change24h) * 10, 100)}%` }}
        />
      </div>
    </div>
  )
}

export default MarketCard
