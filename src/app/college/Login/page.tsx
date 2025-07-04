// CollegeLoginPage.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useSession } from '../../SessionProvider'
import { useState, FormEvent } from 'react'

export default function CollegeLoginPage() {
  const router = useRouter()
  const loginCollege = useMutation(api.colleges.loginCollege)
  const { setCollegeToken } = useSession()
  const [collegeId, setCollegeId] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      console.log('Attempting college login with:', { collegeId, name })
      const result = await loginCollege({ collegeId, name })
      console.log('College login result:', result)
      if (result.success && result.token) {
        setCollegeToken(result.token)
        router.push('/college/ClgDashBoard')
      } else {
        setError('Invalid credentials')
      }
    } catch (err: any) {
      console.error('College login error:', err)
      setError(err.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f8ff]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>College Login</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  type="text"
                  placeholder="ABC Engineering College"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">College code / ID</Label>
                <Input
                  id="password"
                  type="text"
                  required
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="text-center text-white bg-black"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Button
                variant="outline"
                className="text-center text-white bg-black"
                type="button"
                onClick={() => router.push('/college/NewRegClg')}
              >
                Create New
              </Button>
            </CardFooter>
          </form>
          
          {/* Error Display */}
          {error && (
            <div className="px-6 pb-4">
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
