import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Id } from './_generated/dataModel'

export interface StudentData {
	name: string
	rollNumber: string
	email: string
	phone: string
	department: string
	year: string
	collegeId: Id<'colleges'>
	skills?: string
	resume?: string
}

export const addStudent = mutation({
	args: {
		name: v.string(),
		rollNumber: v.string(),
		email: v.string(),
		phone: v.string(),
		department: v.string(),
		year: v.string(),
		collegeId: v.id('colleges'),
		skills: v.optional(v.string()),
		resume: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const id = await ctx.db.insert('students', {
			...args,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
		return { success: true, id }
	},
})

export const getStudentsByCollege = query({
	args: {
		collegeId: v.id('colleges'),
	},
	handler: async (ctx, args) => {
		const students = await ctx.db
			.query('students')
			.withIndex('by_collegeId', (q) => q.eq('collegeId', args.collegeId))
			.collect()
		return students
	},
})

export const listAllStudents = query({
	handler: async (ctx) => {
		const students = await ctx.db.query('students').collect()
		return students
	},
}) 