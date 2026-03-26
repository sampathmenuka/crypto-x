import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { marketsApi } from '../api/markets';
import { usePriceStore } from '../store/priceStore';
import { Card } from '../components/ui/Card';

export default function Markets() {
  const { data, isLoading } = useQuery({
    queryKey: ['markets'],
    queryFn: marketsApi.getMarkets
  });
  
  const { prices } = usePriceStore();

  if (isLoading) return <div className="text-gray-400">Loading markets...</div>;

  const marketsList = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Markets</h1>
        <p className="text-gray-400 mt-1">Live cryptocurrency prices and trading pairs.</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left text-sm font-medium text-gray-400">
                <th className="p-4">Trading Pair</th>
                <th className="p-4">Price</th>
                <th className="p-4">24h Change</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {marketsList.map((market: any) => {
                const liveData = prices[market.symbol] || market;
                const isPositive = liveData.change24h >= 0;
                
                return (
                  <tr key={market.symbol} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs text-gray-300">
                          {market.symbol.split('-')[0]}
                        </div>
                        <span className="font-bold">{market.symbol}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium font-mono text-lg tracking-tight">
                      ${liveData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    </td>
                    <td className={`p-4 font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                      {isPositive ? '+' : ''}{liveData.change24h.toFixed(2)}%
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        to={`/trade/${market.symbol}`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white h-9 px-4 opacity-0 group-hover:opacity-100"
                      >
                        Trade
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
