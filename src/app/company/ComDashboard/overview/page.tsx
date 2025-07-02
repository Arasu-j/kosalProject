// app/company/CmpDashboard/overview/page.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  { title: 'Jobs Posted', value: 8 },
  { title: 'Applications Received', value: 120 },
  { title: 'Colleges Connected', value: 15 },
  { title: 'Interviews Scheduled', value: 22 },
  { title: 'Offers Made', value: 10 },
]

export default function CompanyDashboardOverviewPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Overview</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white shadow hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-blue-700">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
