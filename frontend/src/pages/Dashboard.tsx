import React, { useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Activity, ArrowUpRight, Wallet, ArrowRight } from 'lucide-react';
import { useMarketStore } from '../store/useMarketStore';
import { useTradeStore } from '../store/useTradeStore';
import MarketCard from '../components/common/MarketCard';
import { formatCurrency, formatPercent } from '../utils';

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  trend?: number;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'danger';
}> = ({ icon, label, value, sub, trend, variant = 'primary' }) => {
  const colors = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    success: 'bg-up/10 text-up border-up/20',
    danger: 'bg-down/10 text-down border-down/20',
  };

  return (
    <div 
      className="glass-card p-6 border-white/5 hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl border ${colors[variant]}`}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend >= 0 ? 'text-up' : 'text-down'}`}>
            {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {formatPercent(trend)}
          </div>
        )}
      </div>
      <div>
        <p className="small-text mb-1">{label}</p>
        <p className="text-2xl font-bold mb-1">{value}</p>
        {sub && <p className="text-sm text-text-secondary">{sub}</p>}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { markets, fetchMarkets, isLoading } = useMarketStore();
  const { wallet, orders, positions } = useTradeStore();

  useEffect(() => {
    fetchMarkets(20);
  }, [fetchMarkets]);

  const totalPnl = positions.reduce((acc, p) => acc + p.profit, 0);

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="section-title mb-1">Dashboard</h1>
          <p className="body-text text-text-secondary">Welcome back, your portfolio is up 5.4% today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost !py-2.5 !px-4 flex items-center gap-2">
            <Activity size={18} />
            <span>Activity</span>
          </button>
          <button className="btn-primary !py-2.5 !px-4 flex items-center gap-2">
            <Wallet size={18} />
            <span>Deposit</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<DollarSign size={20} />}
          label="Net Worth"
          value={formatCurrency(wallet.balance + totalPnl)}
          sub={`Available: ${formatCurrency(wallet.available)}`}
          trend={5.4}
          variant="primary"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Total Profit"
          value={formatCurrency(Math.abs(totalPnl))}
          sub={totalPnl >= 0 ? 'All-time profit' : 'All-time loss'}
          trend={totalPnl >= 0 ? 12.5 : -4.2}
          variant="success"
        />
        <StatCard
          icon={<BarChart2 size={20} />}
          label="Open Orders"
          value={String(orders.filter((o) => o.status === 'PENDING').length)}
          sub={`${orders.length} total orders executed`}
          variant="secondary"
        />
        <StatCard
          icon={<Activity size={20} />}
          label="Active Positions"
          value={String(positions.length)}
          sub="Current trading pairs"
          variant="accent"
        />
      </div>

      {/* Market Grid Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="card-title">Trending Markets</h2>
          <button className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {markets.slice(0, 8).map((m) => (
              <MarketCard key={m.id} market={m} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity Table */}
      {orders.length > 0 && (
        <div className="space-y-6">
          <h2 className="card-title">Recent Activity</h2>
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 small-text font-bold">Market</th>
                    <th className="px-6 py-4 small-text font-bold">Type</th>
                    <th className="px-6 py-4 small-text font-bold text-right">Price</th>
                    <th className="px-6 py-4 small-text font-bold text-right">Amount</th>
                    <th className="px-6 py-4 small-text font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold">{o.symbol}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          o.type === 'BUY' ? 'bg-up/10 text-up' : 'bg-down/10 text-down'
                        }`}>
                          {o.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono">
                        {formatCurrency(o.price)}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-text-secondary">
                        {o.quantity}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          o.status === 'FILLED' ? 'bg-up/10 text-up' :
                          o.status === 'CANCELLED' ? 'bg-down/10 text-down' : 'bg-secondary/10 text-secondary'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
