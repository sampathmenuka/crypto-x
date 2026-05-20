import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart2,
  Wallet,
  ClipboardList,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLocalStorage } from '../../hooks';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/markets',   icon: TrendingUp,      label: 'Markets'   },
  { path: '/trading',   icon: BarChart2,        label: 'Trading'   },
  { path: '/wallet',    icon: Wallet,           label: 'Wallet'    },
  { path: '/orders',    icon: ClipboardList,    label: 'Orders'    },
];

const Sidebar: React.FC = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { logout, user, isAuthenticated } = useAuthStore();
  const [collapsed, setCollapsed] = useLocalStorage('sidebar-collapsed', false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuth = isAuthenticated();

  return (
    <aside 
      style={{ width: collapsed ? 80 : 260 }}
      className="h-screen bg-card border-r border-white/5 flex flex-col relative z-20 transition-all duration-300"
    >
      {/* Logo */}
      <div className="p-6 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-background shadow-glow-primary/20 shrink-0">
          <Zap size={20} />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-xl tracking-tighter animate-in fade-in duration-500">
            CRYPTO<span className="text-primary">X</span>
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path || (path === '/dashboard' && location.pathname === '/');
          return (
            <button
              key={path}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-white/5 hover:text-white'
              }`}
              onClick={() => navigate(path)}
            >
              <Icon size={20} className={active ? 'text-primary' : 'text-text-secondary group-hover:text-white'} />
              {!collapsed && <span className="font-medium">{label}</span>}
              {active && !collapsed && (
                <div 
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-glow-primary" 
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 relative">
        {isAuth ? (
          <>
            {!collapsed && (
              <div className="flex items-center gap-3 p-3 mb-4 bg-white/5 rounded-xl animate-in fade-in duration-500">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-sm">
                  {user?.username?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate">{user?.username ?? 'Trader'}</p>
                  <p className="text-[10px] text-text-secondary truncate">{user?.email ?? 'trader@crypto-x.com'}</p>
                </div>
              </div>
            )}

            <button
              className="w-full flex items-center gap-4 px-4 py-3 text-text-secondary hover:text-down hover:bg-down/5 rounded-xl transition-all"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              {!collapsed && <span className="font-medium">Logout</span>}
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            {!collapsed && (
              <p className="text-xs text-text-secondary text-center mb-2">Create an account to trade</p>
            )}
            <button
              className="w-full flex items-center justify-center gap-4 px-4 py-3 bg-primary text-black hover:bg-primary/90 rounded-xl transition-all font-bold text-sm"
              onClick={() => navigate('/login')}
            >
              {!collapsed ? 'Log In' : 'In'}
            </button>
            <button
              className="w-full flex items-center justify-center gap-4 px-4 py-3 bg-white/5 text-white hover:bg-white/10 rounded-xl transition-all font-bold text-sm"
              onClick={() => navigate('/register')}
            >
              {!collapsed ? 'Sign Up' : 'Up'}
            </button>
          </div>
        )}

        <button
          className="absolute -right-3 top-[-12px] w-6 h-6 bg-card border border-white/10 rounded-full flex items-center justify-center text-text-secondary hover:text-white shadow-xl"
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
