import * as z from "zod"
import { CompleteEmployee, relatedEmployeeSchema, CompleteInterestedOffice, relatedInterestedOfficeSchema } from "./index"

export const officeSchema = z.object({
  officeId: z.string(),
  city: z.string().nullish(),
  state: z.string().nullish(),
})

export interface CompleteOffice extends z.infer<typeof officeSchema> {
  employees: CompleteEmployee[]
  interestedOffices: CompleteInterestedOffice[]
}

/**
 * relatedOfficeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOfficeSchema: z.ZodSchema<CompleteOffice> = z.lazy(() => officeSchema.extend({
  employees: relatedEmployeeSchema.array(),
  interestedOffices: relatedInterestedOfficeSchema.array(),
}))
