// app/company/CmpDashboard/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useSession } from '../../../SessionProvider'

export default function CompanyProfilePage() {
  const { company } = useSession()
  const updateCompanyProfile = useMutation(api.companies.updateCompanyProfile)
  const [formData, setFormData] = useState({
    name: company?.name || '',
    industrySector: company?.industrySector || '',
    description: company?.description || '',
    address: company?.address || '',
    website: company?.website || '',
    email: company?.email || '',
    phone: company?.phone || '',
    logoUrl: company?.logoUrl || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Update form when company changes
  useEffect(() => {
    setFormData({
      name: company?.name || '',
      industrySector: company?.industrySector || '',
      description: company?.description || '',
      address: company?.address || '',
      website: company?.website || '',
      email: company?.email || '',
      phone: company?.phone || '',
      logoUrl: company?.logoUrl || '',
    })
  }, [company])

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
      await updateCompanyProfile({ companyId: company.id, data: formData })
      setSuccess('Profile updated successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    }
    setLoading(false)
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
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Industry</Label>
              <Input name="industrySector" value={formData.industrySector} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="address" value={formData.address} onChange={handleChange} />
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
