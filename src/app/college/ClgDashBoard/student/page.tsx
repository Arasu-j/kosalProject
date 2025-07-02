// app/college/ClgDashBoard/students/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface Student {
  id: number
  name: string
  course: string
  skills: string
  resume: string
}

export default function StudentManagementPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    skills: '',
    resume: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    const newStudent: Student = {
      id: Date.now(),
      ...formData,
    }
    setStudents([...students, newStudent])
    setFormData({ name: '', course: '', skills: '', resume: '' })
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
              <Label>Course</Label>
              <Input name="course" value={formData.course} onChange={handleChange} required />
            </div>
            <div>
              <Label>Skills</Label>
              <Input name="skills" value={formData.skills} onChange={handleChange} required />
            </div>
            <div>
              <Label>Resume Link</Label>
              <Input name="resume" value={formData.resume} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2 text-right">
              <Button type="submit">Add Student</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {students.length === 0 ? (
            <p className="text-gray-500">No students added yet.</p>
          ) : (
            students.map((student) => (
              <div
                key={student.id}
                className="border p-4 rounded bg-white shadow-sm"
              >
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Skills:</strong> {student.skills}</p>
                <a
                  href={student.resume}
                  target="_blank"
                  className="text-blue-600 underline"
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
