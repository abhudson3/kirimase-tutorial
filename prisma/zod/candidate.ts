import * as z from "zod"
import { CompleteApplication, relatedApplicationSchema, CompleteUser, relatedUserSchema, CompleteInteraction, relatedInteractionSchema } from "./index"

export const candidateSchema = z.object({
  candidateId: z.string(),
  applicationId: z.string().nullish(),
  userId: z.string().nullish(),
  resumeUrl: z.string(),
  phone: z.string(),
  linkedIn: z.string(),
})

export interface CompleteCandidate extends z.infer<typeof candidateSchema> {
  applications: CompleteApplication[]
  user?: CompleteUser | null
  interactions: CompleteInteraction[]
}

/**
 * relatedCandidateSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCandidateSchema: z.ZodSchema<CompleteCandidate> = z.lazy(() => candidateSchema.extend({
  applications: relatedApplicationSchema.array(),
  user: relatedUserSchema.nullish(),
  interactions: relatedInteractionSchema.array(),
}))
