// app/college/ClgDashBoard/companies/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export default function CompanyConnectPage() {
  const [invited, setInvited] = useState<{ [id: string]: boolean }>({})
  const companies = useQuery(api.companies.listCompanies)

  const handleInvite = (id: string) => {
    setInvited(prev => ({ ...prev, [id]: true }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Company Connect</h1>
      <Card>
        <CardHeader>
          <CardTitle>Available Companies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {companies === undefined ? (
            <p className="text-gray-500">Loading...</p>
          ) : companies.length === 0 ? (
            <p className="text-gray-500">No companies found.</p>
          ) : (
            companies.filter(company => company && company._id).map(company => (
              <div key={String(company._id)} className="border p-4 rounded bg-white shadow-sm">
                <h2 className="text-lg font-semibold">{company.name}</h2>
                <p><strong>Industry:</strong> {company.industrySector}</p>
                <p><strong>Location:</strong> {company.city}, {company.state}, {company.country}</p>
                <p><strong>Email:</strong> {company.email}</p>
                <Button
                  disabled={!!invited[company._id]}
                  onClick={() => handleInvite(company._id)}
                  className="mt-2"
                >
                  {invited[company._id] ? 'Invited' : 'Invite to Connect'}
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
