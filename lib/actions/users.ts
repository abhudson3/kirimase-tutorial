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

export async function signInAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { data, error } = validateAuthFormData(formData)
  if (error !== null) return { error }

  try {
    const existingUser = await db.user.findUnique({
      where: { email: data.email.toLowerCase() },
      include: {
        candidate: true,
        employee: true
      }
    })
    if (!existingUser) {
      return {
        error: 'Incorrect username or password',
      }
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      data.password
    )
    if (!validPassword) {
      return {
        error: 'Incorrect username or password',
      }
    }

    
    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    setAuthCookie(sessionCookie);

    if (existingUser.employee) return redirect("/dashboard")

    if (existingUser.candidate) return redirect("/account")

    return { error: "User is neither employee or candidate" }
  } catch (e) {
    console.log(e);
    
    return genericError
  }
}

export async function signUpAction(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const { error } = validateAuthFormData(formData)
  const data: any = Object.fromEntries(formData)

  if (error !== null) return { error }

  console.log(data);

  // @ts-ignore
  if (data.password !== data.rePassword) return { error: "Passwords must match" }

  log(data)

  const hashedPassword = await new Argon2id().hash(data.password)
  const userId = generateId(15)

  console.log("About to save");

  let user;
  try {
    await db.user.create({
      data: {
        id: userId,
        email: data.email,
        hashedPassword,
      },
    })
  } catch (e) {
    console.log(e);

    return genericError
  }
  console.log(user)
  try {
    if (data.role === "candidate") {
      await db.candidate.create({
        data: {
          candidateId: generateId(15),
          userId
        }
      })
    } else {
      await db.employee.create({
        data: {
          employeeId: generateId(15),
          userId
        }
      })
    }
  } catch (e) {
    console.log(e);
    return genericError
  }

  console.log("after saving");


  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  setAuthCookie(sessionCookie)
  return redirect("/account")
}

export async function signOutAction(): Promise<ActionResult> {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  setAuthCookie(sessionCookie)
  redirect('/sign-in')
}

export async function updateUser(
  _: any,
  formData: FormData,
): Promise<ActionResult & { success?: boolean }> {
  const { session } = await getUserAuth();
  if (!session) return { error: "Unauthorised" };
  const firstName = formData.get("firstName") ?? undefined;
  const lastName = formData.get("lastName") ?? undefined;
  const email = formData.get("email") ?? undefined;

  const result = updateUserSchema.safeParse({ firstName, lastName, email });

  if (!result.success) {
    const error = result.error.flatten().fieldErrors;
    if (error.firstName) return { error: "Invalid first name - " + error.firstName[0] };
    if (error.lastName) return { error: "Invalid last name - " + error.lastName[0] };
    if (error.email) return { error: "Invalid email - " + error.email[0] };
    return genericError;
  }
  console.log("firstName: ",firstName, "lastName: ", lastName )

  try {
    let data = await db.user.update({
      data: { 
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email
      },
      where: { id: session.user.id },
    });
    console.log("postupdate", data)
    revalidatePath("/account");
    return { success: true, error: "" };
  } catch (e) {
    return genericError;
  }
}


