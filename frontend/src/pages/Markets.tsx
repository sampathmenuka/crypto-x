import React from 'react';
import { Search, ArrowUpRight, ArrowDownRight, Filter, ChevronRight } from 'lucide-react';
import { useMarketStore } from '../store/useMarketStore';
import { formatPrice, formatPercent, formatCompact } from '../utils';

const Markets: React.FC = () => {
  const { markets, loading } = useMarketStore();

  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-500">
      <div className="container mx-auto px-6 pb-12 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="section-title mb-2">Market Overview</h1>
            <p className="body-text text-text-secondary">Track the latest prices and market trends in real-time.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 outline-none focus:border-primary/50 transition-all w-full md:w-64"
              />
            </div>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-text-secondary hover:text-white transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Market Cap', value: '$2.51T', change: '+2.4%', up: true },
            { label: '24h Volume', value: '$84.2B', change: '-1.1%', up: false },
            { label: 'BTC Dominance', value: '52.4%', change: '+0.2%', up: true }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6">
              <div className="small-text mb-2">{stat.label}</div>
              <div className="flex items-end gap-3">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-sm font-medium flex items-center gap-0.5 mb-1 ${stat.up ? 'text-up' : 'text-down'}`}>
                  {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Markets Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 small-text font-bold">Asset</th>
                  <th className="px-6 py-4 small-text font-bold text-right">Price</th>
                  <th className="px-6 py-4 small-text font-bold text-right">24h Change</th>
                  <th className="px-6 py-4 small-text font-bold text-right hidden md:table-cell">Market Cap</th>
                  <th className="px-6 py-4 small-text font-bold text-right hidden lg:table-cell">Volume (24h)</th>
                  <th className="px-6 py-4 small-text font-bold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array(10).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-6 h-16">
                        <div className="h-4 bg-white/5 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  markets.map((market) => (
                    <tr 
                      key={market.symbol}
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs">
                            {market.symbol[0]}
                          </div>
                          <div>
                            <div className="font-bold">{market.symbol}</div>
                            <div className="text-xs text-text-secondary">{market.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right font-mono font-medium">
                        {formatPrice(market.price)}
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className={`inline-flex items-center gap-1 font-medium ${market.change24h >= 0 ? 'text-up' : 'text-down'}`}>
                          {market.change24h >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {formatPercent(market.change24h)}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right text-text-secondary hidden md:table-cell">
                        $842.1B
                      </td>
                      <td className="px-6 py-6 text-right text-text-secondary hidden lg:table-cell">
                        $24.5B
                      </td>
                      <td className="px-6 py-6 text-right">
                        <button className="p-2 text-text-secondary group-hover:text-primary transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;
