"use client"

import AuthFormError from "@/components/auth/AuthFormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateCandidateAction } from "@/lib/actions/candidate";
import { Candidate } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { User } from "lucia";
import  Link  from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import CandidateUpload from "../../account/CandidateUpload";

export function UpdateCandidateForm({ candidate }: { candidate: Candidate & { user: User } }) {
    const router = useRouter()
    // @ts-ignore
    const [state, formAction] = useFormState(updateCandidateAction, {
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

    return <>  <p>{candidate?.user?.firstName} {candidate?.user?.lastName}</p>
        <p>{candidate?.user?.email}</p>

        <form action={formAction} method="post"> {/* Make sure to have the correct method */}


            <Input name="candidateId" type="hidden" value={candidate.candidateId} />
            {/* @ts-ignore */}
            <Input name="userId" type="hidden" value={candidate.userId} />

            <Label htmlFor="email" className="text-muted-foreground">
                Email
            </Label>
            <Input name="email" type="email" id="email" defaultValue={candidate?.user?.email} required />
            <br />

            {/* Assuming password should be updated elsewhere since it's sensitive */}

            <Label htmlFor="firstName" className="text-muted-foreground">
                First Name
            </Label>
            <Input name="firstName" type="text" id="firstName" defaultValue={candidate?.user?.firstName} required />
            <br />

            <Label htmlFor="lastName" className="text-muted-foreground">
                Last Name
            </Label>
            <Input name="lastName" type="text" id="lastName" defaultValue={candidate?.user?.lastName} required />
            <br />

            <Label htmlFor="phone" className="text-muted-foreground">
                Phone Number
            </Label>

            {/*@ts-ignore  */}
            <Input name="phone" type="tel" id="phone" defaultValue={candidate?.phone} />
            <br />

{/* @ts-ignore  */}
                <Link href={candidate.linkedIn} >
             <Label htmlFor="linkedIn" className="text-muted-foreground text-blue-600">
            Linkedin
            </Label>
       
                    </Link> 
            
            {/*@ts-ignore  */}
            <Input name="linkedIn" type="url" id="linkedIn" defaultValue={candidate?.linkedIn} />
            <br />

            <Label htmlFor="university" className="text-muted-foreground">
                School/University (if applicable)
            </Label>

            {/*@ts-ignore  */}
            <Input name="university" type="text" id="university" defaultValue={candidate?.university} />
            <br />



            <SubmitButton />
        </form>

<div>
    <h2>Upload Resume</h2>
{/*@ts-ignore  */}
    <CandidateUpload userId={candidate.userId} currentResumeUrl={candidate.resumeUrl}/>
</div>
    </>
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
           Update Account 
        </Button>
    );
};
