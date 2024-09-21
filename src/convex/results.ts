import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: {},
  handler: async (ctx) => {
    const results = await ctx.db.query('results').collect()
    return results.sort((a, b) => b.correctAnswerCount - a.correctAnswerCount)
  },
})

export const create = mutation({
  args: {
    userName: v.string(),
    questionCount: v.number(),
    correctAnswerCount: v.number(),
    correctAnswerPercent: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new ConvexError('Unauthorized')
    }

    return await ctx.db.insert('results', {
      userId: identity.tokenIdentifier,
      userName: args.userName,
      questionCount: args.questionCount,
      correctAnswerCount: args.correctAnswerCount,
      correctAnswerPercent: args.correctAnswerPercent,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('results'),
    userName: v.string(),
    questionCount: v.number(),
    correctAnswerCount: v.number(),
    correctAnswerPercent: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new ConvexError('Unauthorized')
    }

    const result = await ctx.db.get(args.id)
    if (!result) {
      throw new ConvexError('Result not found')
    }

    await ctx.db.patch(args.id, {
      userId: identity.tokenIdentifier,
      userName: args.userName,
      questionCount: args.questionCount,
      correctAnswerCount: args.correctAnswerCount,
      correctAnswerPercent: args.correctAnswerPercent,
    })

    return args.id
  },
})
