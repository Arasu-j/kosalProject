// app/company/CmpDashboard/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, Briefcase, GraduationCap, FileText, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { name: 'Overview', path: '/company/ComDashboard/overview', icon: LayoutDashboard },
  { name: 'Profile Management', path: '/company/ComDashboard/profile', icon: User },
  { name: 'Post Jobs', path: '/company/ComDashboard/jobs', icon: Briefcase },
  { name: 'Browse Colleges', path: '/company/ComDashboard/colleges', icon: GraduationCap },
  { name: 'Student Applications', path: '/company/ComDashboard/applications', icon: FileText },
]

export default function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-gray-900 text-white p-6 space-y-4 fixed inset-y-0 left-0 z-30 h-full">
        <h2 className="text-2xl font-bold mb-6">Company Dashboard</h2>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${pathname === item.path ? 'bg-gray-700' : ''}`}
            >
              <Icon size={20} className="text-gray-300" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 py-3 shadow">
        <span className="text-lg font-bold">Company Dashboard</span>
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
          <aside className="relative w-64 bg-gray-900 text-white p-6 space-y-4 h-full shadow-xl animate-slide-in-left">
            <button className="absolute top-4 right-4" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <X size={28} />
            </button>
            <h2 className="text-2xl font-bold mb-6 mt-2">Company Dashboard</h2>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${pathname === item.path ? 'bg-gray-700' : ''}`}
                >
                  <Icon size={20} className="text-gray-300" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-[#f7f8fa] min-h-screen overflow-y-auto md:ml-64 pt-16 md:pt-8">
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
