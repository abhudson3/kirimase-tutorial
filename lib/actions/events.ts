'use server'


import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'

import { db } from "@/lib/db/index";

import { Argon2id } from 'oslo/password'
import { generateId } from 'lucia'
import { lucia, validateRequest } from '../auth/lucia'
import {
    genericError,
    setAuthCookie,
    validateAuthFormData,
    getUserAuth,
} from '../auth/utils'

import { updateUserSchema } from "../db/schema/auth";
import { log } from "console";

interface ActionResult {
    error: string
}

export async function createEventAction(
    _: ActionResult,
    formData: FormData
)   {

    const data: any = Object.fromEntries(formData)

    try {

        await db.event.create({
            data: {
                eventId: generateId(15),
                date: new Date(data.date),
                description: data.description,
                hrLead: data.hrLeadId,
                location: data.location,
                title: data.title
            }
        })

    return {message: "success"} 

    } catch (e) {
        console.log(e);

        return genericError
    }
}

export async function createEventInteraction(
    _: ActionResult,
    formData: FormData
)   {

    const data: any = Object.fromEntries(formData)

    try {

        await db.interaction.create({
            data: {
                interactionId: generateId(15),
                candidateId: data.candidateId,
                 eventId: data.eventId,
                 notes: data.notes,
                 sentimentScore: parseInt(data.sentimentScore)
            }
        })

    return {message: "success"} 

    } catch (e) {
        console.log(e);

        return genericError
    }
}