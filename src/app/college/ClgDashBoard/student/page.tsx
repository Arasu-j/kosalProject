// app/college/ClgDashBoard/students/page.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useSession } from '../../../SessionProvider'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { User, Eye } from 'lucide-react'

export default function StudentManagementPage() {
	const { college } = useSession()
	const collegeId = college?.id
	const students = useQuery(
		api.students.getStudentsByCollege,
		collegeId ? { collegeId } : 'skip'
	)
	const addStudent = useMutation(api.students.addStudent)
	const [formData, setFormData] = useState({
		name: '',
		rollNumber: '',
		email: '',
		phone: '',
		department: '',
		year: '',
		skills: '',
		resume: '',
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleAddStudent = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!collegeId) {
			setError('College not found in session.')
			return
		}
		setLoading(true)
		setError('')
		try {
			await addStudent({
				...formData,
				collegeId,
			})
			setFormData({
				name: '',
				rollNumber: '',
				email: '',
				phone: '',
				department: '',
				year: '',
				skills: '',
				resume: '',
			})
		} catch (err: any) {
			setError(err.message || 'Failed to add student')
		}
		setLoading(false)
	}

	return (
		<div className='min-h-[80vh] bg-[#f7f8fa] px-2 sm:px-6 py-8'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
				<div>
					<h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#a855f7] mb-1'>
						Student Management
					</h1>
					<p className='text-gray-500 text-base'>Add, view, and manage students with ease</p>
				</div>
				<div className='flex justify-end'>
					<span className='inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm shadow-sm'>
						<Eye className='w-4 h-4 mr-2' />
						{students ? `${students.length} Students Added` : '0 Students Added'}
					</span>
				</div>
			</div>

			<div className='max-w-5xl mx-auto'>
				<Card className='rounded-2xl shadow border-0 mb-8'>
					<CardHeader className='flex flex-row items-center gap-2 bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
						<User className='text-black mr-2' size={22} />
						<h2 className='text-lg font-semibold text-black'>Add New Student</h2>
					</CardHeader>
					<CardContent className='bg-white rounded-b-2xl p-8'>
						<form onSubmit={handleAddStudent} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<Label className='font-semibold mb-1'>Name</Label>
								<Input name='name' value={formData.name} onChange={handleChange} required className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'/>
							</div>
							<div>
								<Label className='font-semibold mb-1'>Course</Label>
								<Input name='department' value={formData.department} onChange={handleChange} required className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'/>
							</div>
							<div>
								<Label className='font-semibold mb-1'>Skills</Label>
								<Input name='skills' value={formData.skills} onChange={handleChange} className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'/>
							</div>
							<div>
								<Label className='font-semibold mb-1'>Resume Link</Label>
								<Input name='resume' value={formData.resume} onChange={handleChange} className='mt-1 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm'/>
							</div>
							<div className='md:col-span-2 flex justify-end'>
								<Button type='submit' disabled={loading} className='bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg px-6 py-2 shadow hover:from-blue-600 hover:to-purple-600 transition-all'>
									{loading ? 'Adding...' : 'Add Student'}
								</Button>
							</div>
						</form>
						{error && <div className='mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded'>{error}</div>}
					</CardContent>
				</Card>

				<Card className='rounded-2xl shadow border-0'>
					<CardHeader className='bg-gradient-to-r from-white to-[#f7f8fa] rounded-t-2xl border-b px-6 py-4'>
						<h2 className='text-lg font-semibold text-black'>Student List</h2>
					</CardHeader>
					<CardContent className='bg-white rounded-b-2xl p-8'>
						{students === undefined ? (
							<p className='text-gray-500'>Loading...</p>
						) : students.length === 0 ? (
							<p className='text-gray-500'>No students added yet.</p>
						) : (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{students.map((student) => (
									<div
										key={student._id}
										className='border border-gray-100 p-6 rounded-xl bg-white shadow-sm flex flex-col gap-2'
									>
										<p><span className='font-semibold'>Name:</span> {student.name}</p>
										<p><span className='font-semibold'>Roll Number:</span> {student.rollNumber}</p>
										<p><span className='font-semibold'>Email:</span> {student.email}</p>
										<p><span className='font-semibold'>Phone:</span> {student.phone}</p>
										<p><span className='font-semibold'>Department:</span> {student.department}</p>
										<p><span className='font-semibold'>Year:</span> {student.year}</p>
										<p><span className='font-semibold'>Skills:</span> {student.skills}</p>
										{student.resume && (
											<a
												href={student.resume}
												target='_blank'
												className='flex items-center gap-1 text-blue-600 hover:underline mt-2 text-sm font-medium'
											>
												<Eye size={15} /> View Resume
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
