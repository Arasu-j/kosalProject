// app/college/ClgDashBoard/students/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useSession } from '../../../SessionProvider'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export default function StudentManagementPage() {
  const { college } = useSession()
  const collegeId = college?.id
  const students = useQuery(
    api.students.getStudentsByCollege,
    collegeId ? { collegeId } : 'skip'
  )
  const addStudent = useMutation(api.students.addStudent)
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    skills: '',
    resume: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!collegeId) {
      setError('College not found in session.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await addStudent({
      ...formData,
        collegeId,
      })
      setFormData({
        name: '',
        rollNumber: '',
        email: '',
        phone: '',
        department: '',
        year: '',
        skills: '',
        resume: '',
      })
    } catch (err: any) {
      setError(err.message || 'Failed to add student')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Student Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddStudent} className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Roll Number</Label>
              <Input name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label>Phone</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <Label>Department</Label>
              <Input name="department" value={formData.department} onChange={handleChange} required />
            </div>
            <div>
              <Label>Year</Label>
              <Input name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div>
              <Label>Skills</Label>
              <Input name="skills" value={formData.skills} onChange={handleChange} />
            </div>
            <div>
              <Label>Resume Link</Label>
              <Input name="resume" value={formData.resume} onChange={handleChange} />
            </div>
            <div className="md:col-span-2 text-right">
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Student'}
              </Button>
            </div>
          </form>
          {error && <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {students === undefined ? (
            <p className="text-gray-500">Loading...</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500">No students added yet.</p>
          ) : (
            students.map((student) => (
              <div
                key={student._id}
                className="border p-4 rounded bg-white shadow-sm"
              >
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <p><strong>Department:</strong> {student.department}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <p><strong>Skills:</strong> {student.skills}</p>
                {student.resume && (
                <a
                  href={student.resume}
                  target="_blank"
                  className="text-blue-600 underline"
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
