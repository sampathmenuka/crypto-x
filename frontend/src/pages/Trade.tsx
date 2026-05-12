import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketsApi } from '../api/markets';
import { ordersApi } from '../api/orders';
import { usePriceStore } from '../store/priceStore';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function Trade() {
  const { symbol } = useParams();
  const queryClient = useQueryClient();
  
  // Real-time price
  const { prices } = usePriceStore();
  const livePrice = prices[symbol || '']?.price;

  // Active Orders
  const { data: ordersData } = useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getOrders,
  });
  const activeOrders = ordersData?.data?.filter((o: any) => o.status === 'pending') || [];

  // Order Placement form
  const [side, setSide] = useState<'buy'|'sell'>('buy');
  const [type, setType] = useState<'market'|'limit'>('market');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const placeOrderMutation = useMutation({
    mutationFn: ordersApi.placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      setQuantity('');
      setPrice('');
      setError('');
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || 'Failed to place order');
    }
  });

  const cancelOrderMutation = useMutation({
    mutationFn: ordersApi.cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    }
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantity) return;

    placeOrderMutation.mutate({
      symbol,
      side,
      type,
      quantity: Number(quantity),
      price: type === 'limit' ? Number(price) : undefined,
    });
  };

  if (!symbol) return <div>Invalid Market</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      
      {/* Chart & Orderbook area */}
      <div className="lg:col-span-2 space-y-6 flex flex-col">
        <Card className="flex-1 flex flex-col min-h-[400px]">
          <CardHeader className="border-b border-gray-800 pb-4">
            <div className="flex items-center gap-4">
              <CardTitle className="text-2xl">{symbol}</CardTitle>
              {livePrice && (
                <div className="text-2xl font-mono text-emerald-400">
                  ${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-900 to-gray-950">
            {/* Real charts like LightweightCharts or TradingView would go here */}
            <div className="text-gray-500 flex flex-col items-center">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
              <span>Interactive Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Orders List */}
        <Card className="h-64 overflow-hidden flex flex-col">
          <CardHeader className="py-3 border-b border-gray-800">
            <CardTitle className="text-sm">Active Orders</CardTitle>
          </CardHeader>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-900 sticky top-0">
                <tr className="text-left text-gray-400">
                  <th className="p-3 font-medium">Pair</th>
                  <th className="p-3 font-medium">Side</th>
                  <th className="p-3 font-medium">Qty</th>
                  <th className="p-3 font-medium">Price</th>
                  <th className="p-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {activeOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-800/50">
                    <td className="p-3 font-medium">{order.symbol}</td>
                    <td className={`p-3 uppercase font-bold ${order.side === 'buy' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {order.side}
                    </td>
                    <td className="p-3 font-mono">{order.quantity}</td>
                    <td className="p-3 font-mono">{order.price ? `$${order.price}` : 'Market'}</td>
                    <td className="p-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        onClick={() => cancelOrderMutation.mutate(order.id)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
                {activeOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">No active orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Order Entry Panel */}
      <Card className="h-full flex flex-col">
        <CardHeader className="border-b border-gray-800">
          <div className="flex bg-gray-900 rounded-lg p-1 gap-1">
            <button
              onClick={() => setSide('buy')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${side === 'buy' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              Buy
            </button>
            <button
              onClick={() => setSide('sell')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${side === 'sell' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800'}`}
            >
              Sell
            </button>
          </div>
          
          <div className="flex gap-4 mt-4 text-sm font-medium">
            <button 
              onClick={() => setType('market')}
              className={`pb-2 border-b-2 transition-colors ${type === 'market' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Market
            </button>
            <button 
              onClick={() => setType('limit')}
              className={`pb-2 border-b-2 transition-colors ${type === 'limit' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
            >
              Limit
            </button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 flex-1 flex flex-col">
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col space-y-4">
            
            {error && <div className="text-red-500 text-xs p-2 bg-red-500/10 rounded border border-red-500/20">{error}</div>}

            {type === 'limit' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Limit Price (USD)</label>
                <div className="relative">
                  <Input 
                    type="number" 
                    step="0.00000001"
                    min="0"
                    placeholder="0.00" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required={type === 'limit'}
                    className="pl-8 text-lg font-mono"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</label>
              <Input 
                type="number" 
                step="0.00000001"
                min="0"
                placeholder="0.00" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="text-lg font-mono"
              />
            </div>
            
            <div className="mt-auto pt-6">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full font-bold text-lg"
                variant={side === 'buy' ? 'success' : 'danger'}
                disabled={placeOrderMutation.isPending || !quantity || (type === 'limit' && !price)}
              >
                {placeOrderMutation.isPending ? 'Processing...' : `${side === 'buy' ? 'Buy' : 'Sell'} ${symbol.split('-')[0]}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
