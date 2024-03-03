import * as z from "zod"
import { CompleteCandidate, relatedCandidateSchema, CompleteOffice, relatedOfficeSchema } from "./index"

export const interestedOfficeSchema = z.object({
  interestedOfficeId: z.string(),
  officeId: z.string(),
  candidateId: z.string(),
})

export interface CompleteInterestedOffice extends z.infer<typeof interestedOfficeSchema> {
  candidate: CompleteCandidate
  office: CompleteOffice
}

/**
 * relatedInterestedOfficeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedInterestedOfficeSchema: z.ZodSchema<CompleteInterestedOffice> = z.lazy(() => interestedOfficeSchema.extend({
  candidate: relatedCandidateSchema,
  office: relatedOfficeSchema,
}))
