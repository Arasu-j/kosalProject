// app/company/CmpDashboard/profile/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'

export default function CompanyProfilePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    description: '',
    location: '',
    website: '',
    email: '',
    phone: '',
    logoUrl: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // TODO: Connect to backend
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Profile Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Company Profile</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Company Name</Label>
              <Input name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>
            <div>
              <Label>Industry</Label>
              <Input name="industry" value={formData.industry} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div>
              <Label>Website</Label>
              <Input name="website" value={formData.website} onChange={handleChange} />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label>Company Logo URL</Label>
              <Input name="logoUrl" value={formData.logoUrl} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
