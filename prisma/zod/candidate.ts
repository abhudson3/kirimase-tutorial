import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteInteraction, relatedInteractionSchema, CompleteInterestedOffice, relatedInterestedOfficeSchema, CompleteInterview, relatedInterviewSchema } from "./index"

export const candidateSchema = z.object({
  candidateId: z.string(),
  userId: z.string().nullish(),
  resumeUrl: z.string().nullish(),
  phone: z.string().nullish(),
  linkedIn: z.string().nullish(),
  university: z.string().nullish(),
})

export interface CompleteCandidate extends z.infer<typeof candidateSchema> {
  user?: CompleteUser | null
  interactions: CompleteInteraction[]
  InterestedOffice: CompleteInterestedOffice[]
  Interview: CompleteInterview[]
}

/**
 * relatedCandidateSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCandidateSchema: z.ZodSchema<CompleteCandidate> = z.lazy(() => candidateSchema.extend({
  user: relatedUserSchema.nullish(),
  interactions: relatedInteractionSchema.array(),
  InterestedOffice: relatedInterestedOfficeSchema.array(),
  Interview: relatedInterviewSchema.array(),
}))
