// app/college/ClgDashBoard/profile/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfileManagementPage() {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    university: '',
    accreditation: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    email: '',
    phone: '',
    website: '',
    principal: '',
    placementOfficer: '',
    placementEmail: '',
    placementPhone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // TODO: Submit to backend
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-800">Profile Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit College Profile</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>College Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>College Code / ID</Label>
              <Input name="code" value={formData.code} onChange={handleChange} required />
            </div>
            <div>
              <Label>Type</Label>
              <Input name="type" value={formData.type} onChange={handleChange} />
            </div>
            <div>
              <Label>Affiliated University</Label>
              <Input name="university" value={formData.university} onChange={handleChange} />
            </div>
            <div>
              <Label>Accreditation</Label>
              <Input name="accreditation" value={formData.accreditation} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <Label>City</Label>
              <Input name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div>
              <Label>State</Label>
              <Input name="state" value={formData.state} onChange={handleChange} />
            </div>
            <div>
              <Label>Country</Label>
              <Input name="country" value={formData.country} onChange={handleChange} />
            </div>
            <div>
              <Label>ZIP / Pin Code</Label>
              <Input name="zip" value={formData.zip} onChange={handleChange} />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <Label>Website</Label>
              <Input name="website" value={formData.website} onChange={handleChange} />
            </div>
            <div>
              <Label>Principal Name</Label>
              <Input name="principal" value={formData.principal} onChange={handleChange} />
            </div>
            <div>
              <Label>Placement Officer</Label>
              <Input name="placementOfficer" value={formData.placementOfficer} onChange={handleChange} />
            </div>
            <div>
              <Label>Placement Email</Label>
              <Input name="placementEmail" value={formData.placementEmail} onChange={handleChange} />
            </div>
            <div>
              <Label>Placement Phone</Label>
              <Input name="placementPhone" value={formData.placementPhone} onChange={handleChange} />
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