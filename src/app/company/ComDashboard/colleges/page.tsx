// app/company/CmpDashboard/colleges/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { GraduationCap, MapPin, Landmark, Building2 } from 'lucide-react'

export default function BrowseCollegesPage() {
  const [search, setSearch] = useState('')
  const [connected, setConnected] = useState<{ [id: string]: boolean }>({})
  const colleges = useQuery(api.colleges.listColleges)

  const handleConnect = (id: string) => {
    setConnected(prev => ({ ...prev, [id]: true }))
  }

  const filteredColleges = (colleges || []).filter(clg =>
    clg.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='min-h-[80vh] bg-[#f7f8fa] px-2 sm:px-6 py-8'>
      <h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#6366f1] mb-1'>
        Browse Colleges
      </h1>
      <p className='text-gray-500 text-base mb-8'>Connect with colleges to access their student pool</p>

      <Input
        placeholder='Search by college name...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='max-w-md mb-8 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'
      />

      <div className='max-w-6xl mx-auto'>
        <Card className='rounded-2xl shadow border-0'>
          <CardHeader className='flex flex-row items-center gap-2 bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
            <GraduationCap className='text-blue-500 mr-2' size={22} />
            <h2 className='text-lg font-semibold text-blue-700'>Available Colleges</h2>
          </CardHeader>
          <CardContent className='bg-white rounded-b-2xl p-8'>
            {colleges === undefined ? (
              <p className='text-gray-500'>Loading...</p>
            ) : filteredColleges.length === 0 ? (
              <p className='text-gray-500'>No colleges found.</p>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {filteredColleges.map(clg => (
                  <div key={String(clg.id)} className='border border-gray-100 p-6 rounded-xl bg-white shadow-sm flex flex-col gap-2'>
                    <div className='flex items-center gap-2 mb-1'>
                      <Building2 size={18} className='text-blue-700' />
                      <span className='font-bold text-blue-800 text-lg'>{clg.name}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
                      <MapPin size={16} />
                      <span>College ID: {clg.collegeId}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
                      <Landmark size={16} />
                      <span>Email: {clg.email}</span>
                    </div>
                    <div className='flex items-center gap-2 text-gray-600 text-sm mb-3'>
                      <span>Created: {new Date(clg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Button
                      disabled={!!connected[String(clg.id)]}
                      onClick={() => handleConnect(String(clg.id))}
                      className='bg-black text-white font-semibold rounded-md px-5 py-2 shadow hover:bg-gray-900 transition-all w-full'
                    >
                      {connected[String(clg.id)] ? 'Connected' : 'Connect'}
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
