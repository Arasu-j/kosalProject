import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	companies: defineTable({
		// Basic Information
		name: v.string(),
		companyId: v.string(), // Unique company ID/code for login
		companyType: v.union(
			v.literal('Product'),
			v.literal('Service'),
			v.literal('Consultancy'),
			v.literal('Startup')
		),
		industrySector: v.union(
			v.literal('IT'),
			v.literal('Finance'),
			v.literal('Healthcare'),
			v.literal('EdTech')
		),
		companySize: v.union(
			v.literal('1-10'),
			v.literal('11-50'),
			v.literal('51-200'),
			v.literal('201-500'),
			v.literal('500+')
		),
		description: v.optional(v.string()),

		// Location Details
		address: v.string(),
		city: v.string(),
		state: v.union(
			v.literal('Tamil Nadu'),
			v.literal('Karnataka')
		),
		country: v.union(
			v.literal('India'),
			v.literal('USA')
		),
		zipCode: v.string(),

		// Contact Details
		email: v.string(),
		phone: v.string(),
		website: v.optional(v.string()),
		socialMedia: v.optional(v.string()),

		// HR/Recruiter Info
		hrName: v.string(),
		hrEmail: v.string(),
		hrPhone: v.string(),

		// Verification & Media
		registrationNumber: v.optional(v.string()),
		logoUrl: v.optional(v.string()),

		// Metadata
		createdAt: v.number(),
		updatedAt: v.number(),
		isVerified: v.boolean(),
		isActive: v.boolean(),
	})
		.index('by_companyId', ['companyId'])
		.index('by_email', ['email'])
		.index('by_name', ['name']),

	colleges: defineTable({
		// Basic Information
		name: v.string(),
		collegeId: v.string(), // Unique college ID/code for login
		collegeType: v.union(
			v.literal('Government'),
			v.literal('Private'),
			v.literal('Autonomous')
		),
		affiliatedUniversity: v.string(),
		accreditation: v.optional(v.string()),
		description: v.optional(v.string()),

		// Location Details
		address: v.string(),
		city: v.string(),
		state: v.union(
			v.literal('Tamil Nadu'),
			v.literal('Karnataka'),
			v.literal('Maharashtra')
		),
		country: v.union(
			v.literal('India'),
			v.literal('USA'),
			v.literal('UK')
		),
		zipCode: v.string(),

		// Contact Details
		email: v.string(),
		phone: v.string(),
		website: v.optional(v.string()),

		// Key Personnel
		principalName: v.string(),
		placementOfficerName: v.string(),
		placementEmail: v.string(),
		placementPhone: v.string(),

		// Academic Details
		totalDepartments: v.optional(v.string()),
		coursesOffered: v.optional(v.array(v.string())),

		// Media
		logoUrl: v.optional(v.string()),

		// Metadata
		createdAt: v.number(),
		updatedAt: v.number(),
		isVerified: v.boolean(),
		isActive: v.boolean(),
	})
		.index('by_collegeId', ['collegeId'])
		.index('by_email', ['email'])
		.index('by_name', ['name']),

	// Session management for login
	sessions: defineTable({
		companyId: v.optional(v.id('companies')),
		collegeId: v.optional(v.id('colleges')),
		token: v.string(),
		createdAt: v.number(),
		expiresAt: v.number(),
		isActive: v.boolean(),
	})
		.index('by_token', ['token'])
		.index('by_companyId', ['companyId'])
		.index('by_collegeId', ['collegeId'])
		.index('by_expiresAt', ['expiresAt']),

	students: defineTable({
		name: v.string(),
		rollNumber: v.string(),
		email: v.string(),
		phone: v.string(),
		department: v.string(),
		year: v.string(),
		collegeId: v.id('colleges'),
		skills: v.optional(v.string()),
		resume: v.optional(v.string()),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index('by_collegeId', ['collegeId'])
		.index('by_email', ['email']),

	jobs: defineTable({
		title: v.string(),
		description: v.string(),
		location: v.string(),
		salary: v.string(),
		skillsRequired: v.string(),
		companyId: v.id('companies'),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index('by_companyId', ['companyId'])
}) 