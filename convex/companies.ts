import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Id } from './_generated/dataModel'

// Types for company registration
export interface CompanyRegistrationData {
	// Basic Information
	name: string
	companyId: string
	companyType: 'Product' | 'Service' | 'Consultancy' | 'Startup'
	industrySector: 'IT' | 'Finance' | 'Healthcare' | 'EdTech'
	companySize: '1-10' | '11-50' | '51-200' | '201-500' | '500+'
	description?: string

	// Location Details
	address: string
	city: string
	state: 'Tamil Nadu' | 'Karnataka'
	country: 'India' | 'USA'
	zipCode: string

	// Contact Details
	email: string
	phone: string
	website?: string
	socialMedia?: string

	// HR/Recruiter Info
	hrName: string
	hrEmail: string
	hrPhone: string

	// Verification & Media
	registrationNumber?: string
	logoUrl?: string
}

// Register a new company
export const registerCompany = mutation({
	args: {
		data: v.object({
			name: v.string(),
			companyId: v.string(),
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
			email: v.string(),
			phone: v.string(),
			website: v.optional(v.string()),
			socialMedia: v.optional(v.string()),
			hrName: v.string(),
			hrEmail: v.string(),
			hrPhone: v.string(),
			registrationNumber: v.optional(v.string()),
			logoUrl: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		const { data } = args

		console.log('Registration attempt:', data)

		// Check if company ID already exists
		const existingCompany = await ctx.db
			.query('companies')
			.withIndex('by_companyId', (q) => q.eq('companyId', data.companyId))
			.first()

		console.log('Existing company check:', existingCompany)

		if (existingCompany) {
			throw new Error('Company ID already exists in database')
		}

		// Check if email already exists
		const existingEmail = await ctx.db
			.query('companies')
			.withIndex('by_email', (q) => q.eq('email', data.email))
			.first()

		console.log('Existing email check:', existingEmail)

		if (existingEmail) {
			throw new Error('Email already registered in database')
		}

		// Create new company
		const companyId = await ctx.db.insert('companies', {
			...data,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			isVerified: false,
			isActive: true,
		})

		console.log('Company created with ID:', companyId)

		return {
			success: true,
			companyId,
			message: 'Company registered successfully',
		}
	},
})

// Login company
export const loginCompany = mutation({
	args: {
		companyId: v.string(),
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const { companyId, name } = args

		console.log('Login attempt:', { companyId, name })

		// Find company by ID and name
		const company = await ctx.db
			.query('companies')
			.withIndex('by_companyId', (q) => q.eq('companyId', companyId))
			.first()

		console.log('Found company:', company)

		if (!company) {
			throw new Error('Company ID not present in database')
		}

		console.log('Comparing names:', { 
			stored: company.name, 
			provided: name, 
			storedLower: company.name.toLowerCase(), 
			providedLower: name.toLowerCase() 
		})

		if (company.name.toLowerCase() !== name.toLowerCase()) {
			throw new Error('Company name not present in database')
		}

		if (!company.isActive) {
			throw new Error('Company account is deactivated')
		}

		// Generate session token
		const token = generateToken()
		const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

		// Create session
		const sessionId = await ctx.db.insert('sessions', {
			companyId: company._id,
			token,
			createdAt: Date.now(),
			expiresAt,
			isActive: true,
		})

		return {
			success: true,
			token,
			company: {
				id: company._id,
				name: company.name,
				companyId: company.companyId,
				email: company.email,
			},
			expiresAt,
		}
	},
})

// Validate session token
export const validateSession = query({
	args: {
		token: v.string(),
	},
	handler: async (ctx, args) => {
		const { token } = args

		const session = await ctx.db
			.query('sessions')
			.withIndex('by_token', (q) => q.eq('token', token))
			.first()

		if (!session || !session.isActive || session.expiresAt < Date.now()) {
			return null
		}

		if (!session.companyId) {
			return null
		}

		const company = await ctx.db.get(session.companyId)
		if (!company || !company.isActive) {
			return null
		}

		return {
			company: {
				id: company._id,
				name: company.name,
				companyId: company.companyId,
				email: company.email,
			},
			sessionId: session._id,
		}
	},
})

// Logout company
export const logoutCompany = mutation({
	args: {
		token: v.string(),
	},
	handler: async (ctx, args) => {
		const { token } = args

		const session = await ctx.db
			.query('sessions')
			.withIndex('by_token', (q) => q.eq('token', token))
			.first()

		if (session) {
			await ctx.db.patch(session._id, { isActive: false })
		}

		return { success: true }
	},
})

// Get company profile
export const getCompanyProfile = query({
	args: {
		companyId: v.id('companies'),
	},
	handler: async (ctx, args) => {
		const company = await ctx.db.get(args.companyId)
		if (!company) {
			throw new Error('Company not found')
		}

		return company
	},
})

// Update company profile
export const updateCompanyProfile = mutation({
	args: {
		companyId: v.id('companies'),
		data: v.object({
			name: v.optional(v.string()),
			companyType: v.optional(
				v.union(
					v.literal('Product'),
					v.literal('Service'),
					v.literal('Consultancy'),
					v.literal('Startup')
				)
			),
			industrySector: v.optional(
				v.union(
					v.literal('IT'),
					v.literal('Finance'),
					v.literal('Healthcare'),
					v.literal('EdTech')
				)
			),
			companySize: v.optional(
				v.union(
					v.literal('1-10'),
					v.literal('11-50'),
					v.literal('51-200'),
					v.literal('201-500'),
					v.literal('500+')
				)
			),
			description: v.optional(v.string()),
			address: v.optional(v.string()),
			city: v.optional(v.string()),
			state: v.optional(
				v.union(
					v.literal('Tamil Nadu'),
					v.literal('Karnataka')
				)
			),
			country: v.optional(
				v.union(
					v.literal('India'),
					v.literal('USA')
				)
			),
			zipCode: v.optional(v.string()),
			email: v.optional(v.string()),
			phone: v.optional(v.string()),
			website: v.optional(v.string()),
			socialMedia: v.optional(v.string()),
			hrName: v.optional(v.string()),
			hrEmail: v.optional(v.string()),
			hrPhone: v.optional(v.string()),
			registrationNumber: v.optional(v.string()),
			logoUrl: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.companyId, {
			...args.data,
			updatedAt: Date.now(),
		})
		return { success: true }
	},
})

// Debug function to list all companies
export const listCompanies = query({
	handler: async (ctx) => {
		const companies = await ctx.db.query('companies').order('desc').collect()
		return companies
	},
})

// Helper function to generate token
function generateToken(): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < 32; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length))
	}
	return result
}

export const postJob = mutation({
	args: {
		title: v.string(),
		description: v.string(),
		location: v.string(),
		salary: v.string(),
		skillsRequired: v.string(),
		companyId: v.id('companies'),
	},
	handler: async (ctx, args) => {
		const id = await ctx.db.insert('jobs', {
			...args,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
		return { success: true, id }
	},
})

export const listJobs = query({
	handler: async (ctx) => {
		const jobs = await ctx.db.query('jobs').order('desc').collect()
		return jobs
	},
})

export const listJobsByCompany = query({
	args: {
		companyId: v.id('companies'),
	},
	handler: async (ctx, args) => {
		const jobs = await ctx.db
			.query('jobs')
			.withIndex('by_companyId', (q) => q.eq('companyId', args.companyId))
			.collect()
		return jobs
	},
}) 