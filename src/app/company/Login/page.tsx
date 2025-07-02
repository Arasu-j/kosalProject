// CompanyLoginPage.tsx
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

export default function CompanyLoginPage() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f4f8ff]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Company Login</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="ABC Technologies"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Company code / ID</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="text-center text-white bg-black"
            onClick={() => router.push('/company/ComDashboard')}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="text-center text-white bg-black"
            onClick={() => router.push('/company/NewRegCom')}
          >
            Create New
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
