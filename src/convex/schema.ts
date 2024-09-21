import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  results: defineTable({
    userId: v.string(),
    userName: v.string(),
    questionCount: v.number(),
    correctAnswerCount: v.number(),
    correctAnswerPercent: v.number(),
  }),
})
