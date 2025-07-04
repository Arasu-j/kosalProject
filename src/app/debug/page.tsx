'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function DebugPage() {
	const companies = useQuery(api.companies.listCompanies)

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Debug: Companies in Database</h1>
			
			{companies === undefined ? (
				<p>Loading...</p>
			) : companies.length === 0 ? (
				<p>No companies found in database.</p>
			) : (
				<div>
					<p className="mb-4">Found {companies.length} company(ies):</p>
					<div className="space-y-4">
						{companies.map((company) => (
							<div key={company.id} className="border p-4 rounded">
								<h3 className="font-semibold">Company: {company.name}</h3>
								<p>ID: {company.companyId}</p>
								<p>Email: {company.email}</p>
								<p>Created: {new Date(company.createdAt).toLocaleString()}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
} 