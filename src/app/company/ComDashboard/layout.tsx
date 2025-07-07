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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`w-64 bg-gray-900 text-white p-6 space-y-4 fixed inset-y-0 left-0 z-30 h-full transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <h2 className="text-xl lg:text-2xl font-bold mb-6 mt-12 lg:mt-0">Company Dashboard</h2>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-colors ${pathname === item.path ? 'bg-gray-700' : ''}`}
            >
              <Icon size={20} className="text-gray-300" />
              <span className="text-sm lg:text-base">{item.name}</span>
            </Link>
          )
        })}
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 bg-[#f7f8fa] lg:ml-64 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
