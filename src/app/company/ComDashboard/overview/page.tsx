// app/company/CmpDashboard/overview/page.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useSession } from '../../../SessionProvider'

export default function CompanyDashboardOverviewPage() {
  const { company } = useSession()
  const jobs = useQuery(api.companies.listJobsByCompany, company?.id ? { companyId: company.id } : 'skip')
  const jobsPosted = jobs ? jobs.length : 0

  const stats = [
    { title: 'Jobs Posted', value: jobsPosted },
    { title: 'Applications Received', value: 0 },
    { title: 'Colleges Connected', value: 0 },
    { title: 'Interviews Scheduled', value: 0 },
    { title: 'Offers Made', value: 0 },
  ]

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
