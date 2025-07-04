// app/company/CmpDashboard/applications/page.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export default function StudentApplicationsPage() {
  // Fetch all students from Convex
  const students = useQuery(api.students.listAllStudents) // Fetch all students

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Student Applications</h1>

      <Card>
        <CardHeader>
          <CardTitle>Received Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {students === undefined ? (
            <p className="text-gray-500">Loading...</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500">No applications found.</p>
          ) : (
            students.map(student => (
              <div key={student._id} className="border p-4 rounded bg-white shadow-sm">
                <p><strong>Student:</strong> {student.name}</p>
                <p><strong>College ID:</strong> {student.collegeId}</p>
                <p><strong>Job Title:</strong> N/A</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Badge className="capitalize" variant="outline">N/A</Badge>
                </p>
                {student.resume && (
                  <a
                    href={student.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View Resume
                  </a>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
