// app/company/CmpDashboard/jobs/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'

interface Job {
  id: number
  title: string
  description: string
  location: string
  salary: string
  skillsRequired: string
}

export default function PostJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    skillsRequired: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newJob: Job = { id: Date.now(), ...formData }
    setJobs([...jobs, newJob])
    setFormData({ title: '', description: '', location: '', salary: '', skillsRequired: '' })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Post New Job</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create a Job Posting</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Job Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div>
              <Label>Salary</Label>
              <Input name="salary" value={formData.salary} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>Skills Required</Label>
              <Input name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>Job Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Post Job</Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posted Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="border p-4 rounded bg-white shadow-sm"
              >
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Skills:</strong> {job.skillsRequired}</p>
                <p className="mt-2 text-gray-600">{job.description}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
