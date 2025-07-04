'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import type { CollegeRegistrationData } from '../../../../convex/colleges'

const steps = [
  'Basic Information',
  'Location Details',
  'Contact Details',
  'Key Personnel',
  'Academic Details',
  'Media Upload',
]

export default function CollegeRegistrationForm() {
  const [step, setStep] = useState(0)
  const router = useRouter()
  const registerCollege = useMutation(api.colleges.registerCollege)
  const [form, setForm] = useState<CollegeRegistrationData>({
    name: '',
    collegeId: '',
    collegeType: 'Government',
    affiliatedUniversity: '',
    accreditation: '',
    description: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    country: 'India',
    zipCode: '',
    email: '',
    phone: '',
    website: '',
    principalName: '',
    placementOfficerName: '',
    placementEmail: '',
    placementPhone: '',
    totalDepartments: '',
    coursesOffered: [],
    logoUrl: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  type Field = keyof CollegeRegistrationData
  const handleChange = (field: Field, value: CollegeRegistrationData[Field]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (step === steps.length - 1) {
      setLoading(true)
      setError('')
      try {
        console.log('Submitting college form data:', form)
        const result = await registerCollege({ data: form })
        console.log('College registration result:', result)
        router.push('/college/Login')
      } catch (err: any) {
        console.error('College registration error:', err)
        setError(err.message || 'Registration failed')
      }
      setLoading(false)
    } else {
      nextStep()
    }
  }

  return (
    <div className="p-6 bg-[#f4f8ff] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-2">College Registration Portal</h1>
      <p className="text-center mb-8">Register your institution with our academic network</p>

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
        {step === 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">College Name *</label>
                <Input 
                  placeholder="Enter college name" 
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value as CollegeRegistrationData['name'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">College Code / ID *</label>
                <Input 
                  placeholder="Enter college code" 
                  value={form.collegeId}
                  onChange={(e) => handleChange('collegeId', e.target.value as CollegeRegistrationData['collegeId'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">College Type *</label>
                <Select 
                  value={form.collegeType} 
                  onValueChange={(value) => handleChange('collegeType', value as CollegeRegistrationData['collegeType'])}
                >
                  <SelectTrigger><SelectValue placeholder="Select college type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Autonomous">Autonomous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Affiliated University *</label>
                <Input 
                  placeholder="Enter affiliated university" 
                  value={form.affiliatedUniversity}
                  onChange={(e) => handleChange('affiliatedUniversity', e.target.value as CollegeRegistrationData['affiliatedUniversity'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Accreditation</label>
                <Input 
                  placeholder="e.g. NAAC A+, NBA" 
                  value={form.accreditation}
                  onChange={(e) => handleChange('accreditation', e.target.value as CollegeRegistrationData['accreditation'])}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea 
                  placeholder="Short description about the college..." 
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value as CollegeRegistrationData['description'])}
                />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Textarea 
                  placeholder="Enter full address..." 
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value as CollegeRegistrationData['address'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input 
                  placeholder="City" 
                  value={form.city}
                  onChange={(e) => handleChange('city', e.target.value as CollegeRegistrationData['city'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <Select 
                  value={form.state} 
                  onValueChange={(value) => handleChange('state', value as CollegeRegistrationData['state'])}
                >
                  <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <Select 
                  value={form.country} 
                  onValueChange={(value) => handleChange('country', value as CollegeRegistrationData['country'])}
                >
                  <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP / Pin Code</label>
                <Input 
                  placeholder="ZIP / Pin Code" 
                  value={form.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value as CollegeRegistrationData['zipCode'])}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <Input 
                  placeholder="Enter email address" 
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value as CollegeRegistrationData['email'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input 
                  placeholder="Enter phone number" 
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value as CollegeRegistrationData['phone'])}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Website URL</label>
                <Input 
                  placeholder="Enter website URL" 
                  value={form.website}
                  onChange={(e) => handleChange('website', e.target.value as CollegeRegistrationData['website'])}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Key Personnel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Principal Name</label>
                <Input 
                  placeholder="Principal's name" 
                  value={form.principalName}
                  onChange={(e) => handleChange('principalName', e.target.value as CollegeRegistrationData['principalName'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Placement Officer Name</label>
                <Input 
                  placeholder="Placement officer's name" 
                  value={form.placementOfficerName}
                  onChange={(e) => handleChange('placementOfficerName', e.target.value as CollegeRegistrationData['placementOfficerName'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Placement Email</label>
                <Input 
                  placeholder="Placement officer's email" 
                  value={form.placementEmail}
                  onChange={(e) => handleChange('placementEmail', e.target.value as CollegeRegistrationData['placementEmail'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Placement Phone Number</label>
                <Input 
                  placeholder="Placement phone number" 
                  value={form.placementPhone}
                  onChange={(e) => handleChange('placementPhone', e.target.value as CollegeRegistrationData['placementPhone'])}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Academic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Total Departments</label>
                <Input 
                  placeholder="e.g. 12" 
                  value={form.totalDepartments}
                  onChange={(e) => handleChange('totalDepartments', e.target.value as CollegeRegistrationData['totalDepartments'])}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Courses Offered</label>
                <div className="flex flex-wrap gap-2">
                  {['BCA', 'MCA', 'B.Tech', 'M.Tech', 'MBA'].map(course => (
                    <div 
                      key={course} 
                      className={`px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100 ${
                        form.coursesOffered?.includes(course) ? 'bg-blue-500 text-white' : 'bg-gray-100'
                      }`}
                      onClick={() => {
                        const currentCourses = form.coursesOffered || []
                        const newCourses = currentCourses.includes(course)
                          ? currentCourses.filter(c => c !== course)
                          : [...currentCourses, course]
                        handleChange('coursesOffered', newCourses)
                      }}
                    >
                      {course}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Media Upload</h2>
            <div className="grid gap-4">
              <label className="block text-sm font-medium">Upload College Logo</label>
              <input type="file" className="border rounded px-3 py-2" />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prevStep} disabled={step === 0}>Previous</Button>
          <div className="flex gap-2">
            <Button variant="ghost">Reset Form</Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : (step === steps.length - 1 ? 'Submit' : 'Next')}
            </Button>
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
