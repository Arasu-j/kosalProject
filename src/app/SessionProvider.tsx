'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Company {
	id: string
	name: string
	companyId: string
	email: string
}

interface College {
	id: string
	name: string
	collegeId: string
	email: string
	totalDepartments?: string
	collegeType?: string
	affiliatedUniversity?: string
	accreditation?: string
	description?: string
	address?: string
	city?: string
	state?: string
	country?: string
	zipCode?: string
	phone?: string
	website?: string
	principalName?: string
	placementOfficerName?: string
	placementEmail?: string
	placementPhone?: string
	coursesOffered?: string[]
	logoUrl?: string
}

interface SessionContextType {
	company: Company | null
	college: College | null
	token: string | null
	collegeToken: string | null
	setCompany: (company: Company | null) => void
	setCollege: (college: College | null) => void
	setToken: (token: string | null) => void
	setCollegeToken: (token: string | null) => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
	const [company, setCompany] = useState<Company | null>(null)
	const [college, setCollege] = useState<College | null>(null)
	const [token, setToken] = useState<string | null>(null)
	const [collegeToken, setCollegeToken] = useState<string | null>(null)

	useEffect(() => {
		// Load session data from localStorage on mount
		const savedCompany = localStorage.getItem('company')
		const savedCollege = localStorage.getItem('college')
		const savedToken = localStorage.getItem('token')
		const savedCollegeToken = localStorage.getItem('collegeToken')

		if (savedCompany) {
			try {
				setCompany(JSON.parse(savedCompany))
			} catch (error) {
				console.error('Failed to parse saved company:', error)
			}
		}
		if (savedCollege) {
			try {
				setCollege(JSON.parse(savedCollege))
			} catch (error) {
				console.error('Failed to parse saved college:', error)
			}
		}
		if (savedToken) setToken(savedToken)
		if (savedCollegeToken) setCollegeToken(savedCollegeToken)
	}, [])

	useEffect(() => {
		// Save session data to localStorage when it changes
		if (company) {
			localStorage.setItem('company', JSON.stringify(company))
		} else {
			localStorage.removeItem('company')
		}
		if (college) {
			localStorage.setItem('college', JSON.stringify(college))
		} else {
			localStorage.removeItem('college')
		}
		if (token) {
			localStorage.setItem('token', token)
		} else {
			localStorage.removeItem('token')
		}
		if (collegeToken) {
			localStorage.setItem('collegeToken', collegeToken)
		} else {
			localStorage.removeItem('collegeToken')
		}
	}, [company, college, token, collegeToken])

	return (
		<SessionContext.Provider
			value={{
				company,
				college,
				token,
				collegeToken,
				setCompany,
				setCollege,
				setToken,
				setCollegeToken,
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export function useSession() {
	const context = useContext(SessionContext)
	if (context === undefined) {
		throw new Error('useSession must be used within a SessionProvider')
	}
	return context
} 