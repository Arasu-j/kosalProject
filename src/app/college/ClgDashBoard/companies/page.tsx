// app/college/ClgDashBoard/companies/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Company {
  id: number
  name: string
  industry: string
  location: string
  email: string
  invited: boolean
}

export default function CompanyConnectPage() {
  const [companies, setCompanies] = useState<Company[]>([{
    id: 1,
    name: 'TechCorp Pvt Ltd',
    industry: 'IT Services',
    location: 'Bangalore, India',
    email: 'hr@techcorp.com',
    invited: false,
  }, {
    id: 2,
    name: 'InnovateX Solutions',
    industry: 'Product Development',
    location: 'Hyderabad, India',
    email: 'careers@innovatex.com',
    invited: false,
  }])

  const handleInvite = (id: number) => {
    setCompanies(prev => prev.map(company =>
      company.id === id ? { ...company, invited: true } : company
    ))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Company Connect</h1>
      <Card>
        <CardHeader>
          <CardTitle>Available Companies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {companies.map(company => (
            <div key={company.id} className="border p-4 rounded bg-white shadow-sm">
              <h2 className="text-lg font-semibold">{company.name}</h2>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Location:</strong> {company.location}</p>
              <p><strong>Email:</strong> {company.email}</p>
              <Button
                disabled={company.invited}
                onClick={() => handleInvite(company.id)}
                className="mt-2"
              >
                {company.invited ? 'Invited' : 'Invite to Connect'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
