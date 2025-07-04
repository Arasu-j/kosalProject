// app/college/ClgDashBoard/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useSession } from '../../../SessionProvider'

export default function ProfileManagementPage() {
  const { college } = useSession()
  const updateCollegeProfile = useMutation(api.colleges.updateCollegeProfile)
  const [formData, setFormData] = useState({
    name: college?.name || '',
    collegeId: college?.collegeId || '',
    collegeType: college?.collegeType || '',
    affiliatedUniversity: college?.affiliatedUniversity || '',
    accreditation: college?.accreditation || '',
    description: college?.description || '',
    address: college?.address || '',
    city: college?.city || '',
    state: college?.state || '',
    country: college?.country || '',
    zipCode: college?.zipCode || '',
    email: college?.email || '',
    phone: college?.phone || '',
    website: college?.website || '',
    principalName: college?.principalName || '',
    placementOfficerName: college?.placementOfficerName || '',
    placementEmail: college?.placementEmail || '',
    placementPhone: college?.placementPhone || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Update form when college changes
  useEffect(() => {
    setFormData({
      name: college?.name || '',
      collegeId: college?.collegeId || '',
      collegeType: college?.collegeType || '',
      affiliatedUniversity: college?.affiliatedUniversity || '',
      accreditation: college?.accreditation || '',
      description: college?.description || '',
      address: college?.address || '',
      city: college?.city || '',
      state: college?.state || '',
      country: college?.country || '',
      zipCode: college?.zipCode || '',
      email: college?.email || '',
      phone: college?.phone || '',
      website: college?.website || '',
      principalName: college?.principalName || '',
      placementOfficerName: college?.placementOfficerName || '',
      placementEmail: college?.placementEmail || '',
      placementPhone: college?.placementPhone || '',
    })
  }, [college])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!college?.id) {
      setError('College not found in session.')
      return
    }
    setLoading(true)
    try {
      await updateCollegeProfile({ collegeId: college.id, data: formData })
      setSuccess('Profile updated successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    }
    setLoading(false)
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
              <Input name="collegeId" value={formData.collegeId} onChange={handleChange} required />
            </div>
            <div>
              <Label>Type</Label>
              <Input name="collegeType" value={formData.collegeType} onChange={handleChange} />
            </div>
            <div>
              <Label>Affiliated University</Label>
              <Input name="affiliatedUniversity" value={formData.affiliatedUniversity} onChange={handleChange} />
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
              <Input name="zipCode" value={formData.zipCode} onChange={handleChange} />
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
              <Input name="principalName" value={formData.principalName} onChange={handleChange} />
            </div>
            <div>
              <Label>Placement Officer</Label>
              <Input name="placementOfficerName" value={formData.placementOfficerName} onChange={handleChange} />
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