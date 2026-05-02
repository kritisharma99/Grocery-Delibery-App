import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Home, Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react'
import { useAuthStore } from '../../stores/authStores'

const navItems = [
  { to: '/home',      icon: Home,         label: 'Shop'      },
  { to: '/explore',   icon: Search,        label: 'Explore'   },
  { to: '/cart',      icon: ShoppingCart,  label: 'Cart'      },
  { to: '/favourite', icon: Heart,         label: 'Favourite' },
  { to: '/account',   icon: User,          label: 'Account'   },
]

export function AppLayout() {
  const user = useAuthStore((s) => s.user)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    // ✅ h-screen overflow-hidden on root — nothing escapes viewport
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5]">

      {/* ── Desktop Sidebar ── */}
      <aside
        className={`
          hidden md:flex flex-col shrink-0
          transition-all duration-300
          ${sidebarOpen ? 'w-56' : 'w-16'}
          h-screen bg-white border-r border-gray-100 py-6 px-3
        `}
      >
        {/* Logo + toggle */}
        <div className="mb-10 flex items-center justify-between px-2">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <img src="/assets/carrot.png" alt="logo" className="h-7 w-auto" />
              <span className="text-base font-semibold text-gray-800">Nectar</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition
                ${isActive
                  ? 'bg-[#53b175]/10 text-[#53b175]'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}
              `}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* ✅ User at bottom — mt-auto pushes it down, no fixed needed */}
        {sidebarOpen && user && (
          <div className="mt-auto flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#53b175] text-xs font-semibold text-white">
              {user.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-800">{user.name}</p>
              <p className="truncate text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
        )}
      </aside>

      {/* ── Main content ── */}
      {/* ✅ flex-1 + overflow-y-auto — only this column scrolls */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 pb-24 md:pb-0">
          <Outlet />
        </main>

        {/* ── Mobile Bottom Nav ── */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-100 bg-white px-2 py-3 md:hidden">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                flex flex-col items-center gap-0.5
                ${isActive ? 'text-[#53b175]' : 'text-gray-400'}
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}