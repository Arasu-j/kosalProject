'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { ReactNode } from 'react'

interface SessionContextType {
	// Company session
	token: string | null
	setToken: (token: string | null) => void
	company: any
	setCompany: (company: any) => void
	
	// College session
	collegeToken: string | null
	setCollegeToken: (token: string | null) => void
	college: any
	setCollege: (college: any) => void
}

const defaultSessionContext: SessionContextType = {
	token: null,
	setToken: () => {},
	company: null,
	setCompany: () => {},
	collegeToken: null,
	setCollegeToken: () => {},
	college: null,
	setCollege: () => {},
}

const SessionContext = createContext<SessionContextType>(defaultSessionContext)

export function useSession() {
	return useContext(SessionContext)
}

export default function SessionProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null)
	const [company, setCompany] = useState<any>(null)
	const [collegeToken, setCollegeToken] = useState<string | null>(null)
	const [college, setCollege] = useState<any>(null)

	// Validate company session
	const companySessionData = useQuery(
		api.companies.validateSession,
		token ? { token } : 'skip'
	)

	// Validate college session
	const collegeSessionData = useQuery(
		api.colleges.validateCollegeSession,
		collegeToken ? { token: collegeToken } : 'skip'
	)

	useEffect(() => {
		if (companySessionData && companySessionData.company) {
			setCompany(companySessionData.company)
		} else {
			setCompany(null)
		}
	}, [companySessionData])

	useEffect(() => {
		if (collegeSessionData && collegeSessionData.college) {
			setCollege(collegeSessionData.college)
		} else {
			setCollege(null)
		}
	}, [collegeSessionData])

	return (
		<SessionContext.Provider value={{ 
			token, 
			setToken, 
			company, 
			setCompany,
			collegeToken,
			setCollegeToken,
			college,
			setCollege
		}}>
			{children}
		</SessionContext.Provider>
	)
} 