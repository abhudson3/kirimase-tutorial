import * as z from "zod"
import { CompleteCandidate, relatedCandidateSchema, CompleteEmployee, relatedEmployeeSchema, CompleteSession, relatedSessionSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  hashedPassword: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  candidate: CompleteCandidate[]
  employee: CompleteEmployee[]
  sessions: CompleteSession[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  candidate: relatedCandidateSchema.array(),
  employee: relatedEmployeeSchema.array(),
  sessions: relatedSessionSchema.array(),
}))
