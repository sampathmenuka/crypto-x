import React, { useState } from 'react'
import { Search, Bell, Settings, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react'
import { useMarketStore } from '../../store/useMarketStore'
import { useDebounce } from '../../hooks'
import { formatPrice, formatPercent } from '../../utils'
import './Navbar.css'

const Navbar: React.FC = () => {
  const { markets, searchMarkets } = useMarketStore()
  const [query, setQuery]         = useState('')
  const [open, setOpen]           = useState(false)
  const debouncedQuery            = useDebounce(query, 350)

  React.useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      searchMarkets(debouncedQuery.trim())
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [debouncedQuery, searchMarkets])

  const topMarkets = markets.slice(0, 3)

  return (
    <header className="navbar">
      {/* Search */}
      <div className="navbar__search-wrap">
        <Search size={14} className="navbar__search-icon" />
        <input
          id="navbar-search"
          className="navbar__search"
          placeholder="Search markets… (BTC, ETH…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setOpen(false), 180)}
        />
        {open && markets.length > 0 && (
          <div className="navbar__dropdown fade-in">
            {markets.slice(0, 6).map((m) => (
              <div key={m.symbol} className="navbar__dropdown-item">
                <span className="navbar__dropdown-symbol">{m.symbol}</span>
                <span className="navbar__dropdown-name">{m.name}</span>
                <span className={`navbar__dropdown-price ${m.change24h >= 0 ? 'text-up' : 'text-down'}`}>
                  {formatPrice(m.price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ticker strip */}
      <div className="navbar__tickers">
        {topMarkets.map((m) => (
          <div key={m.symbol} className="navbar__ticker">
            <span className="navbar__ticker-symbol">{m.symbol}</span>
            <span className="navbar__ticker-price text-mono">{formatPrice(m.price)}</span>
            <span className={`navbar__ticker-change ${m.change24h >= 0 ? 'text-up' : 'text-down'}`}>
              {m.change24h >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {formatPercent(m.change24h)}
            </span>
          </div>
        ))}
      </div>

      {/* Right actions */}
      <div className="navbar__actions">
        <button id="btn-notifications" className="navbar__icon-btn" title="Notifications">
          <Bell size={16} />
          <span className="navbar__notif-dot" />
        </button>
        <button id="btn-settings" className="navbar__icon-btn" title="Settings">
          <Settings size={16} />
        </button>
        <div className="navbar__network">
          <span className="navbar__network-dot" />
          <span>Live</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
