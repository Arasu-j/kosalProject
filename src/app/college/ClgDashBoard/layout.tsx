'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Users, Building2, FileText, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { name: 'Overview', path: '/college/ClgDashBoard/overview', icon: LayoutDashboard },
  { name: 'Profile Management', path: '/college/ClgDashBoard/profile', icon: User },
  { name: 'Student Management', path: '/college/ClgDashBoard/student', icon: Users },
  { name: 'Company Connect', path: '/college/ClgDashBoard/companies', icon: Building2 },
  { name: 'Job Applications', path: '/college/ClgDashBoard/applications', icon: FileText },
]

export default function CollegeDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-blue-900 text-white p-6 space-y-4 fixed inset-y-0 left-0 z-30 h-full">
        <h2 className="text-2xl font-bold mb-6">College Dashboard</h2>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 transition-colors ${pathname === item.path ? 'bg-blue-700' : ''}`}
            >
              <Icon size={20} className="text-blue-200" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-blue-900 text-white flex items-center justify-between px-4 py-3 shadow">
        <span className="text-lg font-bold">College Dashboard</span>
        <button onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          <Menu size={28} />
        </button>
      </div>
      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          {/* Drawer */}
          <aside className="relative w-64 bg-blue-900 text-white p-6 space-y-4 h-full shadow-xl animate-slide-in-left">
            <button className="absolute top-4 right-4" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <X size={28} />
            </button>
            <h2 className="text-2xl font-bold mb-6 mt-2">College Dashboard</h2>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 transition-colors ${pathname === item.path ? 'bg-blue-700' : ''}`}
                >
                  <Icon size={20} className="text-blue-200" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-[#f4f8ff] min-h-screen overflow-y-auto md:ml-64 pt-16 md:pt-8">
        {children}
      </main>
    </div>
  )
}

/* Add this to your global CSS or Tailwind config for the slide-in animation:
@keyframes slide-in-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
.animate-slide-in-left {
  animation: slide-in-left 0.2s ease-out;
}
*/
