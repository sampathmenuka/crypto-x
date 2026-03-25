import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Markets from './pages/Markets';
import Trade from './pages/Trade';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

function App() {
  const { initAuth, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-gray-950 text-white">Loading Crypto-X...</div>;
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/trade/:symbol" element={isAuthenticated ? <Trade /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  );
}

export default App;
