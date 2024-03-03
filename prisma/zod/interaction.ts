import * as z from "zod"
import { CompleteCandidate, relatedCandidateSchema, CompleteEvent, relatedEventSchema } from "./index"

export const interactionSchema = z.object({
  interactionId: z.string(),
  eventId: z.string().nullish(),
  candidateId: z.string().nullish(),
  notes: z.string().nullish(),
  sentimentScore: z.number().nullish(),
})

export interface CompleteInteraction extends z.infer<typeof interactionSchema> {
  candidate?: CompleteCandidate | null
  event?: CompleteEvent | null
}

/**
 * relatedInteractionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedInteractionSchema: z.ZodSchema<CompleteInteraction> = z.lazy(() => interactionSchema.extend({
  candidate: relatedCandidateSchema.nullish(),
  event: relatedEventSchema.nullish(),
}))
