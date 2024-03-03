import UserSettings from "./UserSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import CandidateUpload from "./CandidateUpload";
import { db } from "@/lib/db";
export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();
  const currentResumeUrl = await db?.candidate.findUnique({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="space-y-4">
      <CandidateUpload
      // @ts-ignore
      currentResumeUrl={currentResumeUrl?.resumeUrl}
      // @ts-ignore
        userId={session?.user.id ?? null}
      />
        <UserSettings session={session} />
      </div>
    </main>
  );
}
