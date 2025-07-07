// app/college/ClgDashBoard/companies/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { GraduationCap, MapPin, Landmark, Building2 } from 'lucide-react'

export default function CompanyConnectPage() {
  const [invited, setInvited] = useState<{ [id: string]: boolean }>({})
  const companies = useQuery(api.companies.listCompanies)

  const handleInvite = (id: string) => {
    setInvited(prev => ({ ...prev, [id]: true }))
  }

  return (
    <div className='min-h-[80vh] bg-[#f7f8fa] px-2 sm:px-6 py-8'>
      <h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7] mb-1'>
        Company Connect
      </h1>
      <p className='text-gray-500 text-base mb-8'>Invite companies to collaborate with your campus</p>

      <div className='max-w-6xl mx-auto'>
        <Card className='rounded-2xl shadow border-0'>
          <CardHeader className='flex flex-row items-center gap-2 bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
            <GraduationCap className='text-blue-500 mr-2' size={22} />
            <h2 className='text-lg font-semibold text-blue-700'>Available Companies</h2>
          </CardHeader>
          <CardContent className='bg-white rounded-b-2xl p-8'>
            {companies === undefined ? (
              <p className='text-gray-500'>Loading...</p>
            ) : companies.length === 0 ? (
              <p className='text-gray-500'>No companies found.</p>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {companies.filter(company => company && company._id).map(company => (
                  <div key={String(company._id)} className='border border-gray-100 p-6 rounded-xl bg-white shadow-sm flex flex-col gap-2'>
                    <div className='flex items-center gap-2 mb-1'>
                      <Building2 size={18} className='text-blue-700' />
                      <span className='font-bold text-blue-800 text-lg'>{company.name}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
                      <MapPin size={16} />
                      <span>{company.city}, {company.state}, {company.country}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
                      <Landmark size={16} />
                      <span>{company.industrySector}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-600 text-sm mb-3'>
                      <span>{company.email}</span>
                    </div>
                    <Button
                      disabled={!!invited[company._id]}
                      onClick={() => handleInvite(company._id)}
                      className='bg-black text-white font-semibold rounded-md px-5 py-2 shadow hover:bg-gray-900 transition-all w-full'
                    >
                      {invited[company._id] ? 'Invited' : 'Invite to Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
