// app/company/CmpDashboard/applications/page.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { User, Building2, Briefcase, FileText, Inbox } from 'lucide-react'

export default function StudentApplicationsPage() {
	// Fetch all students from Convex
	const students = useQuery(api.students.listAllStudents) // Fetch all students

	return (
		<div className='min-h-[80vh] bg-[#f7f8fa] px-2 sm:px-6 py-8'>
			<h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-1'>
				Student Applications
			</h1>
			<p className='text-gray-500 text-base mb-8'>Review applications submitted by students</p>

			<div className='max-w-6xl mx-auto'>
				<Card className='rounded-2xl shadow border-0'>
					<CardHeader className='flex flex-row items-center gap-2 bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
						<Inbox className='text-purple-500 mr-2' size={22} />
						<h2 className='text-lg font-semibold text-purple-700'>Received Applications</h2>
					</CardHeader>
					<CardContent className='bg-white rounded-b-2xl p-8'>
						{students === undefined ? (
							<p className='text-gray-500'>Loading...</p>
						) : students.length === 0 ? (
							<p className='text-gray-500'>No applications found.</p>
						) : (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{students.map(student => (
									<div key={student._id} className='border border-gray-100 p-6 rounded-xl bg-white shadow-sm flex flex-col gap-2'>
										<div className='flex items-center gap-2 mb-1'>
											<User size={18} className='text-blue-600' />
											<span className='font-bold text-blue-800 text-lg'>{student.name}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
											<Building2 size={16} />
											<span>College ID: {student.collegeId}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-1'>
											<Briefcase size={16} />
											<span>Department: {student.department}</span>
										</div>
										<div className='flex items-center gap-2 text-gray-600 text-sm mb-2'>
											<span>Year: {student.year}</span>
										</div>
										{student.resume && (
											<a
												href={student.resume}
												target='_blank'
												rel='noopener noreferrer'
												className='flex items-center gap-1 text-blue-600 hover:underline mt-2 text-sm font-medium'
											>
												<FileText size={15} /> View Resume
											</a>
										)}
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
