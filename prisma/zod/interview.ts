import * as z from "zod"
import { CompleteCandidate, relatedCandidateSchema } from "./index"

export const interviewSchema = z.object({
  interviewId: z.string(),
  interviewerId: z.string().nullish(),
  candidateId: z.string(),
  notes: z.string().nullish(),
  interviewDateTime: z.date(),
  sentimentScore: z.number().nullish(),
  interviewRound: z.string().nullish(),
})

export interface CompleteInterview extends z.infer<typeof interviewSchema> {
  candidate: CompleteCandidate
}

/**
 * relatedInterviewSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedInterviewSchema: z.ZodSchema<CompleteInterview> = z.lazy(() => interviewSchema.extend({
  candidate: relatedCandidateSchema,
}))
