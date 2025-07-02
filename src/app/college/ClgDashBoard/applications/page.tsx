// app/college/ClgDashBoard/applications/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Application {
  id: number
  studentName: string
  company: string
  position: string
  status: 'Applied' | 'Interviewing' | 'Hired' | 'Rejected'
}

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([{
    id: 1,
    studentName: 'Arun Kumar',
    company: 'TechCorp Pvt Ltd',
    position: 'Frontend Developer',
    status: 'Applied',
  }, {
    id: 2,
    studentName: 'Meena Reddy',
    company: 'InnovateX Solutions',
    position: 'Data Analyst Intern',
    status: 'Interviewing',
  }])

  const updateStatus = (id: number, status: Application['status']) => {
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status } : app
    ))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Job Applications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Applications Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {applications.length === 0 ? (
            <p className="text-gray-500">No applications found.</p>
          ) : (
            applications.map(app => (
              <div key={app.id} className="border p-4 rounded bg-white shadow-sm">
                <p><strong>Student:</strong> {app.studentName}</p>
                <p><strong>Company:</strong> {app.company}</p>
                <p><strong>Position:</strong> {app.position}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Badge variant="outline" className="capitalize">
                    {app.status}
                  </Badge>
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(app.id, 'Interviewing')}
                  >
                    Set Interviewing
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(app.id, 'Hired')}
                  >
                    Set Hired
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateStatus(app.id, 'Rejected')}
                  >
                    Set Rejected
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
