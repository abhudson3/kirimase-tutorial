import SignOutBtn from "@/components/auth/SignOutBtn";
import LinkButton from "@/components/ui/LinkButton";
import { getUserAuth } from "@/lib/auth/utils";

export default async function DashboardPage() {
  const { session } = await getUserAuth();
  const employee = db?.employee.findFirst({
    where: { userId: session?.user.id }
  })
  return (
    <main className="">
      <h1 className="text-2xl font-bold my-2">Profile</h1>
        
        ID: {session?.user.id}
        <br />
        Email: {session?.user.email}
        <br />
        {/* Phone: {candidateSchema.phone} */}
        
      <LinkButton to="/event/create" label="Create Event"/>
      <LinkButton to="/candidate" label="See Candidates" />
    </main>
  );
}


// function SignOutBtn() {
//   return (
//     <form action={signOutAction} className="w-full text-left">
//       <Btn />
//     </form>
//   );
// }

// const Btn = () => {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending} variant={"destructive"}>
//       Sign{pending ? "ing" : ""} out
//     </Button>
//   );
// };
