import React, { useEffect } from 'react'
import { useTradeStore } from '../store/useTradeStore'
import { formatCurrency, formatPercent } from '../utils'
import { TrendingUp, TrendingDown, Wallet as WalletIcon, Lock, Zap } from 'lucide-react'
import './Wallet.css'

const Wallet: React.FC = () => {
  const { wallet, positions, fetchWallet, fetchPositions } = useTradeStore()

  useEffect(() => {
    fetchWallet()
    fetchPositions()
  }, [fetchWallet, fetchPositions])

  const totalPnl = positions.reduce((acc, p) => acc + p.profit, 0)

  return (
    <div className="wallet-page fade-in">
      <h1 className="wallet-page__title">Wallet</h1>
      <p className="wallet-page__sub">Your balances and open positions</p>

      {/* Balance cards */}
      <div className="wallet-page__balances">
        <div className="wallet-balance-card card">
          <div className="wallet-balance-card__icon" style={{ background: 'rgba(59,130,246,.12)', color: 'var(--color-primary)' }}>
            <WalletIcon size={20} />
          </div>
          <p className="wallet-balance-card__label">Total Balance</p>
          <p className="wallet-balance-card__value">{formatCurrency(wallet.balance)}</p>
          <p className="wallet-balance-card__sub">USDT equivalent</p>
        </div>

        <div className="wallet-balance-card card">
          <div className="wallet-balance-card__icon" style={{ background: 'rgba(34,197,94,.12)', color: 'var(--color-green)' }}>
            <Zap size={20} />
          </div>
          <p className="wallet-balance-card__label">Available</p>
          <p className="wallet-balance-card__value">{formatCurrency(wallet.available)}</p>
          <p className="wallet-balance-card__sub">Ready to trade</p>
        </div>

        <div className="wallet-balance-card card">
          <div className="wallet-balance-card__icon" style={{ background: 'rgba(245,158,11,.12)', color: 'var(--color-yellow)' }}>
            <Lock size={20} />
          </div>
          <p className="wallet-balance-card__label">Locked</p>
          <p className="wallet-balance-card__value">{formatCurrency(wallet.locked)}</p>
          <p className="wallet-balance-card__sub">In open orders</p>
        </div>

        <div className="wallet-balance-card card">
          <div className="wallet-balance-card__icon" style={{ background: totalPnl >= 0 ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)', color: totalPnl >= 0 ? 'var(--color-green)' : 'var(--color-red)' }}>
            {totalPnl >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <p className="wallet-balance-card__label">Unrealised P&L</p>
          <p className="wallet-balance-card__value" style={{ color: totalPnl >= 0 ? 'var(--color-green)' : 'var(--color-red)' }}>
            {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
          </p>
          <p className="wallet-balance-card__sub">Across all positions</p>
        </div>
      </div>

      {/* Positions */}
      <h2 className="wallet-page__section-title">Open Positions</h2>
      <div className="card" style={{ overflow: 'hidden' }}>
        {positions.length === 0 ? (
          <div className="wallet-page__empty">
            <WalletIcon size={32} />
            <p>No open positions yet. Start trading to see your positions here.</p>
          </div>
        ) : (
          <table className="wallet-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>Current Price</th>
                <th>P&L</th>
                <th>P&L %</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p, i) => (
                <tr key={i} id={`position-row-${p.symbol.toLowerCase()}`}>
                  <td style={{ fontWeight: 700 }}>{p.symbol}</td>
                  <td className="text-mono">{p.quantity}</td>
                  <td className="text-mono">{p.averagePrice.toFixed(4)}</td>
                  <td className="text-mono">{p.currentPrice.toFixed(4)}</td>
                  <td className={`text-mono ${p.profit >= 0 ? 'text-up' : 'text-down'}`}>
                    {p.profit >= 0 ? '+' : ''}{formatCurrency(p.profit)}
                  </td>
                  <td>
                    <span className={`badge ${p.profitPercentage >= 0 ? 'badge-green' : 'badge-red'}`}>
                      {p.profitPercentage >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {formatPercent(p.profitPercentage)}
                    </span>
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

export default Wallet
