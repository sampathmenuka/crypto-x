import React, { useEffect, useState } from 'react'
import { useTradeStore } from '../store/useTradeStore'
import { formatPrice, formatPercent } from '../utils'
import { TrendingUp, TrendingDown, Filter, X } from 'lucide-react'
import { Order, OrderStatus } from '../types'
import './Orders.css'

const STATUS_FILTERS: Array<OrderStatus | 'ALL'> = ['ALL', 'PENDING', 'FILLED', 'CANCELLED']

const Orders: React.FC = () => {
  const { orders, fetchOrders, cancelOrder } = useTradeStore()
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL')

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const filtered = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter)

  return (
    <div className="orders-page fade-in">
      <div className="orders-page__header">
        <div>
          <h1 className="orders-page__title">Orders</h1>
          <p className="orders-page__sub">{orders.length} total orders</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="orders-page__filters">
        <Filter size={13} style={{ color: 'var(--color-text-3)' }} />
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            id={`filter-${f.toLowerCase()}`}
            className={`orders-filter-btn ${filter === f ? 'orders-filter-btn--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
            {f !== 'ALL' && (
              <span className="orders-filter-count">
                {orders.filter((o) => o.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div className="orders-page__empty">
            <Filter size={32} />
            <p>{filter === 'ALL' ? 'No orders yet. Place your first trade!' : `No ${filter.toLowerCase()} orders.`}</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Symbol</th>
                <th>Side</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} id={`order-row-${o.id}`}>
                  <td className="orders-table__time">
                    {new Date(o.createdAt).toLocaleString('en-US', {
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                  <td style={{ fontWeight: 700 }}>{o.symbol}</td>
                  <td>
                    <span className={`badge ${o.type === 'BUY' ? 'badge-green' : 'badge-red'}`}>
                      {o.type === 'BUY' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {o.type}
                    </span>
                  </td>
                  <td className="text-mono">{formatPrice(o.price)}</td>
                  <td className="text-mono">{o.quantity}</td>
                  <td className="text-mono">{o.total.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${
                      o.status === 'FILLED' ? 'badge-green' :
                      o.status === 'CANCELLED' ? 'badge-red' : 'badge-blue'
                    }`}>{o.status}</span>
                  </td>
                  <td>
                    {o.status === 'PENDING' && (
                      <button
                        id={`btn-cancel-${o.id}`}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--color-red)', borderColor: 'rgba(239,68,68,.3)' }}
                        onClick={() => cancelOrder(o.id)}
                      >
                        <X size={12} /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Orders
