import SignOutBtn from "@/components/auth/SignOutBtn";
import LinkButton from "@/components/ui/LinkButton";
import { getUserAuth } from "@/lib/auth/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default async function DashboardPage() {
  const { session } = await getUserAuth();
  console.log(session)
  return (
    <main className="">

    <Card className={("w-[380px]")}>
      <CardHeader>
        <CardTitle>{session?.user.firstName} {session?.user.lastName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Email: {session?.user.email}</p>
      </CardContent>
    </Card>



    <br />
        
      <LinkButton to="/event" label="Events"/> <LinkButton to="/candidate" label="See Candidates" />
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
