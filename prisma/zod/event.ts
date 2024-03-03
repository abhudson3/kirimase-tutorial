import * as z from "zod"
import { CompleteEmployee, relatedEmployeeSchema, CompleteInteraction, relatedInteractionSchema } from "./index"

export const eventSchema = z.object({
  eventId: z.string(),
  hrLeadId: z.string().nullish(),
  date: z.date().nullish(),
  location: z.string().nullish(),
  description: z.string().nullish(),
  title: z.string().nullish(),
})

export interface CompleteEvent extends z.infer<typeof eventSchema> {
  hrLead?: CompleteEmployee | null
  interactions: CompleteInteraction[]
}

/**
 * relatedEventSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedEventSchema: z.ZodSchema<CompleteEvent> = z.lazy(() => eventSchema.extend({
  hrLead: relatedEmployeeSchema.nullish(),
  interactions: relatedInteractionSchema.array(),
}))
