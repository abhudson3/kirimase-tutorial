import * as z from "zod"
import { CompleteApplication, relatedApplicationSchema, CompleteOffice, relatedOfficeSchema } from "./index"

export const interestedOfficeSchema = z.object({
  interestedOfficeId: z.string(),
  officeId: z.string(),
  applicationId: z.string(),
})

export interface CompleteInterestedOffice extends z.infer<typeof interestedOfficeSchema> {
  application: CompleteApplication
  office: CompleteOffice
}

/**
 * relatedInterestedOfficeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedInterestedOfficeSchema: z.ZodSchema<CompleteInterestedOffice> = z.lazy(() => interestedOfficeSchema.extend({
  application: relatedApplicationSchema,
  office: relatedOfficeSchema,
}))
