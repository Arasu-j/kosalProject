import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Types for college registration
export interface CollegeRegistrationData {
	// Basic Information
	name: string
	collegeId: string
	collegeType: 'Government' | 'Private' | 'Autonomous'
	affiliatedUniversity: string
	accreditation?: string
	description?: string

	// Location Details
	address: string
	city: string
	state: 'Tamil Nadu' | 'Karnataka' | 'Maharashtra'
	country: 'India' | 'USA' | 'UK'
	zipCode: string

	// Contact Details
	email: string
	phone: string
	website?: string

	// Key Personnel
	principalName: string
	placementOfficerName: string
	placementEmail: string
	placementPhone: string

	// Academic Details
	totalDepartments?: string
	coursesOffered?: string[]

	// Media
	logoUrl?: string
}

// Register a new college
export const registerCollege = mutation({
	args: {
		data: v.object({
			name: v.string(),
			collegeId: v.string(),
			collegeType: v.union(
				v.literal('Government'),
				v.literal('Private'),
				v.literal('Autonomous')
			),
			affiliatedUniversity: v.string(),
			accreditation: v.optional(v.string()),
			description: v.optional(v.string()),
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
			email: v.string(),
			phone: v.string(),
			website: v.optional(v.string()),
			principalName: v.string(),
			placementOfficerName: v.string(),
			placementEmail: v.string(),
			placementPhone: v.string(),
			totalDepartments: v.optional(v.string()),
			coursesOffered: v.optional(v.array(v.string())),
			logoUrl: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		const { data } = args

		console.log('College registration attempt:', data)

		// Check if college ID already exists
		const existingCollege = await ctx.db
			.query('colleges')
			.withIndex('by_collegeId', (q) => q.eq('collegeId', data.collegeId))
			.first()

		console.log('Existing college check:', existingCollege)

		if (existingCollege) {
			throw new Error('College ID already exists in database')
		}

		// Check if email already exists
		const existingEmail = await ctx.db
			.query('colleges')
			.withIndex('by_email', (q) => q.eq('email', data.email))
			.first()

		console.log('Existing email check:', existingEmail)

		if (existingEmail) {
			throw new Error('Email already registered in database')
		}

		// Create new college
		const collegeId = await ctx.db.insert('colleges', {
			...data,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			isVerified: false,
			isActive: true,
		})

		console.log('College created with ID:', collegeId)

		return {
			success: true,
			collegeId,
			message: 'College registered successfully',
		}
	},
})

// Login college
export const loginCollege = mutation({
	args: {
		collegeId: v.string(),
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const { collegeId, name } = args

		console.log('College login attempt:', { collegeId, name })

		// Find college by ID and name
		const college = await ctx.db
			.query('colleges')
			.withIndex('by_collegeId', (q) => q.eq('collegeId', collegeId))
			.first()

		console.log('Found college:', college)

		if (!college) {
			throw new Error('College ID not present in database')
		}

		console.log('Comparing names:', { 
			stored: college.name, 
			provided: name, 
			storedLower: college.name.toLowerCase(), 
			providedLower: name.toLowerCase() 
		})

		if (college.name.toLowerCase() !== name.toLowerCase()) {
			throw new Error('College name not present in database')
		}

		if (!college.isActive) {
			throw new Error('College account is deactivated')
		}

		// Generate session token
		const token = generateToken()
		const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

		// Create session
		const sessionId = await ctx.db.insert('sessions', {
			collegeId: college._id,
			token,
			createdAt: Date.now(),
			expiresAt,
			isActive: true,
		})

		return {
			success: true,
			token,
			college: {
				id: college._id,
				name: college.name,
				collegeId: college.collegeId,
				email: college.email,
			},
			expiresAt,
		}
	},
})

// Validate college session token
export const validateCollegeSession = query({
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

		if (!session.collegeId) {
			return null
		}

		const college = await ctx.db.get(session.collegeId)
		if (!college || !college.isActive) {
			return null
		}

		return {
			college: {
				id: college._id,
				name: college.name,
				collegeId: college.collegeId,
				email: college.email,
			},
			sessionId: session._id,
		}
	},
})

// Logout college
export const logoutCollege = mutation({
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

// Get college profile
export const getCollegeProfile = query({
	args: {
		collegeId: v.id('colleges'),
	},
	handler: async (ctx, args) => {
		const college = await ctx.db.get(args.collegeId)
		if (!college) {
			throw new Error('College not found')
		}

		return college
	},
})

// Update college profile
export const updateCollegeProfile = mutation({
	args: {
		collegeId: v.id('colleges'),
		data: v.object({
			name: v.optional(v.string()),
			collegeType: v.optional(
				v.union(
					v.literal('Government'),
					v.literal('Private'),
					v.literal('Autonomous')
				)
			),
			affiliatedUniversity: v.optional(v.string()),
			accreditation: v.optional(v.string()),
			description: v.optional(v.string()),
			address: v.optional(v.string()),
			city: v.optional(v.string()),
			state: v.optional(
				v.union(
					v.literal('Tamil Nadu'),
					v.literal('Karnataka'),
					v.literal('Maharashtra')
				)
			),
			country: v.optional(
				v.union(
					v.literal('India'),
					v.literal('USA'),
					v.literal('UK')
				)
			),
			zipCode: v.optional(v.string()),
			phone: v.optional(v.string()),
			website: v.optional(v.string()),
			principalName: v.optional(v.string()),
			placementOfficerName: v.optional(v.string()),
			placementEmail: v.optional(v.string()),
			placementPhone: v.optional(v.string()),
			totalDepartments: v.optional(v.string()),
			coursesOffered: v.optional(v.array(v.string())),
			logoUrl: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		const { collegeId, data } = args

		await ctx.db.patch(collegeId, {
			...data,
			updatedAt: Date.now(),
		})

		return { success: true }
	},
})

// Debug function to list all colleges
export const listColleges = query({
	handler: async (ctx) => {
		const colleges = await ctx.db.query('colleges').collect()
		return colleges.map(c => ({
			id: c._id,
			name: c.name,
			collegeId: c.collegeId,
			email: c.email,
			createdAt: c.createdAt
		}))
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