// app/college-dashboard/overview/page.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useSession } from '../../../SessionProvider'

export default function CollegeDashboardOverviewPage() {
  const { college } = useSession()
  const companies = useQuery(api.companies.listCompanies)
  const students = useQuery(api.students.getStudentsByCollege, college?.id ? { collegeId: college.id } : 'skip')
  const departments = college?.totalDepartments ? Number(college.totalDepartments) : 0
  const activeCompanies = companies ? companies.filter(c => c.isActive).length : 0
  const studentsRegistered = students ? students.length : 0

  const stats = [
    { title: 'Departments Registered', value: departments },
    { title: 'Active Companies', value: activeCompanies },
    { title: 'Students Registered', value: studentsRegistered },
    { title: 'Job Applications Submitted', value: 0 },
    { title: 'Ongoing Interviews', value: 0 },
    { title: 'Successful Placements', value: 0 },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Overview</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white shadow hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-blue-700">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
