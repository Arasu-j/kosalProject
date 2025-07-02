// app/company/CmpDashboard/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Overview', path: '/company/ComDashboard/overview' },
  { name: 'Profile Management', path: '/company/ComDashboard/profile' },
  { name: 'Post Jobs', path: '/company/ComDashboard/jobs' },
  { name: 'Browse Colleges', path: '/company/ComDashboard/colleges' },
  { name: 'Student Applications', path: '/company/ComDashboard/applications' },
]

export default function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Company Dashboard</h2>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === item.path ? 'bg-gray-700' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#f7f8fa]">
        {children}
      </main>
    </div>
  )
}
