import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { useLocalStorage } from '../../hooks'
import './Sidebar.css'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/markets',   icon: TrendingUp,      label: 'Markets'   },
  { path: '/trading',   icon: BarChart2,        label: 'Trading'   },
  { path: '/wallet',    icon: Wallet,           label: 'Wallet'    },
  { path: '/orders',    icon: ClipboardList,    label: 'Orders'    },
]

const Sidebar: React.FC = () => {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { logout, user } = useAuthStore()
  const [collapsed, setCollapsed] = useLocalStorage('sidebar-collapsed', false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <Zap size={18} />
        </div>
        {!collapsed && <span className="sidebar__logo-text">Crypto<span>X</span></span>}
      </div>

      {/* Nav links */}
      <nav className="sidebar__nav">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path || (path === '/dashboard' && location.pathname === '/')
          return (
            <button
              key={path}
              id={`nav-${label.toLowerCase()}`}
              className={`sidebar__item ${active ? 'sidebar__item--active' : ''}`}
              onClick={() => navigate(path)}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
              {active && <span className="sidebar__active-dot" />}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        {!collapsed && (
          <div className="sidebar__user">
            <div className="sidebar__avatar">{user?.username?.[0]?.toUpperCase() ?? 'U'}</div>
            <div className="sidebar__user-info">
              <p className="sidebar__username">{user?.username ?? 'Trader'}</p>
              <p className="sidebar__email">{user?.email ?? ''}</p>
            </div>
          </div>
        )}

        <button
          id="btn-logout"
          className="sidebar__item sidebar__item--logout"
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          id="btn-sidebar-toggle"
          className="sidebar__toggle"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
