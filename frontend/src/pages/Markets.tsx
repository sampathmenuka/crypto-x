import React, { useEffect, useState } from 'react'
import { Search, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react'
import { useMarketStore } from '../store/useMarketStore'
import { useNavigate } from 'react-router-dom'
import { formatPrice, formatPercent, formatCompact } from '../utils'
import { useDebounce } from '../hooks'
import { Market } from '../types'
import './Markets.css'

type SortKey = 'name' | 'price' | 'change24h' | 'marketCap' | 'volume24h'
type SortDir = 'asc' | 'desc'

const Markets: React.FC = () => {
  const navigate = useNavigate()
  const { markets, fetchMarkets, searchMarkets, isLoading } = useMarketStore()
  const [query, setQuery]       = useState('')
  const [sortKey, setSortKey]   = useState<SortKey>('marketCap')
  const [sortDir, setSortDir]   = useState<SortDir>('desc')
  const debouncedQuery          = useDebounce(query, 380)

  useEffect(() => { fetchMarkets(50) }, [fetchMarkets])

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchMarkets(debouncedQuery.trim())
    } else {
      fetchMarkets(50)
    }
  }, [debouncedQuery])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('desc') }
  }

  const sorted = [...markets].sort((a, b) => {
    const va = a[sortKey] as number | string
    const vb = b[sortKey] as number | string
    const cmp = typeof va === 'string' ? va.localeCompare(vb as string) : (va as number) - (vb as number)
    return sortDir === 'asc' ? cmp : -cmp
  })

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === 'asc' ? <TrendingUp size={12} /> : <TrendingDown size={12} />
    ) : (
      <ArrowUpDown size={11} style={{ opacity: .35 }} />
    )

  return (
    <div className="markets-page fade-in">
      <div className="markets-page__header">
        <div>
          <h1 className="markets-page__title">Markets</h1>
          <p className="markets-page__sub">Live cryptocurrency prices and statistics</p>
        </div>
        <div className="markets-page__search-wrap">
          <Search size={14} className="markets-page__search-icon" />
          <input
            id="markets-search"
            className="input markets-page__search"
            placeholder="Search coin…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="markets-table">
          <thead>
            <tr>
              <th>#</th>
              <th className="sortable" onClick={() => handleSort('name')}>
                Name <SortIcon col="name" />
              </th>
              <th className="sortable" onClick={() => handleSort('price')}>
                Price <SortIcon col="price" />
              </th>
              <th className="sortable" onClick={() => handleSort('change24h')}>
                24h % <SortIcon col="change24h" />
              </th>
              <th className="sortable" onClick={() => handleSort('marketCap')}>
                Market Cap <SortIcon col="marketCap" />
              </th>
              <th className="sortable" onClick={() => handleSort('volume24h')}>
                Volume 24h <SortIcon col="volume24h" />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j}>
                        <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 4 }} />
                      </td>
                    ))}
                  </tr>
                ))
              : sorted.map((m, idx) => (
                  <tr key={m.id} id={`market-row-${m.symbol.toLowerCase()}`}>
                    <td className="markets-table__rank">{idx + 1}</td>
                    <td>
                      <div className="markets-table__name">
                        <div className="markets-table__avatar">
                          {m.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="markets-table__symbol">{m.symbol}</p>
                          <p className="markets-table__coin-name">{m.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-mono" style={{ fontWeight: 600 }}>{formatPrice(m.price)}</td>
                    <td>
                      <span className={`badge ${m.change24h >= 0 ? 'badge-green' : 'badge-red'}`}>
                        {m.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {formatPercent(m.change24h)}
                      </span>
                    </td>
                    <td className="text-mono">${formatCompact(m.marketCap)}</td>
                    <td className="text-mono">${formatCompact(m.volume24h)}</td>
                    <td>
                      <button
                        id={`btn-trade-${m.symbol.toLowerCase()}`}
                        className="btn btn-ghost btn-sm"
                        onClick={() => navigate('/trading', { state: { symbol: m.symbol } })}
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!isLoading && sorted.length === 0 && (
          <div className="markets-page__empty">No markets found for "{query}"</div>
        )}
      </div>
    </div>
  )
}

export default Markets
