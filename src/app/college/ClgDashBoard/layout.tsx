'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Overview', path: '/college/ClgDashBoard/overview' },
  { name: 'Profile Management', path: '/college/ClgDashBoard/profile' },
  { name: 'Student Management', path: '/college/ClgDashBoard/student' },
  { name: 'Company Connect', path: '/college/ClgDashBoard/companies' },
  { name: 'Job Applications', path: '/college/ClgDashBoard/applications' },
]

export default function CollegeDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">College Dashboard</h2>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`block px-4 py-2 rounded hover:bg-blue-700 ${pathname === item.path ? 'bg-blue-700' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#f4f8ff]">
        {children}
      </main>
    </div>
  )
}
