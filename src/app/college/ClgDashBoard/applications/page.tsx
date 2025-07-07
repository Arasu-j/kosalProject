// app/college/ClgDashBoard/applications/page.tsx
'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Building2, Briefcase, User, Inbox } from 'lucide-react'

export default function JobApplicationsPage () {
	const jobs = useQuery(api.companies.listJobs)

	return (
		<div className='min-h-[80vh] bg-[#f7f8fa] px-2 sm:px-6 py-8'>
			<h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#6366f1] mb-1'>
				Job Applications
			</h1>
			<p className='text-gray-500 text-base mb-8'>Review and update student application statuses</p>

			<div className='max-w-6xl mx-auto'>
				<Card className='rounded-2xl shadow border-0'>
					<CardHeader className='flex flex-row items-center gap-2 bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
						<Inbox className='text-blue-500 mr-2' size={22} />
						<h2 className='text-lg font-semibold text-blue-700'>Applications Overview</h2>
					</CardHeader>
					<CardContent className='bg-white rounded-b-2xl p-8'>
						{jobs === undefined ? (
							<p className='text-gray-500'>Loading...</p>
						) : jobs.length === 0 ? (
							<p className='text-gray-500'>No jobs found.</p>
						) : (
							<div className='grid grid-cols-1 gap-6'>
								{jobs.map(job => (
									<div key={job._id} className='border border-gray-100 p-6 rounded-xl bg-white shadow-sm flex flex-col gap-2'>
										<div className='flex items-center gap-2 mb-1'>
											<User size={18} className='text-blue-700' />
											<span className='font-bold text-blue-800 text-lg'>{job.title}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
											<Building2 size={16} />
											<span>Company ID: {job.companyId}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
											<Briefcase size={16} />
											<span>Location: {job.location}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
											<span>Salary: {job.salary}</span>
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
