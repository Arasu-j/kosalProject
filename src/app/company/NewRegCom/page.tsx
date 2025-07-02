'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'

const steps = [
  'Basic Information',
  'Location Details',
  'Contact Details',
  'HR / Recruiter Info',
  'Verification & Media'
]

export default function CompanyRegistrationForm() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const handleNext = () => {
    if (step === steps.length - 1) {
      router.push('/company/ComDashboard')
    } else {
      nextStep()
    }
  }

  return (
    <div className="p-6 bg-[#f4f8ff] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-2">Company Registration Portal</h1>
      <p className="text-center mb-8">Register your company to collaborate with colleges</p>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium">Registration Progress</p>
          <p>{step + 1} of {steps.length}</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          {steps.map((label, index) => (
            <div key={label} className="flex-1 text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${index === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{index + 1}</div>
              <p className={`text-xs mt-1 ${index === step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{label}</p>
            </div>
          ))}
        </div>
        <Progress value={(step + 1) * (100 / steps.length)} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {/* Step 0: Basic Information */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name *</label>
                <Input placeholder="Enter company name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company ID / Code *</label>
                <Input placeholder="Enter company code or ID" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Type *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Consultancy">Consultancy</SelectItem>
                    <SelectItem value="Startup">Startup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Industry Sector *</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="EdTech">EdTech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Size</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Company Description</label>
                <Textarea placeholder="Brief company overview..." />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Location Details */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Textarea placeholder="Enter full address..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input placeholder="City" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP / Pin Code</label>
                <Input placeholder="ZIP / Pin Code" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <Input placeholder="Enter email address" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Website URL</label>
                <Input placeholder="Enter website URL" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Social Media Link (optional)</label>
                <Input placeholder="LinkedIn or social profile" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: HR / Recruiter Info */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">HR / Recruiter Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">HR/Recruiter Name</label>
                <Input placeholder="HR or recruiter name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">HR Email</label>
                <Input placeholder="HR email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">HR Phone Number</label>
                <Input placeholder="HR phone number" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Verification & Media */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Verification & Media</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Registration Number (optional)</label>
                <Input placeholder="Enter registration number" />
              </div>
              <label className="block text-sm font-medium">Upload Company Logo</label>
              <input type="file" className="border rounded px-3 py-2" />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prevStep} disabled={step === 0}>Previous</Button>
          <div className="flex gap-2">
            <Button variant="ghost">Reset Form</Button>
            <Button onClick={handleNext}>
              {step === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
