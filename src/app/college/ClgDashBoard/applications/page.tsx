// app/college/ClgDashBoard/applications/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

interface Application {
  id: number
  studentName: string
  company: string
  position: string
  status: 'Applied' | 'Interviewing' | 'Hired' | 'Rejected'
}

export default function JobApplicationsPage() {
  const jobs = useQuery(api.companies.listJobs)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Job Applications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Available Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs === undefined ? (
            <p className="text-gray-500">Loading...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500">No jobs found.</p>
          ) : (
            jobs.map(job => (
              <div key={job._id} className="border p-4 rounded bg-white shadow-sm">
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p><strong>Company ID:</strong> {job.companyId}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
                <p className="mt-2 text-gray-600">{job.description}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
