// app/company/CmpDashboard/colleges/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface College {
  id: number
  name: string
  location: string
  type: string
  university: string
  invited: boolean
}

export default function BrowseCollegesPage() {
  const [search, setSearch] = useState('')
  const [colleges, setColleges] = useState<College[]>([{
    id: 1,
    name: 'Green Valley Engineering College',
    location: 'Chennai, TN',
    type: 'Private',
    university: 'Anna University',
    invited: false,
  }, {
    id: 2,
    name: 'Sunrise Institute of Technology',
    location: 'Hyderabad, TS',
    type: 'Autonomous',
    university: 'JNTU Hyderabad',
    invited: false,
  }])

  const handleInvite = (id: number) => {
    setColleges(prev => prev.map(clg =>
      clg.id === id ? { ...clg, invited: true } : clg
    ))
  }

  const filteredColleges = colleges.filter(clg =>
    clg.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Browse Colleges</h1>

      <Input
        placeholder="Search by college name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Card>
        <CardHeader>
          <CardTitle>Colleges List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredColleges.length === 0 ? (
            <p className="text-gray-500">No colleges found.</p>
          ) : (
            filteredColleges.map(clg => (
              <div key={clg.id} className="border p-4 rounded bg-white shadow-sm">
                <h2 className="text-lg font-semibold">{clg.name}</h2>
                <p><strong>Location:</strong> {clg.location}</p>
                <p><strong>Type:</strong> {clg.type}</p>
                <p><strong>University:</strong> {clg.university}</p>
                <Button
                  disabled={clg.invited}
                  onClick={() => handleInvite(clg.id)}
                  className="mt-2"
                >
                  {clg.invited ? 'Invited' : 'Invite College'}
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
