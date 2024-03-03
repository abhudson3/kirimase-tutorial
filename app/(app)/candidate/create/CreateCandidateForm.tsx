"use client"

import AuthFormError from "@/components/auth/AuthFormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCandidateAction, updateCandidateAction } from "@/lib/actions/candidate";
import { Candidate } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { User } from "lucia";
import  Link  from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

export function CandidateCreateForm() {
    const router = useRouter()
    // @ts-ignore
    const [state, formAction] = useFormState(createCandidateAction, {
        error: "",
        message: ""
    });


    const runNavigation = () => {
        router.push("/candidate")
    }

    useEffect(() => {
        //@ts-ignore
        if(state.message == "success"){
            runNavigation()
        }
    })

    return <>  


        <form action={formAction} method="post"> {/* Make sure to have the correct method */}


            <Input name="candidateId" type="hidden" />
            {/* @ts-ignore */}
            <Input name="userId" type="hidden"  />

            <Label htmlFor="email" className="text-muted-foreground">
                Email
            </Label>
            <Input name="email" type="email" id="email" required />
            <br />

            <Label htmlFor="password" className="text-muted-foreground">
                Password
            </Label>
            <Input name="password" type="password" id="password" required />
            <br />


            {/* Assuming password should be updated elsewhere since it's sensitive */}

            <Label htmlFor="firstName" className="text-muted-foreground">
                First Name
            </Label>
            <Input name="firstName" type="text" id="firstName" required />
            <br />

            <Label htmlFor="lastName" className="text-muted-foreground">
                Last Name
            </Label>
            <Input name="lastName" type="text" id="lastName"  required />
            <br />

            <Label htmlFor="phone" className="text-muted-foreground">
                Phone Number
            </Label>

            {/*@ts-ignore  */}
            <Input name="phone" type="tel" id="phone"  />
            <br />

{/* @ts-ignore  */}
             <Label htmlFor="linkedIn" className="text-muted-foreground text-blue-600">
            Linkedin
            </Label>
       
            {/*@ts-ignore  */}
            <Input name="linkedIn" type="url" id="linkedIn"  />
            <br />

            <Label htmlFor="university" className="text-muted-foreground">
                School/University (if applicable)
            </Label>

            {/*@ts-ignore  */}
            <Input name="university" type="text" id="university"  />
            <br />



            <SubmitButton />
        </form>

    </>
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
           Create 
        </Button>
    );
};