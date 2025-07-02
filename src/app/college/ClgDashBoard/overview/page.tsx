// app/college-dashboard/overview/page.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  { title: 'Departments Registered', value: 5 },
  { title: 'Active Companies', value: 12 },
  { title: 'Students Registered', value: 320 },
  { title: 'Job Applications Submitted', value: 85 },
  { title: 'Ongoing Interviews', value: 9 },
  { title: 'Successful Placements', value: 42 },
]

export default function CollegeDashboardOverviewPage() {
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
