import SignOutBtn from "@/components/auth/SignOutBtn";
import { getUserAuth } from "@/lib/auth/utils";
import CandidateUpload from "./CandidateUpload";
import { candidateSchema } from "@/prisma/zod";
export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="">
      <h1 className="text-2xl font-bold my-2">Profile</h1>
      <pre className="bg-secondary p-4 rounded-lg my-2">
        
        ID: {session?.user.id}
        <br />
        Email: {session?.user.email}
        <br />
        {/* Phone: {candidateSchema.phone} */}
        
      </pre>
      <CandidateUpload/>
      <SignOutBtn />
    </main>
  );
}