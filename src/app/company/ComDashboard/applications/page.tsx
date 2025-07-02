// app/company/CmpDashboard/applications/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Application {
  id: number
  studentName: string
  college: string
  jobTitle: string
  resumeLink: string
  status: 'Applied' | 'Shortlisted' | 'Rejected'
}

export default function StudentApplicationsPage() {
  const [applications] = useState<Application[]>([{
    id: 1,
    studentName: 'Kavya Ramesh',
    college: 'Sunrise Institute of Technology',
    jobTitle: 'Frontend Developer Intern',
    resumeLink: 'https://example.com/resume/kavya.pdf',
    status: 'Applied',
  }, {
    id: 2,
    studentName: 'Rahul Dev',
    college: 'Green Valley Engineering College',
    jobTitle: 'Data Analyst',
    resumeLink: 'https://example.com/resume/rahul.pdf',
    status: 'Shortlisted',
  }])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Student Applications</h1>

      <Card>
        <CardHeader>
          <CardTitle>Received Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {applications.length === 0 ? (
            <p className="text-gray-500">No applications found.</p>
          ) : (
            applications.map(app => (
              <div key={app.id} className="border p-4 rounded bg-white shadow-sm">
                <p><strong>Student:</strong> {app.studentName}</p>
                <p><strong>College:</strong> {app.college}</p>
                <p><strong>Job Title:</strong> {app.jobTitle}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Badge className="capitalize" variant="outline">{app.status}</Badge>
                </p>
                <a
                  href={app.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  View Resume
                </a>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
