"use client"

import AuthFormError from "@/components/auth/AuthFormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEventAction, createEventInteraction } from "@/lib/actions/events";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

type EventCreateFormProps = {
    candidates: { id: string, name: string }[] | undefined
    eventId: string
}

export default async function CreateEventInteractionForm({ candidates, eventId}: EventCreateFormProps) {
    const router = useRouter()
    // @ts-ignore
    const [state, formAction] = useFormState(createEventInteraction, {
        error: "",
        message: ""
    })

    console.log(candidates);
    

    const runNavigation = () => {
        router.refresh()
    }

    useEffect(() => {
        // @ts-ignore
        if(state.message == "success"){
           runNavigation() 
        }
    }, [state])



    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold">Create an interaction</h2>
                <p className="text-gray-500 dark:text-gray-400">Fill out the form below to create an event</p>
            </div>


            <div className="space-y-4">
                <form action={formAction}>

                <Input value={eventId} name="eventId" id="eventId"  type="hidden" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Input name="notes" id="notes" required type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sentimentScore">Sentiment Score</Label>
                            <Input name="sentimentScore" id="sentimentScore"  required />
                        </div>
                    </div>
                   


                    {candidates?.map((candidate) => (
                        <div key={candidate.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`candidate-${candidate.id}`}
                                name="candidateId"
                                value={candidate.id}
                                className="mr-2"
                            />
                            <label
                                htmlFor={`candidateId-${candidate.id}`}
                                className="text-black cursor-pointer"
                            >
                                {candidate.name}
                            </label>
                        </div>
                    ))}

                    <SubmitButton />
                </form>

            </div>
        </div>
    )


}


const SubmitButton = () => {
    "use client"
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            Create Event
        </Button>
    );
}