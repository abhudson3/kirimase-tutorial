import * as z from "zod"
import { CompleteOffice, relatedOfficeSchema, CompleteUser, relatedUserSchema, CompleteEvent, relatedEventSchema } from "./index"

export const employeeSchema = z.object({
  employeeId: z.string(),
  homeOfficeId: z.string().nullish(),
  userId: z.string().nullish(),
  position: z.string().nullish(),
})

export interface CompleteEmployee extends z.infer<typeof employeeSchema> {
  homeOffice?: CompleteOffice | null
  user?: CompleteUser | null
  Event: CompleteEvent[]
}

/**
 * relatedEmployeeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedEmployeeSchema: z.ZodSchema<CompleteEmployee> = z.lazy(() => employeeSchema.extend({
  homeOffice: relatedOfficeSchema.nullish(),
  user: relatedUserSchema.nullish(),
  Event: relatedEventSchema.array(),
}))
