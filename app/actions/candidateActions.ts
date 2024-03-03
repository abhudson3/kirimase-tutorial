"use server";
import { db } from "@/lib/db/index";
import { revalidatePath } from "next/cache";
import { json } from "stream/consumers";
// @ts-ignore
export async function SetResume( userId, resumeUrl) {
  "use server";

  console.log(resumeUrl);
  console.log(userId);
  let response = await db.candidate.update({
    where: { userId },
    data: {
      resumeUrl,
    },
  });
  console.log(response);
  revalidatePath("/")
  //   console.log(response);
}
export async function GetAllCandidates(){
  "use server"
  let response = await db.candidate.findMany({})
  return response
}