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
import { Doc } from '../../../../../convex/_generated/dataModel'

export default function CompanyProfilePage() {
  const { company } = useSession() as { company: Doc<'companies'> | null }
  const updateCompanyProfile = useMutation(api.companies.updateCompanyProfile)
  const [formData, setFormData] = useState({
    name: company?.name || undefined,
    companyType: (company?.companyType as 'Product' | 'Service' | 'Consultancy' | 'Startup') || undefined,
    industrySector: (company?.industrySector as 'IT' | 'Finance' | 'Healthcare' | 'EdTech') || undefined,
    companySize: (company?.companySize as '1-10' | '11-50' | '51-200' | '201-500' | '500+') || undefined,
    description: company?.description || undefined,
    address: company?.address || undefined,
    city: company?.city || undefined,
    state: (company?.state as 'Tamil Nadu' | 'Karnataka') || undefined,
    country: (company?.country as 'India' | 'USA') || undefined,
    zipCode: company?.zipCode || undefined,
    email: company?.email || undefined,
    phone: company?.phone || undefined,
    website: company?.website || undefined,
    socialMedia: company?.socialMedia || undefined,
    hrName: company?.hrName || undefined,
    hrEmail: company?.hrEmail || undefined,
    hrPhone: company?.hrPhone || undefined,
    registrationNumber: company?.registrationNumber || undefined,
    logoUrl: company?.logoUrl || undefined,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Update form when company changes
  useEffect(() => {
    setFormData({
      name: company?.name || undefined,
      companyType: (company?.companyType as 'Product' | 'Service' | 'Consultancy' | 'Startup') || undefined,
      industrySector: (company?.industrySector as 'IT' | 'Finance' | 'Healthcare' | 'EdTech') || undefined,
      companySize: (company?.companySize as '1-10' | '11-50' | '51-200' | '201-500' | '500+') || undefined,
      description: company?.description || undefined,
      address: company?.address || undefined,
      city: company?.city || undefined,
      state: (company?.state as 'Tamil Nadu' | 'Karnataka') || undefined,
      country: (company?.country as 'India' | 'USA') || undefined,
      zipCode: company?.zipCode || undefined,
      email: company?.email || undefined,
      phone: company?.phone || undefined,
      website: company?.website || undefined,
      socialMedia: company?.socialMedia || undefined,
      hrName: company?.hrName || undefined,
      hrEmail: company?.hrEmail || undefined,
      hrPhone: company?.hrPhone || undefined,
      registrationNumber: company?.registrationNumber || undefined,
      logoUrl: company?.logoUrl || undefined,
    })
  }, [company])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!company?._id) {
      setError('Company not found in session.')
      return
    }
    setLoading(true)
    try {
      await updateCompanyProfile({ companyId: company._id, data: formData })
      setSuccess('Profile updated successfully!')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Profile Management</h1>
      {error && <div className="text-red-500 bg-red-50 p-3 rounded">{error}</div>}
      {success && <div className="text-green-500 bg-green-50 p-3 rounded">{success}</div>}
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
