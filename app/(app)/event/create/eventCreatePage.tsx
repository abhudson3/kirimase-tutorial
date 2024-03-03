"use client"

import AuthFormError from "@/components/auth/AuthFormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEventAction } from "@/lib/actions/events";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

type EventCreateFormProps = {
    hrEmployees: { id: string, name: string }[] | undefined
}

export default async function EventCreateForm({ hrEmployees }: EventCreateFormProps) {
    const router = useRouter()
    // @ts-ignore
    const [state, formAction] = useFormState(createEventAction, {
        error: "",
        message: ""
    })

    const runNavigation = () => {
        router.push("/event")
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
                <h2 className="text-3xl font-bold">Create an event</h2>
                <p className="text-gray-500 dark:text-gray-400">Fill out the form below to create an event</p>
            </div>


            <div className="space-y-4">
                <form action={formAction}>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input name="date" id="date" placeholder="Select a date" required type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input name="location" id="location" placeholder="Enter the location" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input name="title" id="title" placeholder="Enter the title" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea name="description" className="min-h-[100px]" id="description" placeholder="Enter the description" required />
                    </div>

                    {hrEmployees?.map((employee) => (
                        <div key={employee.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`employee-${employee.id}`}
                                name="hrLeadId"
                                value={employee.id}
                                className="mr-2"
                            />
                            <label
                                htmlFor={`hrLeadId-${employee.id}`}
                                className="text-black cursor-pointer"
                            >
                                {`Employee ID: ${employee.id}`}
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