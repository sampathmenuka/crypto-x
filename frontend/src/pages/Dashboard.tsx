import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '../api/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: portfolioApi.getPortfolio
  });

  if (isLoading) return <div className="text-gray-400">Loading dashboard...</div>;

  const portfolio = data?.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, {user?.username}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-200 uppercase tracking-wider">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">
              ${portfolio?.totalValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
            </div>
            <div className="mt-2 text-sm text-emerald-400 flex items-center gap-1">
              +0.00% (Today)
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Assets</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left text-sm font-medium text-gray-400">
                  <th className="p-4">Asset</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Available</th>
                  <th className="p-4">Locked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {portfolio?.balances && Object.entries(portfolio.balances).map(([asset, bal]: [string, any]) => (
                  <tr key={asset} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-medium">{asset}</td>
                    <td className="p-4">{bal.total.toLocaleString()}</td>
                    <td className="p-4">{bal.available.toLocaleString()}</td>
                    <td className="p-4 text-gray-500">{bal.locked.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!portfolio?.balances || Object.keys(portfolio.balances).length === 0) && (
              <div className="p-8 text-center text-gray-500">No assets found in your portfolio.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
