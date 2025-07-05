// app/company/CmpDashboard/jobs/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useSession } from '../../../SessionProvider'
import { Briefcase } from 'lucide-react'

export default function PostJobsPage() {
	const { company } = useSession()
	const postJob = useMutation(api.companies.postJob)
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		location: '',
		salary: '',
		skillsRequired: '',
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setSuccess('')
		if (!company?.id) {
			setError('Company not found in session.')
			return
		}
		setLoading(true)
		try {
			await postJob({ ...formData, companyId: company.id })
			setFormData({ title: '', description: '', location: '', salary: '', skillsRequired: '' })
			setSuccess('Job posted successfully!')
		} catch (err: any) {
			setError(err.message || 'Failed to post job')
		}
		setLoading(false)
	}

	return (
		<div className='min-h-[80vh] bg-[#f7f8fa] px-2 sm:px-6 py-8'>
			<h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mb-1'>
				Post a New Job
			</h1>
			<p className='text-gray-500 text-base mb-8'>Create and manage job opportunities for colleges</p>

			<div className='max-w-5xl mx-auto'>
				<Card className='rounded-2xl shadow border-0 mb-8'>
					<CardHeader className='flex flex-row items-center gap-2 bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
						<Briefcase className='text-blue-500 mr-2' size={22} />
						<h2 className='text-lg font-semibold text-blue-700'>Create Job Posting</h2>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className='bg-white rounded-b-2xl p-8'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
								<div>
									<Label className='font-semibold mb-1'>Job Title</Label>
									<Input name='title' value={formData.title} onChange={handleChange} required className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'/>
								</div>
								<div>
									<Label className='font-semibold mb-1'>Location</Label>
									<Input name='location' value={formData.location} onChange={handleChange} required className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'/>
								</div>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
								<div className='md:col-span-2'>
									<Label className='font-semibold mb-1'>Salary</Label>
									<Input name='salary' value={formData.salary} onChange={handleChange} required className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'/>
								</div>
							</div>
							<div className='mb-4'>
								<Label className='font-semibold mb-1'>Skills Required</Label>
								<Input name='skillsRequired' value={formData.skillsRequired} onChange={handleChange} required className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'/>
							</div>
							<div className='mb-4'>
								<Label className='font-semibold mb-1'>Job Description</Label>
								<Textarea name='description' value={formData.description} onChange={handleChange} required className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm min-h-[80px]'/>
							</div>
							<CardFooter className='flex justify-end p-0'>
								<Button type='submit' disabled={loading} className='bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg px-6 py-2 shadow hover:from-blue-600 hover:to-purple-600 transition-all'>
									Post Job
								</Button>
							</CardFooter>
						</CardContent>
					</form>
				</Card>

				<Card className='rounded-2xl shadow border-0'>
					<CardHeader>
						<CardTitle>Posted Jobs</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						{success && (
							<p className='text-green-500'>{success}</p>
						)}
						{error && (
							<p className='text-red-500'>{error}</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
