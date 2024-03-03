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


export async function updateCandidateAction(
    _: ActionResult,
    formData: FormData
)   {

    const data: any = Object.fromEntries(formData)

    try {

   console.log(data);
// @ts-ignore
   await db.candidate.update({
    where: {
        candidateId: data.candidateId
    },
    data: {
        linkedIn: data.linkedIn,
        phone: data.phone,
        university: data.university
    }
   })

   // @ts-ignore
   await db.user.update({
    where: {
        id: data.userId,
    },
    data: {
        email: data.email,
        
        
    }
   })
    

    return {message: "success"} 

    } catch (e) {
        console.log(e);

        return genericError
    }
}