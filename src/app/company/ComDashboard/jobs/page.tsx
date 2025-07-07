// app/company/CmpDashboard/jobs/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useSession } from '../../../SessionProvider'
import { Building2, MapPin, Briefcase, DollarSign, Plus } from 'lucide-react'

export default function PostJobsPage() {
	const { company } = useSession()
	const postJob = useMutation(api.companies.postJob)
	const allJobs = useQuery(api.companies.listJobs)
	const jobs = allJobs ? allJobs.filter(job => job.companyId === company?.id) : []
	const [showForm, setShowForm] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		location: '',
		salary: '',
		skillsRequired: '',
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
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
			await postJob({
				...formData,
				companyId: company.id as any,
			})
			setFormData({
				title: '',
				description: '',
				location: '',
				salary: '',
				skillsRequired: '',
			})
			setShowForm(false)
			setSuccess('Job posted successfully!')
		} catch (err: any) {
			setError(err.message || 'Failed to post job')
		}
		setLoading(false)
	}

	return (
		<div className='min-h-[80vh] bg-[#f7f8fa] px-2 sm:px-6 py-8'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
				<div>
					<h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#6366f1] mb-1'>
						Job Management
					</h1>
					<p className='text-gray-500 text-base'>Post and manage job openings for students</p>
				</div>
				<Button
					onClick={() => setShowForm(!showForm)}
					className='bg-black text-white font-semibold rounded-md px-5 py-2 shadow hover:bg-gray-900 transition-all flex items-center gap-2'
				>
					<Plus size={18} />
					{showForm ? 'Cancel' : 'Post New Job'}
				</Button>
			</div>

			<div className='max-w-5xl mx-auto'>
				{showForm && (
					<Card className='rounded-2xl shadow border-0 mb-8'>
						<CardHeader className='flex flex-row items-center gap-2 bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
							<Briefcase className='text-blue-500 mr-2' size={22} />
							<h2 className='text-lg font-semibold text-blue-700'>Post New Job</h2>
						</CardHeader>
						<form onSubmit={handleSubmit}>
							<CardContent className='bg-white p-8'>
								{error && (
									<p className='text-red-500 mb-4'>{error}</p>
								)}
								{success && (
									<p className='text-green-500 mb-4'>{success}</p>
								)}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-2'>
										<Label htmlFor='title' className='text-sm font-medium text-gray-700'>
											Job Title
										</Label>
										<Input
											id='title'
											name='title'
											value={formData.title}
											onChange={handleInputChange}
											placeholder='e.g., Software Engineer'
											className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='location' className='text-sm font-medium text-gray-700'>
											Location
										</Label>
										<Input
											id='location'
											name='location'
											value={formData.location}
											onChange={handleInputChange}
											placeholder='e.g., Bangalore, India'
											className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='salary' className='text-sm font-medium text-gray-700'>
											Salary Range
										</Label>
										<Input
											id='salary'
											name='salary'
											value={formData.salary}
											onChange={handleInputChange}
											placeholder='e.g., ₹6-12 LPA'
											className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='skillsRequired' className='text-sm font-medium text-gray-700'>
											Skills Required
										</Label>
										<Input
											id='skillsRequired'
											name='skillsRequired'
											value={formData.skillsRequired}
											onChange={handleInputChange}
											placeholder='e.g., React, Node.js, TypeScript'
											className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
											required
										/>
									</div>
									<div className='space-y-2 md:col-span-2'>
										<Label htmlFor='description' className='text-sm font-medium text-gray-700'>
											Job Description
										</Label>
										<Textarea
											id='description'
											name='description'
											value={formData.description}
											onChange={handleInputChange}
											placeholder='Detailed job description...'
											className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]'
											required
										/>
									</div>
								</div>
							</CardContent>
							<CardFooter className='bg-gray-50 px-8 py-4 rounded-b-2xl'>
								<Button
									type='submit'
									disabled={loading}
									className='bg-black text-white font-semibold rounded-md px-6 py-2 shadow hover:bg-gray-900 transition-all'
								>
									{loading ? 'Posting...' : 'Post Job'}
								</Button>
							</CardFooter>
						</form>
					</Card>
				)}

				<Card className='rounded-2xl shadow border-0'>
					<CardHeader className='flex flex-row items-center gap-2 bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
						<Briefcase className='text-blue-500 mr-2' size={22} />
						<h2 className='text-lg font-semibold text-blue-700'>Posted Jobs</h2>
					</CardHeader>
					<CardContent className='bg-white rounded-b-2xl p-8'>
						{jobs.length === 0 ? (
							<p className='text-gray-500'>No jobs posted yet.</p>
						) : (
							<div className='grid grid-cols-1 gap-6'>
								{jobs.map(job => (
									<div key={job._id} className='border border-gray-100 p-6 rounded-xl bg-white shadow-sm flex flex-col gap-2'>
										<div className='flex items-center gap-2 mb-1'>
											<Building2 size={18} className='text-blue-700' />
											<span className='font-bold text-blue-800 text-lg'>{job.title}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
											<MapPin size={16} />
											<span>{job.location}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
											<DollarSign size={16} />
											<span>{job.salary}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
											<span>Skills Required: {job.skillsRequired}</span>
										</div>
										<p className='mt-2 text-gray-600'>{job.description}</p>
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
