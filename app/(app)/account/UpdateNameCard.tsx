"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { updateUser } from "@/lib/actions/users";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UpdateNameCard({ firstName, lastName }: { firstName: string, lastName: string }) {
  const [state, formAction] = useFormState(updateUser, {
    error: "",
  });
console.log(firstName)
  useEffect(() => {
    if (state.success == true) toast.success("Updated User");
    if (state.error) toast.error("Error", { description: state.error });
  }, [state]);

  // potential error
  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  
  //   // Get the input element by name
  //   const inputElement = event.target.querySelector('input[name="firstName"]');
  //   const inputElement2 = event.target.querySelector('input[name="lastName"]');
  
  //   // Extract the value from the input element
  //   const newFirstName = inputElement.value;
  //   const newLastName = inputElement2.value;
  
  //   // Ensure that newName is not empty before proceeding
  //   if (newFirstName.trim() === '' || newLastName.trim() === '') {
  //     console.error('Name cannot be empty');
  //     return;
  //   }
  
  //   // Call formAction with the new name
  //   await formAction({ firstName: newFirstName, lastName: newLastName });
  // };
  

  return (
    <AccountCard
      params={{
        header: "Your Name",
        description:
          "",
      }}
    >
      <form action={formAction}>
        <AccountCardBody>
          <label htmlFor="firstName">First Name</label>
          <Input defaultValue={firstName ?? ""} name="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <Input defaultValue={lastName ?? ""} name="lastName" />
        </AccountCardBody>
        <AccountCardFooter description="64 characters maximum">
          <Submit />
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}

const Submit = () => {
  const { pending } = useFormStatus();
  return <Button type="submit">Save</Button>;
};
