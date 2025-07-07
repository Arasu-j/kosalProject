// app/college-dashboard/overview/page.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useSession } from '../../../SessionProvider'
import { Id } from '../../../../../convex/_generated/dataModel'
import {
	FileText,
	Briefcase,
	Users,
	Clock,
	Trophy,
	ArrowUpRight,
} from 'lucide-react'

interface CollegeData {
	_id: Id<'colleges'>
	totalDepartments?: string
}

const statMeta = [
	{
		title: 'Departments Registered',
		icon: FileText,
		iconBg: 'bg-blue-100',
		iconColor: 'text-blue-500',
		circle: 'bg-blue-200/30',
		sub: '+2 this month',
		subDot: 'bg-blue-500',
	},
	{
		title: 'Active Companies',
		icon: Briefcase,
		iconBg: 'bg-green-100',
		iconColor: 'text-green-500',
		circle: 'bg-green-200/30',
		sub: '+3 this week',
		subDot: 'bg-green-500',
	},
	{
		title: 'Students Registered',
		icon: Users,
		iconBg: 'bg-purple-100',
		iconColor: 'text-purple-500',
		circle: 'bg-purple-200/30',
		sub: '+45 this month',
		subDot: 'bg-purple-500',
	},
	{
		title: 'Job Applications Submitted',
		icon: FileText,
		iconBg: 'bg-orange-100',
		iconColor: 'text-orange-500',
		circle: 'bg-orange-200/30',
		sub: '+12 today',
		subDot: 'bg-orange-500',
	},
	{
		title: 'Ongoing Interviews',
		icon: Clock,
		iconBg: 'bg-yellow-100',
		iconColor: 'text-yellow-500',
		circle: 'bg-yellow-200/30',
		sub: '3 scheduled today',
		subDot: 'bg-orange-500',
	},
	{
		title: 'Successful Placements',
		icon: Trophy,
		iconBg: 'bg-rose-100',
		iconColor: 'text-rose-500',
		circle: 'bg-rose-200/30',
		sub: '+8 this month',
		subDot: 'bg-rose-500',
	},
]

export default function CollegeDashboardOverviewPage () {
	const { college } = useSession()
	const companies = useQuery(api.companies.listCompanies)
	const students = useQuery(api.students.getStudentsByCollege, (college as CollegeData)?._id ? { collegeId: (college as CollegeData)._id } : 'skip')
	const departments = (college as CollegeData)?.totalDepartments ? Number((college as CollegeData).totalDepartments) : 0
	const activeCompanies = companies ? companies.filter(c => c.isActive).length : 0
	const studentsRegistered = students ? students.length : 0

	const stats = [
		{ value: departments },
		{ value: activeCompanies },
		{ value: studentsRegistered },
		{ value: 0 },
		{ value: 0 },
		{ value: 0 },
	]

	return (
		<div className='relative min-h-[80vh] bg-[#f7f8fa] px-2 sm:px-6 py-4 lg:py-8'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 gap-4'>
				<div>
					<h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6a5af9] to-[#a855f7] mb-1'>
						Dashboard Overview
					</h1>
					<p className='text-gray-500 text-sm lg:text-base'>Monitor your college&apos;s placement activities and performance metrics</p>
				</div>
				<div className='flex justify-end'>
					<span className='inline-flex items-center px-3 lg:px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-xs lg:text-sm shadow-sm'>
						<span className='mr-2'>
							<svg className='w-3 h-3 lg:w-4 lg:h-4 inline-block' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M4 17l6-6 4 4 6-6'/></svg>
						</span>
						All systems operational
					</span>
				</div>
			</div>
			<div className='grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
				{statMeta.map((meta, i) => {
					const Icon = meta.icon
					return (
						<Card key={meta.title} className='relative overflow-hidden rounded-xl shadow group bg-white border-0 transition-all hover:shadow-lg min-h-[100px] sm:min-h-[120px]'>
							<CardContent className='p-2 sm:p-3 flex flex-col h-full'>
								<div className='flex items-center justify-between mb-1'>
									<span className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg ${meta.iconBg} ${meta.iconColor} bg-opacity-80 text-lg`}>
										<Icon className={`${meta.iconColor}`} size={14} />
									</span>
									<ArrowUpRight className='text-gray-300 group-hover:text-gray-400' size={14} />
								</div>
								<div className='font-medium text-gray-500 text-xs mb-0.5'>{meta.title}</div>
								<div className='text-lg sm:text-xl font-bold text-gray-900 mb-1'>{stats[i].value}</div>
								<div className='flex items-center text-[10px] sm:text-[11px] text-gray-400 font-medium'>
									<span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 sm:mr-2 ${meta.subDot}`}></span>
									{meta.sub}
								</div>
								<div className={`absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${meta.circle} pointer-events-none select-none`} />
							</CardContent>
						</Card>
					)
				})}
			</div>
		</div>
	)
}
