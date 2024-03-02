import * as z from "zod"
import { CompleteInteraction, relatedInteractionSchema } from "./index"

export const eventSchema = z.object({
  eventId: z.string(),
  hrLead: z.string().nullish(),
  date: z.date().nullish(),
  location: z.string().nullish(),
  description: z.string().nullish(),
  title: z.string().nullish(),
})

export interface CompleteEvent extends z.infer<typeof eventSchema> {
  interactions: CompleteInteraction[]
}

/**
 * relatedEventSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedEventSchema: z.ZodSchema<CompleteEvent> = z.lazy(() => eventSchema.extend({
  interactions: relatedInteractionSchema.array(),
}))
