import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { Market } from '../../types';
import { formatPrice, formatPercent, formatCompact } from '../../utils';

interface MarketCardProps {
  market: Market;
  onClick?: (market: Market) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onClick }) => {
  const isPositive = market.change24h >= 0;

  return (
    <div
      className="glass-card p-5 cursor-pointer group hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
      onClick={() => onClick?.(market)}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-sm border border-white/5">
            {market.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="font-bold flex items-center gap-1">
              {market.symbol}
              <ArrowUpRight size={12} className="text-text-secondary group-hover:text-primary transition-colors" />
            </div>
            <div className="text-sm text-text-secondary">{market.name}</div>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-up' : 'text-down'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {formatPercent(market.change24h)}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xl font-mono font-bold tracking-tight">
          {formatPrice(market.price)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
        <div>
          <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">24h Vol</div>
          <div className="text-xs font-medium">{formatCompact(market.volume24h)}</div>
        </div>
        <div>
          <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Market Cap</div>
          <div className="text-xs font-medium">{formatCompact(market.marketCap)}</div>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${isPositive ? 'bg-primary' : 'bg-down'}`}
          style={{ width: `${Math.min(Math.abs(market.change24h) * 5 + 20, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default MarketCard;
