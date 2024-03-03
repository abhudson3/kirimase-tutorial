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
      <pre className="bg-secondary p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre>
      <LinkButton to="/event/create" label="Create Event"/>
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
