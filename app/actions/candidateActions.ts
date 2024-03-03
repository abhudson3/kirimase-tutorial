"use server";
import { db } from "@/lib/db/index";
import { json } from "stream/consumers";
// @ts-ignore
export async function SetResume( userId, resumeUrl) {
  "use server";

  console.log("Set resuem");
  
  console.log(resumeUrl);
  console.log(userId);
  let response = await db.candidate.update({
    where: { userId },
    data: {
      resumeUrl,
    },
  });
  console.log(response);
  //   console.log(response);
}
