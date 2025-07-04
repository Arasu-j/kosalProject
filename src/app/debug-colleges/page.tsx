'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function DebugCollegesPage() {
	const colleges = useQuery(api.colleges.listColleges)

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Debug: Colleges in Database</h1>
			
			{colleges === undefined ? (
				<p>Loading...</p>
			) : colleges.length === 0 ? (
				<p>No colleges found in database.</p>
			) : (
				<div>
					<p className="mb-4">Found {colleges.length} college(ies):</p>
					<div className="space-y-4">
						{colleges.map((college) => (
							<div key={college.id} className="border p-4 rounded">
								<h3 className="font-semibold">College: {college.name}</h3>
								<p>ID: {college.collegeId}</p>
								<p>Email: {college.email}</p>
								<p>Created: {new Date(college.createdAt).toLocaleString()}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
} 