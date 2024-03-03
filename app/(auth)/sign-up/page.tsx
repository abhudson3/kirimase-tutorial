"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

import { signUpAction } from "@/lib/actions/users";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthFormError from "@/components/auth/AuthFormError";


export default function SignUpPage() {
  const [state, formAction] = useFormState(signUpAction, {
    error: "",
  });

  return (
    <main className="max-w-lg mx-auto my-4 bg-popover p-10">
      <h1 className="text-2xl font-bold text-center">Create an account</h1>
      <AuthFormError state={state} />
      <form action={formAction}>
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <Input name="email" type="email" id="email" required />
        <br />

        <Label htmlFor="password" className="text-muted-foreground">
          Password
        </Label>
        <Input type="password" name="password" id="password" required />
        <br />

        <Label htmlFor="rePassword" className="text-muted-foreground">
          Re-Password
        </Label>
        <Input type="password" name="rePassword" id="rePassword" required />
        <br />

          <Label className="mb-2.5">Role:</Label>
        <div role="group" className="flex align-center">

          <Label htmlFor="role" className="text-muted-foreground">
            Candidate
          </Label>
          <Input type="radio" name="role" value="candidate" id="candidate" required />

          
          <Label htmlFor="role" className="text-muted-foreground text-center">
          Employee  
          </Label>
          
          <Input type="radio" className="smaller" name="role" value="employee" id="employee" required />
        </div>

        <br />

       

        {/* <Label htmlFor="firstName" className="text-muted-foreground">
         First Name 
        </Label>
        <Input name="firstName" type="text" id="firstName" required />
        <br />

        <Label htmlFor="lastName" className="text-muted-foreground">
         Last Name 
        </Label>
        <Input name="lastName" type="text" id="lastName" required />
        <br />

        <Label htmlFor="university" className="text-muted-foreground">
         School/University (if applicable)
        </Label>
        <Input name="university" type="text" id="university" />
        <br /> */}

        <SubmitButton />
      </form>
      <div className="mt-4 text-muted-foreground text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-secondary-foreground underline">
          Sign in
        </Link>
      </div>
    </main>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      Sign{pending ? "ing" : ""} up
    </Button>
  );
};
