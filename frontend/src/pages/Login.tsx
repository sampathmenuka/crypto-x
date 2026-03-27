import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      if (res.success) {
        setAuth(res.data.user, res.data.token);
        navigate('/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-500 text-sm p-3 bg-red-500/10 rounded-md border border-red-500/20">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <Input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Password</label>
            </div>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium">Sign up</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
