import SignOutBtn from "@/components/auth/SignOutBtn";
import { getUserAuth } from "@/lib/auth/utils";
import CandidateUpload from "./CandidateUpload";
export default async function Home() {
  const { session } = await getUserAuth();
  console.log(session?.candidateId);
  return (
    <main className="">
      <h1 className="text-2xl font-bold my-2">Profile</h1>
      <pre className="bg-secondary p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre>
      <CandidateUpload/>
      <SignOutBtn />
    </main>
  );
}