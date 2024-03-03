import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  candidateId: z.string().nullish(),
  employeeId: z.string().nullish(),
  expiresAt: z.date(),
  candidateId: z.string().nullish(),
  employeeId: z.string().nullish(),
})

export interface CompleteSession extends z.infer<typeof sessionSchema> {
  user: CompleteUser
}

/**
 * relatedSessionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSessionSchema: z.ZodSchema<CompleteSession> = z.lazy(() => sessionSchema.extend({
  user: relatedUserSchema,
}))
