import * as z from "zod"
import { CompleteInterestedOffice, relatedInterestedOfficeSchema, CompleteEmployee, relatedEmployeeSchema } from "./index"

export const officeSchema = z.object({
  officeId: z.string(),
  city: z.string().nullish(),
  state: z.string().nullish(),
})

export interface CompleteOffice extends z.infer<typeof officeSchema> {
  interestedOffices: CompleteInterestedOffice[]
  employees: CompleteEmployee[]
}

/**
 * relatedOfficeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOfficeSchema: z.ZodSchema<CompleteOffice> = z.lazy(() => officeSchema.extend({
  interestedOffices: relatedInterestedOfficeSchema.array(),
  employees: relatedEmployeeSchema.array(),
}))
