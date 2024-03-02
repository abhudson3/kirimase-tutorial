import * as z from "zod"
import { CompleteCandidate, relatedCandidateSchema, CompleteInterestedOffice, relatedInterestedOfficeSchema, CompleteInterview, relatedInterviewSchema } from "./index"

export const applicationSchema = z.object({
  applicationId: z.string(),
  candidateId: z.string(),
  potentialStartDate: z.date(),
  applicationType: z.string(),
  finalDecision: z.string().nullish(),
  university: z.string().nullish(),
})

export interface CompleteApplication extends z.infer<typeof applicationSchema> {
  candidate: CompleteCandidate
  interestedOffices: CompleteInterestedOffice[]
  interviews: CompleteInterview[]
}

/**
 * relatedApplicationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedApplicationSchema: z.ZodSchema<CompleteApplication> = z.lazy(() => applicationSchema.extend({
  candidate: relatedCandidateSchema,
  interestedOffices: relatedInterestedOfficeSchema.array(),
  interviews: relatedInterviewSchema.array(),
}))
