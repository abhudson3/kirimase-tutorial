"use client";
import UpdateNameCard from "./UpdateNameCard";
import UpdateEmailCard from "./UpdateEmailCard";
import { AuthSession } from "@/lib/auth/utils";

export default function UserSettings({
  session,
}: {
  session: AuthSession["session"];
}) {
  // console.log(session?.user.firstName)
  // console.log('break')
  // console.log(session)
  return (
    <>
      <UpdateNameCard firstName={session?.user.firstName ?? ""} lastName={session?.user.lastName ?? ""} />
      <UpdateEmailCard email={session?.user.email ?? ""} />
    </>
  );
}
