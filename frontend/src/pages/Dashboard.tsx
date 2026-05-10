import React, { useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Activity, ArrowUpRight } from 'lucide-react'
import { useMarketStore } from '../store/useMarketStore'
import { useTradeStore } from '../store/useTradeStore'
import MarketCard from '../components/common/MarketCard'
import { formatCurrency, formatPercent, formatCompact } from '../utils'
import './Dashboard.css'

const StatCard: React.FC<{
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  trend?: number
  color?: string
}> = ({ icon, label, value, sub, trend, color = 'var(--color-primary)' }) => (
  <div className="stat-card card">
    <div className="stat-card__icon" style={{ background: `${color}22`, color }}>
      {icon}
    </div>
    <div className="stat-card__body">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {sub && <p className="stat-card__sub">{sub}</p>}
    </div>
    {trend !== undefined && (
      <span className={`badge ${trend >= 0 ? 'badge-green' : 'badge-red'}`} style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}>
        {trend >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {formatPercent(trend)}
      </span>
    )}
  </div>
)

const Dashboard: React.FC = () => {
  const { markets, fetchMarkets, isLoading } = useMarketStore()
  const { wallet, orders, positions }        = useTradeStore()

  useEffect(() => { fetchMarkets(20) }, [fetchMarkets])

  const totalPnl = positions.reduce((acc, p) => acc + p.profit, 0)

  return (
    <div className="dashboard fade-in">
      <div className="dashboard__heading">
        <div>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__sub">Welcome back! Here's your portfolio overview.</p>
        </div>
        <button id="btn-refresh-markets" className="btn btn-ghost" onClick={() => fetchMarkets(20)}>
          <Activity size={14} /> Refresh
        </button>
      </div>

      {/* Stats row */}
      <div className="dashboard__stats">
        <StatCard
          icon={<DollarSign size={18} />}
          label="Portfolio Value"
          value={formatCurrency(wallet.balance + totalPnl)}
          sub={`Available: ${formatCurrency(wallet.available)}`}
          trend={totalPnl !== 0 ? (totalPnl / (wallet.balance || 1)) * 100 : undefined}
          color="var(--color-primary)"
        />
        <StatCard
          icon={<TrendingUp size={18} />}
          label="Total P&L"
          value={formatCurrency(Math.abs(totalPnl))}
          sub={totalPnl >= 0 ? 'Profit' : 'Loss'}
          trend={totalPnl >= 0 ? Math.abs(totalPnl) : -Math.abs(totalPnl)}
          color="var(--color-green)"
        />
        <StatCard
          icon={<BarChart2 size={18} />}
          label="Open Orders"
          value={String(orders.filter((o) => o.status === 'PENDING').length)}
          sub={`${orders.length} total orders`}
          color="var(--color-accent)"
        />
        <StatCard
          icon={<Activity size={18} />}
          label="Positions"
          value={String(positions.length)}
          sub="Active positions"
          color="var(--color-yellow)"
        />
      </div>

      {/* Market overview */}
      <div className="dashboard__section-header">
        <h2 className="dashboard__section-title">Market Overview</h2>
        <a href="/markets" className="dashboard__see-all">
          See all <ArrowUpRight size={13} />
        </a>
      </div>

      {isLoading ? (
        <div className="dashboard__skeleton-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 148, borderRadius: 16 }} />
          ))}
        </div>
      ) : markets.length === 0 ? (
        <div className="dashboard__empty">
          <Activity size={36} />
          <p>No market data available. Connect to the backend to load live prices.</p>
        </div>
      ) : (
        <div className="dashboard__market-grid">
          {markets.slice(0, 8).map((m) => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      )}

      {/* Recent orders */}
      {orders.length > 0 && (
        <>
          <div className="dashboard__section-header" style={{ marginTop: 32 }}>
            <h2 className="dashboard__section-title">Recent Orders</h2>
          </div>
          <div className="card" style={{ overflow: 'hidden' }}>
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Side</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id}>
                    <td className="text-mono" style={{ fontWeight: 600 }}>{o.symbol}</td>
                    <td>
                      <span className={`badge ${o.type === 'BUY' ? 'badge-green' : 'badge-red'}`}>
                        {o.type}
                      </span>
                    </td>
                    <td className="text-mono">{o.price.toFixed(2)}</td>
                    <td className="text-mono">{o.quantity}</td>
                    <td className="text-mono">{o.total.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${
                        o.status === 'FILLED' ? 'badge-green' :
                        o.status === 'CANCELLED' ? 'badge-red' : 'badge-blue'
                      }`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
