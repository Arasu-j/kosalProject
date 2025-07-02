'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GraduationCap, Briefcase, Users } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f4f8ff] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <img src="/image/icon.ico" alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-blue-700">CCC Portal</h1>
        </div>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => router.push('/company/Login')}>Company Login</Button>
          <Button variant="outline" onClick={() => router.push('/college/Login')}>College Login</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-200 to-white text-center py-20 px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the College-Company Collaboration Portal
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
          This portal serves as a bridge between academic institutions and the corporate world. Colleges can showcase their students' skills and achievements, while companies can discover and connect with top student talent.
        </p>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12 px-4 text-center">
        <div>
          <GraduationCap className="mx-auto h-10 w-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">For Colleges</h3>
          <p className="text-sm text-gray-600">Upload student lists, manage departments, and collaborate with companies.</p>
        </div>
        <div>
          <Briefcase className="mx-auto h-10 w-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">For Companies</h3>
          <p className="text-sm text-gray-600">Assign mentors, schedule sessions, post jobs, and discover top talent.</p>
        </div>
        <div>
          <Users className="mx-auto h-10 w-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">Collaboration Hub</h3>
          <p className="text-sm text-gray-600">Enable seamless industry-academia collaboration and real-world exposure.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20  text-center text-sm text-gray-500 pb-6">
        © 2025 CCC Portal. Empowering education & industry.
      </footer>
    </div>
  )
}
