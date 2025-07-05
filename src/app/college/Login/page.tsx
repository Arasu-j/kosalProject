// CollegeLoginPage.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useSession } from '../../SessionProvider'
import { useState, FormEvent } from 'react'
import { GraduationCap, User, KeyRound, ArrowRight, PlusSquare } from 'lucide-react'

export default function CollegeLoginPage () {
	const router = useRouter()
	const loginCollege = useMutation(api.colleges.loginCollege)
	const { setCollegeToken } = useSession()
	const [collegeId, setCollegeId] = useState('')
	const [name, setName] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [remember, setRemember] = useState(false)

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		try {
			const result = await loginCollege({ collegeId, name })
			if (result.success && result.token) {
				setCollegeToken(result.token)
				router.push('/college/ClgDashBoard/overview')
			} else {
				setError('Invalid credentials')
			}
		} catch (err: any) {
			setError(err.message || 'Login failed')
		}
		setLoading(false)
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f8ff] via-[#e6e9fa] to-[#f3e8ff] relative'>
			<div className='absolute left-8 top-8 opacity-10'>
				<GraduationCap size={48} />
			</div>
			<Card className='w-full max-w-md rounded-2xl shadow-xl border-0 bg-white/90'>
				<div className='flex flex-col items-center -mt-12 mb-2'>
					<div className='bg-gradient-to-br from-[#6a5af9] to-[#b16cea] rounded-xl p-4 shadow-lg mb-2'>
						<GraduationCap size={40} className='text-white' />
					</div>
					<h1 className='text-2xl font-bold text-gray-800 mt-2'>Welcome College</h1>
					<p className='text-gray-500 text-sm mb-2'>Access your admin portal</p>
				</div>
				<CardContent className='pt-0'>
					<div className='flex flex-col items-center mb-4'>
						<div className='flex items-center gap-2 text-[#3b3b6d] font-semibold text-base mb-1'>
							<GraduationCap size={18} />
							<span>College Portal Login</span>
						</div>
						<p className='text-xs text-gray-400'>Enter your credentials to continue</p>
					</div>
					<form onSubmit={handleLogin} className='space-y-4'>
						<div>
							<Label htmlFor='collegeName' className='flex items-center gap-1 text-sm font-medium text-gray-700'>
								<User size={16} className='text-[#6a5af9]' />
								College Name
							</Label>
							<Input
								id='collegeName'
								type='text'
								placeholder='e.g., ABC Engineering College'
								required
								value={name}
								onChange={e => setName(e.target.value)}
								className='mt-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#6a5af9] focus:ring-2 focus:ring-[#b16cea]/30 bg-white text-gray-800 placeholder-gray-400 shadow-sm transition-all'
							/>
						</div>
						<div>
							<Label htmlFor='collegeId' className='flex items-center gap-1 text-sm font-medium text-gray-700'>
								<KeyRound size={16} className='text-[#6a5af9]' />
								College Code / ID
							</Label>
							<Input
								id='collegeId'
								type='text'
								placeholder='e.g., CLG123'
								required
								value={collegeId}
								onChange={e => setCollegeId(e.target.value)}
								className='mt-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#6a5af9] focus:ring-2 focus:ring-[#b16cea]/30 bg-white text-gray-800 placeholder-gray-400 shadow-sm transition-all'
							/>
						</div>
						<div className='flex items-center justify-between mt-2 mb-1'>
							<label className='flex items-center gap-2 text-xs text-gray-500 cursor-pointer'>
								<input
									type='checkbox'
									checked={remember}
									onChange={e => setRemember(e.target.checked)}
									className='accent-[#6a5af9] rounded-sm h-4 w-4 border-gray-300'
								/>
								Remember me
							</label>
							<button
								type='button'
								className='text-xs text-[#6a5af9] hover:underline font-medium'
								onClick={() => alert('Please contact your admin to recover your code.')}
							>
								Forgot code?
							</button>
						</div>
						{error && (
							<div className='p-2 bg-red-100 border border-red-300 text-red-700 rounded text-xs mb-2'>
								{error}
							</div>
						)}
						<CardFooter className='flex flex-col gap-2 px-0'>
							<Button
								type='submit'
								disabled={loading}
								className='w-full bg-gradient-to-r from-[#6a5af9] to-[#b16cea] text-white font-semibold rounded-lg py-2 shadow-md hover:from-[#5a4ae6] hover:to-[#a05adf] transition-all flex items-center justify-center gap-2 text-base'
							>
								{loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={18} />
							</Button>
							<div className='flex items-center justify-center gap-2 text-xs text-gray-400 mt-1'>
								<span>New to our platform?</span>
							</div>
							<Button
								type='button'
								variant='outline'
								className='w-full border border-[#e0e0e0] text-[#3b3b6d] font-semibold rounded-lg py-2 bg-white hover:bg-[#f4f8ff] flex items-center justify-center gap-2 text-base shadow-sm'
								onClick={() => router.push('/college/NewRegClg')}
							>
								<PlusSquare size={18} /> Register New College
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
