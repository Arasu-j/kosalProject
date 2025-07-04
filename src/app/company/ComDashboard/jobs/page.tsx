// app/company/CmpDashboard/jobs/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useSession } from '../../../SessionProvider'

export default function PostJobsPage() {
  const { company } = useSession()
  const postJob = useMutation(api.companies.postJob)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    skillsRequired: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!company?.id) {
      setError('Company not found in session.')
      return
    }
    setLoading(true)
    try {
      await postJob({ ...formData, companyId: company.id })
      setFormData({ title: '', description: '', location: '', salary: '', skillsRequired: '' })
      setSuccess('Job posted successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to post job')
    }
    setLoading(false)
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
          {success && (
            <p className="text-green-500">{success}</p>
          )}
          {error && (
            <p className="text-red-500">{error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
