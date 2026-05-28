import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, TrendingUp, TrendingDown, Menu, User, LogIn, UserPlus } from 'lucide-react';
import { useMarketStore } from '../../store/useMarketStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useDebounce } from '../../hooks';
import { formatPrice, formatPercent } from '../../utils';

const Navbar: React.FC = () => {
  const { markets, searchMarkets } = useMarketStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const debouncedQuery = useDebounce(query, 350);
  const isAuth = isAuthenticated();

  const notifications = [
    { id: 1, title: 'Order Completed', message: 'Your market buy order for 1.5 BTC has been completed.', time: '2 mins ago', type: 'current' },
    { id: 2, title: 'Price Alert', message: 'ETH has surpassed $4,000.', time: '1 hour ago', type: 'current' },
    { id: 3, title: 'Deposit Successful', message: 'You have successfully deposited $10,000.', time: '2 days ago', type: 'past' },
    { id: 4, title: 'System Maintenance', message: 'Scheduled maintenance will occur on May 28th.', time: '1 week ago', type: 'past' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      searchMarkets(debouncedQuery.trim());
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [debouncedQuery, searchMarkets]);

  const topMarkets = markets.slice(0, 3);

  return (
    <nav className={`absolute top-0 left-0 right-0 z-40 transition-all duration-300 bg-card border-b border-white/5 ${
      isScrolled ? 'py-3' : 'py-4'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 lg:hidden">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-background shadow-glow-primary/20">X</div>
          <span className="font-display font-bold text-2xl tracking-tighter hidden md:block">CRYPTO-X</span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md hidden lg:block">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          {isSearchOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-2 p-2 glass-card border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            >
              {markets.slice(0, 5).map((m) => (
                <div key={m.symbol} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">{m.symbol}</span>
                    <span className="small-text">{m.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono">{formatPrice(m.price)}</div>
                    <div className={`text-xs ${m.change24h >= 0 ? 'text-up' : 'text-down'}`}>
                      {formatPercent(m.change24h)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tickers - Desktop only */}
        <div className="hidden xl:flex items-center gap-6 overflow-hidden">
          {topMarkets.map((m) => (
            <div key={m.symbol} className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
              <span className="text-xs font-bold text-text-secondary">{m.symbol}</span>
              <span className="text-xs font-mono">{formatPrice(m.price)}</span>
              <span className={`flex items-center gap-1 text-xs ${m.change24h >= 0 ? 'text-up' : 'text-down'}`}>
                {m.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {formatPercent(m.change24h)}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 relative">
          {isAuthenticated() && (
            <div className="relative">
              <button 
                className={`p-2.5 rounded-xl transition-all ${isNotificationsOpen ? 'text-white bg-white/10' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={20} />
                {/* Notification badge */}
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              </button>
              
              {/* Notification Panel */}
              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 glass-card border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 z-50 rounded-xl overflow-hidden flex flex-col max-h-[400px]">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <button className="text-[10px] text-primary hover:text-primary/80 transition-colors uppercase tracking-wider font-bold">Mark all read</button>
                  </div>
                  
                  <div className="overflow-y-auto flex-1 p-2">
                    <div className="px-2 py-1">
                      <h4 className="text-[10px] text-text-secondary uppercase tracking-wider font-bold mb-2">Current</h4>
                      {notifications.filter(n => n.type === 'current').map(n => (
                        <div key={n.id} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors mb-2 border border-white/5">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-xs text-white group-hover:text-primary transition-colors">{n.title}</span>
                            <span className="text-[10px] text-primary">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-text-secondary leading-relaxed">{n.message}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="px-2 py-1 mt-2">
                      <h4 className="text-[10px] text-text-secondary uppercase tracking-wider font-bold mb-2">Past</h4>
                      {notifications.filter(n => n.type === 'past').map(n => (
                        <div key={n.id} className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors mb-2 border border-transparent">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-xs text-white/70">{n.title}</span>
                            <span className="text-[10px] text-text-secondary/50">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-text-secondary/70 leading-relaxed">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <button className="p-2.5 text-text-secondary hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Settings size={20} />
          </button>
          <div className="h-8 w-[1px] bg-white/10 mx-2 hidden sm:block" />
          {isAuth ? (
            <button
              className="btn-primary !py-2 !px-4 flex items-center gap-2"
              onClick={() => navigate('/dashboard')}
            >
              <User size={18} />
              <span className="hidden sm:inline">{user?.username ?? 'Account'}</span>
            </button>
          ) : (
            <>
              <button
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-white hover:bg-white/5 rounded-xl transition-all"
                onClick={() => navigate('/login')}
              >
                <LogIn size={18} />
                <span>Log In</span>
              </button>
              <button
                className="btn-primary !py-2 !px-4 flex items-center gap-2"
                onClick={() => navigate('/register')}
                aria-label="Sign up"
              >
                <UserPlus size={18} />
                <span className="hidden sm:inline">Sign Up</span>
              </button>
            </>
          )}
          <button className="sm:hidden p-2.5 text-white bg-white/5 rounded-xl">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
