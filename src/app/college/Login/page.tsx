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

export default function CollegeLoginPage() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f8ff]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>College Login</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  type="text"
                  placeholder="ABC Engineering College"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">College code / ID</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
        <Button
            variant="outline"
            className="text-center text-white bg-black"
            onClick={() => router.push('/college/ClgDashBoard')}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="text-center text-white bg-black"
            onClick={() => router.push('/college/NewRegClg')}
          >
            Create New
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
