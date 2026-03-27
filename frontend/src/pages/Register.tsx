import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.register({ email, username, password });
      if (res.success) {
        setAuth(res.data.user, res.data.token);
        navigate('/dashboard');
      } else {
        setError('Registration failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
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
            <label className="text-sm font-medium text-gray-300">Username</label>
            <Input 
              type="text" 
              placeholder="trader123" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium">Log in</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
