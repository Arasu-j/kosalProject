// app/company/CmpDashboard/colleges/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

export default function BrowseCollegesPage() {
  const [search, setSearch] = useState('')
  const [invited, setInvited] = useState<{ [id: string]: boolean }>({})
  const colleges = useQuery(api.colleges.listColleges)

  const handleInvite = (id: string) => {
    setInvited(prev => ({ ...prev, [id]: true }))
  }

  const filteredColleges = (colleges || []).filter(clg =>
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
          {colleges === undefined ? (
            <p className="text-gray-500">Loading...</p>
          ) : filteredColleges.length === 0 ? (
            <p className="text-gray-500">No colleges found.</p>
          ) : (
            filteredColleges.map(clg => (
              <div key={clg.id} className="border p-4 rounded bg-white shadow-sm">
                <h2 className="text-lg font-semibold">{clg.name}</h2>
                <p><strong>College ID:</strong> {clg.collegeId}</p>
                <p><strong>Email:</strong> {clg.email}</p>
                <p><strong>Created:</strong> {new Date(clg.createdAt).toLocaleString()}</p>
                <Button
                  disabled={!!invited[clg.id]}
                  onClick={() => handleInvite(clg.id)}
                  className="mt-2"
                >
                  {invited[clg.id] ? 'Invited' : 'Invite College'}
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
